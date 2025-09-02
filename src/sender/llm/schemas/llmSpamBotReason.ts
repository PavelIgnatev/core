import { z } from 'zod';
import { CohereAIParamsSchema, MessageSchema } from './llmCohereAi';

export const SpamBotReasonSchema = z.object({});

export const SpamBotReasonConfigSchema = z.object({});

const CohereAIParamsSchemaAllowEmptyMessages = CohereAIParamsSchema.extend({
  messages: z.array(MessageSchema),
});

export const SpamBotReasonOptionsSchema = z.object({
  llmParams: CohereAIParamsSchemaAllowEmptyMessages,
  options: SpamBotReasonConfigSchema,
  onRequest: z.function().returns(z.void()).optional(),
  onTry: z.function().args(z.string()).returns(z.void()).optional(),
  onThrow: z.function().args(z.string()).returns(z.void()).optional(),
  onLogger: z.function().args(z.string(), z.any()).returns(z.void()).optional(),
});

export type SpamBotReason = z.infer<typeof SpamBotReasonSchema>;
export type SpamBotReasonConfig = z.infer<typeof SpamBotReasonConfigSchema>;
export type SpamBotReasonOptions = z.infer<typeof SpamBotReasonOptionsSchema>;
