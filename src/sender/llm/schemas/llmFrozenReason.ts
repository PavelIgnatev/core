import { z } from 'zod';
import { CohereAIParamsSchema, MessageSchema } from './llmCohereAi';

export const FrozenReasonSchema = z.object({});

export const FrozenReasonConfigSchema = z.object({});

const CohereAIParamsSchemaAllowEmptyMessages = CohereAIParamsSchema.extend({
  messages: z.array(MessageSchema),
});

export const FrozenReasonOptionsSchema = z.object({
  llmParams: CohereAIParamsSchemaAllowEmptyMessages,
  options: FrozenReasonConfigSchema,
  onRequest: z.function().returns(z.void()).optional(),
  onTry: z.function().args(z.string()).returns(z.void()).optional(),
  onThrow: z.function().args(z.string()).returns(z.void()).optional(),
  onLogger: z.function().args(z.string(), z.any()).returns(z.void()).optional(),
});

export type FrozenReason = z.infer<typeof FrozenReasonSchema>;
export type FrozenReasonConfig = z.infer<typeof FrozenReasonConfigSchema>;
export type FrozenReasonOptions = z.infer<typeof FrozenReasonOptionsSchema>;
