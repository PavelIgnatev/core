import axios from 'axios';

import { sleep } from './helpers';
import { sendToFormBot } from './sendToFormBot';
import { sendToMainBot } from './sendToMainBot';

function extractStatusAndReason(input: string) {
  if (!input) return null;

  try {
    const cleanedInput = input
      .replace(/```json\n?/g, '')
      .replace(/```[a-zA-Z]*\n?/g, '')
      .replace(/```/g, '')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n/g, ' ')
      .replace(/\r/g, '')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\\n/g, ' ')
      .replace(/\\r/g, '')
      .replace(/\\t/g, ' ')
      .replace(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g, ' ')
      .trim();

    const jsonObject = JSON.parse(cleanedInput);

    if (!jsonObject || typeof jsonObject !== 'object') return null;
    if (!jsonObject.status || !jsonObject.reason) return null;
    if (
      typeof jsonObject.status !== 'string' ||
      typeof jsonObject.reason !== 'string'
    )
      return null;

    const status = jsonObject.status.toLowerCase() as string;
    if (!['stop', 'normal', 'interesting'].includes(status)) return null;

    return {
      status,
      reason: jsonObject.reason,
    };
  } catch {
    return null;
  }
}

export async function makeRequestAnalysis(
  accountId: string,
  messages: {
    role: 'assistant' | 'system' | 'user';
    content: string;
  }[]
) {
  const errors: string[] = [];
  let retryCount = 0;
  const maxRetries = 5;
  console.log(messages);
  while (retryCount < maxRetries) {
    try {
      const { data: resultData } = await axios.post(
        'http://91.198.220.234/chatv2',
        {
          k: 1,
          temperature: 0.1,
          model: 'command-a-03-2025',
          messages: [
            ...messages,
            {
              role: 'system',
              content: `You are an AI conversation analyst. Your objective is to analyze the entire conversation context and determine the user's engagement status. Follow these instructions precisely:
  
  1. **Emotional & Linguistic Analysis**  
     Evaluate tone (positive, neutral, negative), style (formal, informal, slang, emojis), message length, explicit objections, clarifying questions, or misunderstandings across all messages.
  
  2. **Engagement Triggers**  
     - **Positive Interest**: User shows curiosity about product details, pricing, demos, meetings, or requests clarifications.  
     - **Negative Signals**: Hostility, insults, explicit refusal, or strong objections.  
     - **Neutral or Other**: No clear interest or hostility.
  
  3. **Interaction Status Classification**  
     Assign one of:  
     - **STOP**: Clear hostile language or explicit rejection.  
     - **INTERESTING**: User demonstrates positive interest. Once INTERESTING, status remains so regardless of subsequent neutral messages.  
     - **NORMAL**: All other scenarios.
  
  4. **Structured JSON Response**  
     Reply ONLY with JSON:
  {
  "status": "stop" | "interesting" | "normal",
  "reason": "<Key trigger detected, exact quotes, classification rationale, next action suggestion>"
  }
  
  5. **Analysis Criteria**  
  - Reference specific messages or exact phrases.  
  - Link tone and context to your classification.  
  - Provide a concise next step: end chat, share information, ask a question, or propose a demo.
  
  Apply these rules consistently to optimize engagement and conversion potential.
  
  **Structured JSON Response**  
     Reply ONLY with JSON:
  {
  "status": "stop" | "interesting" | "normal",
  "reason": "<Key trigger detected, exact quotes, classification rationale, next action suggestion>"
  }`,
            },
          ],
        }
      );
      const parsedData = extractStatusAndReason(
        resultData?.message?.content?.[0]?.text
      );

      if (!parsedData || !parsedData.status || !parsedData.reason) {
        await sendToFormBot(`[NO_DATA]
ID: ${accountId}
JSON: ${resultData?.message?.content?.[0]?.text}`);
        throw new Error(`NO_DATA:${resultData?.message?.content?.[0]?.text}`);
      }

      await sendToFormBot(`[ANALYSIS_RESULT]
ID: ${accountId}
JSON: ${JSON.stringify(parsedData)}
STATUS: ${parsedData.status}
REASON: ${parsedData.reason}`);

      return parsedData;
    } catch (error: any) {
      errors.push(error.message);
      retryCount++;

      await sleep(2500);
    }
  }

  if (retryCount >= maxRetries) {
    await sendToMainBot(`** ANALYSIS_MAX_RETRIES **
ID: ${accountId}
ERRORS:
${errors.map((e, i) => `${i + 1}: ${e}`).join('\n')}`);
  }

  throw new Error('STOPPED_ERROR');
}
