import type { Message } from '$lib';
import { persisted } from 'svelte-persisted-store';

// Store persistente para as mensagens
export const messageStore = persisted<Message[]>('messages', []);
