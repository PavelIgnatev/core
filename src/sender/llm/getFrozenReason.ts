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

const scenarios = [
  {
    activity: 'messaging family members and close friends regularly',
    context: 'keeping in touch with relatives who live in different countries',
    timing: 'during holidays and family events when communication increases',
  },
  {
    activity: 'coordinating with colleagues and business partners',
    context: 'discussing work projects and sharing important documents',
    timing: 'especially during busy periods when quick communication is essential',
  },
  {
    activity: 'communicating with old friends from school and university',
    context: 'reconnecting with people I have known for many years',
    timing: 'when organizing reunions and catching up on life updates',
  },
  {
    activity: 'staying connected with neighbors and local community members',
    context: 'organizing community events and sharing local information',
    timing: 'particularly when coordinating neighborhood activities',
  },
  {
    activity: 'maintaining relationships with former colleagues and mentors',
    context: 'seeking professional advice and maintaining professional network',
    timing: 'when looking for career guidance or job opportunities',
  },
  {
    activity: 'communicating with service providers and local businesses',
    context: 'coordinating appointments and discussing service details',
    timing: 'when arranging home repairs, medical appointments, or other services',
  },
];

const clarifications = [
  'I have never engaged in any spam activities, mass messaging campaigns, or promotional content distribution',
  'All my communications have been personal, direct messages with people I know personally or professionally',
  'I have never sent unsolicited messages to strangers or participated in any commercial messaging activities',
  'My account has only been used for legitimate personal and professional communication purposes',
  'I have never violated any community guidelines or terms of service throughout my time using Telegram',
  'All my messages have been sent to people who know me and expect to receive communication from me',
  'I have never used any automated tools, bots, or third-party services to send messages through my account',
  'My messaging patterns have always been normal conversational exchanges with real people I have relationships with',
];

const impacts = [
  'important family communications are being disrupted during a critical time when coordination is needed',
  'professional relationships and business opportunities are being negatively affected by this restriction',
  'I am unable to maintain essential social connections that are important for my personal and mental wellbeing',
  'time-sensitive communications regarding work projects and deadlines are being blocked unexpectedly',
  'family members in different time zones are worried because they cannot reach me as they normally would',
  'business clients and partners are experiencing delays because our usual communication channel is restricted',
  'I am missing important updates from friends and colleagues that require timely responses and engagement',
  'essential coordination for upcoming events and appointments is being severely hampered by these limitations',
];

export async function getFrozenReason(
  options: FrozenReasonOptions
): Promise<string> {
  FrozenReasonOptionsSchema.parse(options);

  const { llmParams, onRequest, onTry, onThrow, onLogger } = options;

  const maxRetries = LLM_CONSTANTS.DEFAULT_MAX_RETRIES;

  const generations: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < maxRetries; i++) {
    const systemPrompt = createFrozenReasonPrompt();

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
      onLogger?.('FROZEN_REASON_REQUEST', {
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

      onLogger?.('FROZEN_REASON_RESPONSE', {
        attempt: i + 1,
        message,
      });

      return responseText;
    } catch (error: any) {
      const errorMessage = error.message || 'UNDEFINED_ERROR';
      errors.push(errorMessage);

      onTry?.(errorMessage);
      onLogger?.('FROZEN_REASON_ERROR', {
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
    onThrow?.(`** FROZEN_REASON_GENERATION_ERROR **
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

function createFrozenReasonPrompt(): string {
  return `## CONTEXT
You help write a detailed explanation for a Telegram account freeze appeal.

## TASK
Generate a comprehensive, realistic explanation of what the user was doing when their account got frozen.

## REQUIREMENTS
- Length: 200-400 characters (substantial but not excessive)
- Tone: Natural, conversational, honest
- Content: Detailed personal story with specific activities
- Style: First person narrative describing normal social activities
- No greetings, questions, or direct appeals to support
- Focus on legitimate personal/social communications
- Include specific context and timing details
- Sound like a real person explaining their normal usage`;
}

function createUserPrompt(): string {
  const selectedScenario = randomElement(scenarios);
  const selectedClarification = randomElement(clarifications);
  const selectedImpact = randomElement(impacts);

  return `Write a detailed explanation of what went wrong that led to the account freeze.

ACTIVITY: I was ${selectedScenario.activity}, ${selectedScenario.context}, ${selectedScenario.timing}.

CLARIFICATION: ${selectedClarification}.

IMPACT: Now ${selectedImpact}.

Create a natural, detailed narrative that combines these elements. The explanation should sound like a real person describing their normal Telegram usage patterns and explaining why the freeze happened by mistake. 200-400 characters. First person perspective. No questions or direct appeals.`;
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