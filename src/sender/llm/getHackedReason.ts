import {
  FrozenReasonOptions,
  FrozenReasonOptionsSchema,
} from './schemas/llmFrozenReason';
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

const hackMethods = [
  {
    method: 'fake reward bot offering premium stars and subscription',
    context: 'received message from official-looking bot with giveaway',
    timing: 'last month while browsing channels',
  },
  {
    method: 'phishing website that looked like Telegram login',
    context: 'clicked link in message claiming account verification needed',
    timing: 'few weeks ago during routine account check',
  },
  {
    method: 'public WiFi interception at coffee shop',
    context: 'used unsecured network to check messages',
    timing: 'recently while working remotely',
  },
  {
    method: 'stolen phone with unlocked Telegram access',
    context: 'device was taken and used for several hours',
    timing: 'last week during busy commute',
  },
  {
    method: 'fake Telegram support requesting verification code',
    context: 'received call from scammer impersonating official support',
    timing: 'about a month ago after security scare',
  },
  {
    method: 'malicious app download from unofficial source',
    context: 'installed what appeared to be Telegram update',
    timing: 'recently when looking for app improvements',
  },
  {
    method: 'SIM swapping attack through mobile carrier',
    context: 'attacker convinced carrier to transfer number',
    timing: 'few days ago through social engineering',
  },
  {
    method: 'compromised email used for password reset',
    context: 'email account was hacked first',
    timing: 'last month during email security breach',
  },
];

export async function getHackedReason(
  options: FrozenReasonOptions
): Promise<string> {
  FrozenReasonOptionsSchema.parse(options);

  const { llmParams, onRequest, onTry, onThrow, onLogger } = options;

  const maxRetries = LLM_CONSTANTS.DEFAULT_MAX_RETRIES;

  const generations: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < maxRetries; i++) {
    const systemPrompt = createHackedReasonPrompt();

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
      onLogger?.('HACKED_REASON_REQUEST', {
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

      onLogger?.('HACKED_REASON_RESPONSE', {
        attempt: i + 1,
        message,
      });

      return responseText;
    } catch (error: any) {
      const errorMessage = error.message || 'UNDEFINED_ERROR';
      errors.push(errorMessage);

      onTry?.(errorMessage);
      onLogger?.('HACKED_REASON_ERROR', {
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
    onThrow?.(`** HACKED_REASON_GENERATION_ERROR **
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

function createHackedReasonPrompt(): string {
  return `## CONTEXT
You help write a detailed explanation for a Telegram account hack appeal.

## TASK
Generate a comprehensive, realistic explanation of when and how the account was compromised.

## REQUIREMENTS
- Length: 200-400 characters (substantial but not excessive)
- Tone: Natural, concerned, honest
- Content: Detailed story with specific timing and method
- Style: First person narrative describing the hack incident
- No greetings, questions, or direct appeals to support
- MUST end with: "I recently regained access but found my account is now restricted and I don't understand what this means"
- Focus on realistic hacking scenarios like phishing bots, fake rewards, public WiFi, stolen phones
- Sound like a real person explaining a genuine hack incident`;
}

function createUserPrompt(): string {
  const selectedMethod = randomElement(hackMethods);

  return `Write a detailed explanation of when and how the account was compromised.

METHOD: The compromise happened through ${selectedMethod.method}.

CONTEXT: This occurred when I ${selectedMethod.context}.

TIMING: This happened ${selectedMethod.timing}.

Create a natural, detailed narrative that combines these elements. The explanation should sound like a real person describing a genuine security incident. Must end with the exact phrase: "I recently regained access but found my account is now restricted and I don't understand what this means." 200-400 characters total. First person perspective. No questions or direct appeals.`;
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
