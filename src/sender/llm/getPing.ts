import { makeLLMRequest } from './utils/llmRequest';
import { getValidationRules } from './utils/llmDefaultValidation';
import { llmLanguageValidation } from './utils/llmLanguageValidation';

import {
  PingSchema,
  PingOptionsSchema,
  Ping,
  PingOptions,
  PingConfig,
} from './schemas/llmPing';
import { fullNormalize } from './utils/llmNormalize';
import { sleep } from './utils/llmSleep';
import { llmPingValidation } from './utils/llmPingValidation';

const LLM_CONSTANTS = {
  DEFAULT_MAX_RETRIES: 5,
  DEFAULT_RETRY_DELAY: 2500,
};

export async function getPing(
  context: Ping,
  options: PingOptions
): Promise<string> {
  PingSchema.parse(context);
  PingOptionsSchema.parse(options);

  const {
    llmParams,
    options: config,
    onRequest,
    onTry,
    onThrow,
    onLogger,
  } = options;
  const { messages, ...otherLlmParams } = llmParams;
  const maxRetries = LLM_CONSTANTS.DEFAULT_MAX_RETRIES;

  const dialogueMessages = messages.filter((msg) => msg.role !== 'system') as {
    role: 'assistant' | 'user';
    content: string;
  }[];

  const generations: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < maxRetries; i++) {
    const systemPrompt = createPingPrompt(context, {
      config,
      messages: dialogueMessages,
    });

    let messages: { role: 'assistant' | 'system' | 'user'; content: string }[] =
      [];

    if (generations.length > 0 && errors.length > 0) {
      messages = [{ role: 'system', content: systemPrompt }];

      for (let j = 0; j < generations.length; j++) {
        messages.push({
          role: 'assistant',
          content: generations[j],
        });

        if (j < errors.length) {
          messages.push({
            role: 'user',
            content: createRetryPrompt(generations[j], errors[j]),
          });
        }
      }
    } else {
      messages = [
        { role: 'system' as const, content: systemPrompt },
        ...dialogueMessages,
      ];
    }

    const currentParams = {
      ...otherLlmParams,
      messages,
    };

    let message = '';
    try {
      onLogger?.('PING_REQUEST', {
        name: context.aiName,
        params: currentParams,
        attempt: i + 1,
      });

      onRequest?.();

      const { responseText } = await makeLLMRequest(currentParams);
      const normalizedText = fullNormalize(responseText);
      generations.push(normalizedText);
      message = normalizedText;

      llmPingValidation(normalizedText, 120);

      const { isValid, error } = llmLanguageValidation(
        normalizedText,
        [
          JSON.stringify(context),
          dialogueMessages.map((msg) => msg.content).join(' '),
        ].join(' '),
        context.language
      );

      if (!isValid) {
        throw new Error(error);
      }

      onLogger?.('PING_RESPONSE', {
        name: context.aiName,
        attempt: i + 1,
        message,
      });

      return responseText;
    } catch (error: any) {
      const errorMessage = error.message || 'UNDEFINED_ERROR';
      errors.push(errorMessage);

      onTry?.(errorMessage);
      onLogger?.('PING_ERROR', {
        name: context.aiName,
        message,
        error: errorMessage,
        attempt: i + 1,
      });

      if (i < maxRetries - 1) {
        await sleep(LLM_CONSTANTS.DEFAULT_RETRY_DELAY);
      }
    }
  }

  if (generations.length > 0) {
    onThrow?.(`** GENERATION_ERROR **
_____________
GENERATIONS:
${generations.map((g, i) => `${i + 1}: ${g}`).join('\n')}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join('\n')}
_____________`);
    return generations[generations.length - 1];
  }

  throw new Error('STOPPED_ERROR');
}

