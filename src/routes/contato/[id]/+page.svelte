<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import "../../../app.css";

    interface Message {
        content: string;
        id: string;
        from: string;
        to: string;
        metadata: {
            "#date_processed": string;
            "date_created": string;
        };
    }

    interface Contact {
        identity: string;
        name: string;
        group: string;
        lastMessageDate: string;
        lastUpdateDate: string;
        gender: string;
        extras: {}
    }

    let messages: Message[] = [];
    let contactId: string = $page.params.id;
    let contact: Contact;

    const loadMessages = async () => {
      const response = await axios.get(`http://localhost:5000/messages/get-message`);
      messages = response.data as Message[];
    };

    const loadContactById = async () => {
      const response = await axios.get(`http://localhost:5000/contacts/get-contact/${contactId}`);
      contact = response.data as Contact;
    };

    onMount(loadMessages);
    onMount(loadContactById);
</script>

<main class="p-6">
    {#if contact}
        <h1 class="text-3xl">Conversa com {contact.name}</h1>
        <ul>
            {#each messages as message}
                <li class="p-4 border-b">
                    <p>{message.content}</p>
                    <small class="text-gray-500">{message.metadata["#date_processed"]}</small>
                </li>
            {/each}
        </ul>
    {/if}
</main>
