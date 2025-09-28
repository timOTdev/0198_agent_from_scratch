import perplexity from './ai';
import type { ChatMessageInput } from '@perplexity-ai/perplexity_ai/resources';

export const runLLM = async ({
  model = 'sonar-pro',
  messages,
}: {
  model?: string;
  messages: ChatMessageInput[];
}) =>
  await perplexity.chat.completions.create({
    model,
    messages,
  });
