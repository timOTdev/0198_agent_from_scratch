import { JSONFilePreset } from 'lowdb/node';
import type { ChatMessageInput } from '@perplexity-ai/perplexity_ai/resources';
import { v4 as uuidv4 } from 'uuid';

export type MessageWithMetadata = ChatMessageInput & {
  id: string;
  createdAt: string;
};

export const addMetadata = (
  message: ChatMessageInput
): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
});

export const removeMetadata = (
  message: MessageWithMetadata
): ChatMessageInput => {
  const { id, createdAt, ...messageWithoutMetadata } = message;
  return messageWithoutMetadata;
};

type Data = {
  messages: MessageWithMetadata[];
};

const defaultData: Data = { messages: [] };

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData);

  return db;
};

export const addMessages = async (messages: ChatMessageInput[]) => {
  const db = await getDb();
  db.data.messages.push(...messages.map(addMetadata));
  await db.write();
};

export const getMessages = async () => {
  const db = await getDb();
  return db.data.messages.map(removeMetadata);
};

export const saveToolResponse = async (
  toolCallId: string,
  toolResponse: string
) => {
  return await addMessages([
    { role: 'tool', content: toolResponse, tool_calls: [{ id: toolCallId }] },
  ]);
};

export const clearMessages = async (keepLast?: number) => {
  const db = await getDb();
  db.data.messages = db.data.messages.slice(-(keepLast ?? 0));
  await db.write();
};
