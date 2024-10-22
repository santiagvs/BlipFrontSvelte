import { persisted } from 'svelte-persisted-store';

export const apiKeyStore = persisted('apiKey', '');