function createPingPrompt(
  context: Ping,
  options: {
    config: PingConfig;
    messages: { role: 'assistant' | 'user'; content: string }[];
  }
): string {
  const { config, messages } = options;
  const { aiName, aiGender, language, addedInformation } = context;

  const dialogueHistory = buildDialogueMarkup(messages.slice(-15));
  const lastAssistantMessage = messages
    .slice()
    .reverse()
    .find((m) => m.role === 'assistant');
  const userMessages = messages.filter((m) => m.role === 'user');
  const lastUserMessage = userMessages[userMessages.length - 1];

  const conversationLength = messages.length;

  return `<TASK>
Create a reminder message that brings the user back to continue our conversation.
</TASK>

<PROFILE>
[NAME]${aiName}[/NAME]
[LANGUAGE]${language}[/LANGUAGE]
</PROFILE>

${
  addedInformation
    ? `<ADDITIONAL_INFO>
${addedInformation}
</ADDITIONAL_INFO>`
    : ''
}

<CONVERSATION_CONTEXT>
[LAST_USER_MESSAGE]${lastUserMessage?.content || 'none'}[/LAST_USER_MESSAGE]
[CONVERSATION_LENGTH]${conversationLength} messages[/CONVERSATION_LENGTH]
</CONVERSATION_CONTEXT>

<DIALOGUE_HISTORY>
${dialogueHistory}
</DIALOGUE_HISTORY>

<REQUIREMENTS>
- Language: ${language.toUpperCase()} only
- Max length: 120 characters
- Style: Simple, direct, professional
- No emojis, no excessive emotion
- Reference specific facts from their message
- Focus on continuing the discussion
- Show genuine interest in their response
${language === 'RUSSIAN' ? '- Use "ВЫ" when addressing' : ''}
</REQUIREMENTS>

<INSTRUCTION>
Write a brief message that:
- References something specific from their last message
- Expresses desire to continue the conversation
- Asks about their thoughts on the discussed topic
- Is professional and direct

Output only the message text.
</INSTRUCTION>`;
}

function buildDialogueMarkup(
  messages: { role: 'assistant' | 'user'; content: string }[]
): string {
  if (!messages.length) return '';
  const items = messages
    .map((m) => {
      const tag = m.role === 'user' ? 'USER' : 'CHATBOT';
      return `<${tag}>\n  [MESSAGE]${m.content}[/MESSAGE]\n</${tag}>`;
    })
    .join('\n');
  return items;
}

function createRetryPrompt(lastMessage: string, lastError: string): string {
  return `<ERROR_DETAILS>
  [ERROR_TYPE]VALIDATION ERROR[/ERROR_TYPE]
  [ERROR_MESSAGE]${lastError}[/ERROR_MESSAGE]
  [GENERATED_VARIANT]${lastMessage}[/GENERATED_VARIANT]
</ERROR_DETAILS>

<RETRY_REQUIREMENTS>
  [CONTENT_PRESERVATION]
    - Keep the exact same meaning and unique content from the original message
    - Do not generate new text or change the message structure
    - Only fix technical errors while preserving the original text
    - Maintain the same key points and information
  [/CONTENT_PRESERVATION]

  [LANGUAGE_REQUIREMENTS]
    - ** STRICTLY follow the language specified in [LANGUAGE] tag **
    - ** NO mixing of languages unless explicitly allowed **
    - ** Messages in incorrect language will be rejected **
  [/LANGUAGE_REQUIREMENTS]

  [TECHNICAL_REQUIREMENTS]
    - Fix only technical validation errors
    - Keep the original message length
    - Maintain the original structure
    - Preserve all key components
    - Use only allowed characters (letters, numbers, basic punctuation, currency symbols and spaces)
  [/TECHNICAL_REQUIREMENTS]

</RETRY_REQUIREMENTS>

<VALIDATION_RULES>
${getValidationRules()}
</VALIDATION_RULES>

<FINAL_INSTRUCTION>
Please fix ONLY the technical errors in the original message while keeping its unique content and meaning exactly the same. Pay special attention to:
1. Using ONLY the specified language
2. ** NEVER USE THESE CHARACTERS: < > | ( ) [ ] { } & = + **
3. ** ANY MESSAGE WITH THESE CHARACTERS WILL BE REJECTED **
</FINAL_INSTRUCTION>`;
}
