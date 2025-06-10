import axios from 'axios';

import { sleep } from './helpers';
import { sendToFormBot } from './sendToFormBot';
import { sendToMainBot } from './sendToMainBot';

type Status = 'negative' | 'normal' | 'meeting';

function extractStatusAndReason(input: string) {
  if (!input) return null;

  try {
    function extractBalancedBraces(str: string) {
      const result = [];
      let start = -1;
      let count = 0;

      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '{') {
          if (count === 0) start = i;
          count++;
        } else if (char === '}') {
          if (count > 0) count--;
          if (count === 0 && start !== -1) {
            result.push(str.substring(start, i + 1));
            start = -1;
          }
        }
      }
      return result;
    }

    const braceBlocks = extractBalancedBraces(input);

    for (const block of braceBlocks) {
      try {
        let jsonStr = block
          .replace(/(\w+)\s*:/g, '"$1":')
          .replace(/:[\s\n]*'([^']+)'[\s\n]*(,?)/g, ': "$1"$2')
          .replace(/([:,]\s*)([^"{\[\s][^,}\]\s]*)(\s*[},])/g, '$1"$2"$3');

        const obj = JSON.parse(jsonStr);

        if (obj.status && obj.reason) {
          const status = obj.status.toLowerCase();
          if (['negative', 'normal', 'meeting'].includes(status)) {
            return { status, reason: obj.reason };
          }
        }
      } catch {}
    }
    return null;
  } catch (e) {
    return null;
  }
}
function isValidStatus(status: string): status is Status {
  return ['negative', 'normal', 'meeting'].includes(status);
}

export async function makeRequestAnalysis(
  accountId: string,
  messages: {
    role: 'assistant' | 'system' | 'user';
    content: string;
  }[],
  language: string
): Promise<{ status: Status; reason: string }> {
  const errors: string[] = [];
  let retryCount = 0;
  const maxRetries = 5;

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
    - Assess the tone (positive, neutral, negative), style (formal, informal, slang, emojis), message length, and explicit objections or misunderstandings throughout the conversation.

2. **Engagement Triggers**  
   - **Meeting**: The user discusses, agrees, or confirms a meeting. This includes:
     - Proposing or confirming a time for the meeting.
     - Asking about or discussing details related to the meeting (e.g., time, access, or format).
     - Expressing readiness or showing interest in participating in the meeting.
     - Suggesting or agreeing on the details of the meeting.
     - **Example triggers**: “Let’s meet tomorrow at 3:00 PM,” “When are you available for a meeting?”, “Let’s schedule a video call for next week,” or “What time works for the meeting?”
     - Once a **meeting** has been discussed or confirmed, the status should remain **Meeting** throughout the conversation, even if the context changes or if the user later provides soft rejections or neutral responses.
   - **Negative Signals**: Hostility, insults, harsh language, or strong objections. These include any aggressive rejections or explicit refusals. A clear sign of strong dissatisfaction with the conversation. Once the **Meeting** status is set, it will remain **Meeting** unless **Negative Signals** are detected. In such cases, the status should change to **Negative**.
   - **Normal**: All other situations, including neutral or mild responses, and rejections that are not aggressive or overly harsh. Soft rejections of meetings or scheduling do not qualify as negative and will not revert the status to **Normal** after **Meeting** has been set. The **Normal** status is used for conversations that don’t fit into the **Meeting** or **Negative** categories.

3. **Interaction Status Classification**  
   - **NEGATIVE**: The user expresses **clear hostility** or uses **strong rejection**. Examples include:
     - “I don’t want to waste time.”
     - “Stop bothering me.”
     - “I’m not interested, don’t contact me again.”
     - If the user exhibits **negative signals** after a **Meeting** status has been set, the status should change to **Negative**.
   - **MEETING**: The user actively discusses or agrees to a **meeting**. This includes proposing a time for the meeting, confirming availability, or discussing specifics related to the meeting (e.g., time, access, platform, etc.). Once the **Meeting** status is triggered, it will remain **Meeting** until **Negative** signals are detected.
   - **NORMAL**: All other conversations, including **mild rejections** such as “I’m not interested right now” or “Maybe later,” or neutral, ongoing exchanges. Soft refusals and any conversation that does not fit into **negative** or **meeting** categories.

4. **Reason Language**  
   - For translation purposes, replace the reason in the desired language using ${language} to automatically translate the reason. For example, if the user’s language is Russian, translate the reason into Russian. You will replace the "reason" with the translated version based on the user's language preference.

5. **Structured JSON Response**  
Your response should be a JSON object with the following fields:  
{  
  "status": "negative" | "meeting" | "normal",  
  "reason": "<Specific trigger detected, e.g., user explicitly rejects the meeting, user confirms time for the meeting, etc.>"  
}  
Please ensure that the analysis is precise and each classification is supported by clear references to the user’s messages. The response should be concise and specific.
For translation purposes, replace the reason in the desired language using ${language} to automatically translate the reason. For example, if the user’s language is Russian, translate the reason into Russian. You will replace the "reason" with the translated version based on the user's language preference.

**Structured JSON Response**  
Your response should be a JSON object with the following fields:  
{  
  "status": "negative" | "meeting" | "normal",  
  "reason": "<Specific trigger detected, e.g., user explicitly rejects the meeting, user confirms time for the meeting, etc.>"  
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
