import {
  SpamBotReasonOptions,
  SpamBotReasonOptionsSchema,
} from './schemas/llmSpamBotReason';
import { getValidationRules } from './utils/llmDefaultValidation';
import { llmLanguageValidation } from './utils/llmLanguageValidation';
import { fullNormalize } from './utils/llmNormalize';
import { makeLLMRequest } from './utils/llmRequest';
import { sleep } from './utils/llmSleep';

const LLM_CONSTANTS = {
  DEFAULT_MAX_RETRIES: 3,
  DEFAULT_RETRY_DELAY: 2000,
};

const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const styles = [
  {
    name: 'sincere',
    description:
      'Honest, open tone without pretense. Says it like it is, direct and human.',
    tone: 'simple and direct, like talking to a friend',
  },
  {
    name: 'emotional',
    description:
      'Shows real feelings, but restrained. Emotions are there, but controlled.',
    tone: 'concerned, but not hysterical',
  },
  {
    name: 'honest',
    description: 'Factual, without embellishment. Calls things by their names.',
    tone: 'straightforward and specific',
  },
  {
    name: 'conversational',
    description:
      'Natural speaking style, real expressions. How people actually talk.',
    tone: 'casual and natural',
  },
];

const reasons = [
  'but not all my contacts know about my account, and I urgently need to reach them for important matters',
  "even though I haven't engaged in spam, mass messaging, or committed any violations of Telegram's terms of service",
  "because I need to access communication with important business contacts and clients, but I can't reach them anymore",
  'because I need to urgently send messages for work purposes and coordinate with my team members',
  'since this is the only way to reach some important people who are not in my mutual contacts list',
  'but I have family members and close friends who need to be contacted urgently through this account',
  'because I use this account for professional communication and this restriction severely impacts my work',
  'since I need to communicate with medical professionals and emergency contacts who are not mutual contacts',
  'but I have important business deals and projects that require immediate communication with non-mutual contacts',
  'because I run a small business and need to contact customers and suppliers who are not in my mutual contacts',
  'since I provide customer support services and this restriction prevents me from helping people who need assistance',
  'but I need to coordinate volunteer work and community activities with people outside my mutual contacts',
];

const impacts = [
  'work is stalled',
  'clients are being lost',
  'family is worried',
  'projects are failing',
  'people cannot reach me',
  'business is stuck',
  'important contacts are unreachable',
  'deals are falling through',
];

const facts = [
  'Never violated rules, never spammed, never did suspicious activities',
  'Have not engaged in any violations or spam activities',
  'Never broke any terms of service or sent unsolicited messages',
  'Have always followed platform guidelines and never spammed anyone',
  'Never participated in any suspicious behavior or rule violations',
  'Have not committed any violations of community standards',
  'Never engaged in mass messaging or any prohibited activities',
  'Have always used the account responsibly without any violations',
  'Never sent spam or engaged in any suspicious activities',
  'Have not violated any platform rules or engaged in unwanted messaging',
  'Never did anything against terms of service or community guidelines',
  'Have always maintained proper account usage without any violations',
];

export async function getSpamBotReason(
  options: SpamBotReasonOptions
): Promise<string> {
  SpamBotReasonOptionsSchema.parse(options);

  const {
    llmParams,
    onRequest,
    onTry,
    onThrow,
    onLogger,
  } = options;

  const maxRetries = LLM_CONSTANTS.DEFAULT_MAX_RETRIES;

  const generations: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < maxRetries; i++) {
    const systemPrompt = createSpamBotReasonPrompt();

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
      const userPrompt = createUserPrompt();
      messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: userPrompt },
      ];
    }

    const currentParams = {
      ...llmParams,
      messages,
    };

    let message = '';
    try {
      onLogger?.('SPAM_BOT_REASON_REQUEST', {
        params: currentParams,
        attempt: i + 1,
      });

      onRequest?.();

      const { responseText } = await makeLLMRequest(currentParams);
      const normalizedText = fullNormalize(responseText);
      generations.push(normalizedText);
      message = normalizedText;

      const { isValid, error } = llmLanguageValidation(
        normalizedText,
        '',
        'ENGLISH'
      );

      if (!isValid) {
        throw new Error(error);
      }

      onLogger?.('SPAM_BOT_REASON_RESPONSE', {
        attempt: i + 1,
        message,
      });

      return responseText;
    } catch (error: any) {
      const errorMessage = error.message || 'UNDEFINED_ERROR';
      errors.push(errorMessage);

      onTry?.(errorMessage);
      onLogger?.('SPAM_BOT_REASON_ERROR', {
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
    onThrow?.(`** SPAM_BOT_REASON_GENERATION_ERROR **
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

function createSpamBotReasonPrompt(): string {
  const selectedStyle = randomElement(styles);

  return `## CONTEXT
You help write an appeal to Telegram support.

## GENERATION STYLE: ${selectedStyle.name.toUpperCase()}
${selectedStyle.description}

## STYLE RULES
- Tone: ${selectedStyle.tone}
- Maximum 3 sentences
- Up to 300 characters
- No direct addressing of support
- No greetings
- Natural English speech, how people actually talk
- No questions or exclamations
- Specifics instead of general phrases`;
}

function createUserPrompt(): string {
  const selectedReason = randomElement(reasons);
  const selectedImpact = randomElement(impacts);
  const selectedFact = randomElement(facts);
  const selectedStyle = randomElement(styles);

  return `Write an appeal about lifting messaging restrictions in "${selectedStyle.name}" style.

SITUATION: I can only message mutual contacts, ${selectedReason}.

FACT: ${selectedFact}.

IMPACT: ${selectedImpact}.

Start with stating the fact, then mention the impact. Style should be ${selectedStyle.tone}. Maximum 300 characters, 3 sentences.`;
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
