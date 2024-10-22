<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { type Message, type Contact, formatDate } from '$lib/index';
    import { apiKeyStore } from '$lib/apiKeyStore';

    let messages: Message[] = [];
    let newMessage = "";
    let contactId: string = $page.params.id;
    let contact: Contact;
    let error = "";
    let isLoading = true;

    const loadMessages = async () => {
        isLoading = true;

        const response = await axios.get(`http://localhost:5000/messages/get-message/${contactId}`);

        messages = response.data as Message[];
        messages = messages.reverse();

        isLoading = false;
    };

    const loadContactById = async () => {
        const response = await axios.get(`http://localhost:5000/contacts/get-contact/${contactId}`);
        contact = response.data as Contact;
    };

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            const messagePayload = {
                to: contact.identity,
                content: newMessage,
                type: "text/plain"
            };
            await axios.post(`http://localhost:5000/messages/send-message`, messagePayload);
            newMessage = "";
            loadMessages();
        } catch (error) {
            console.error("Erro ao enviar mensagem", error);
        }
    };

    onMount(() => {
        loadMessages();
        loadContactById();
    });
</script>

<main class="p-28">
    {#if $apiKeyStore !== ''}
        <a href="/" class="text-blue-500 mb-4 inline-block">Voltar</a>

        {#if isLoading}
            <p class="italic">Carregando...</p>
        {/if}
        {#if contact && !isLoading}
            <h1 class="text-3xl">Conversa com {contact.name}</h1>
            <ul>
                {#each messages as message}
                    <li class="p-4 border-b">
                        <p>{message.content}</p>
                        <small class="text-gray-500">{formatDate(message.metadata["#date_processed"])}</small>
                        <small class="text-gray-500 bold">{message.from.replace(/(\/.*)/, "")}</small>
                        {#if error}
                            <p class="text-red-500 bold">{error}</p>
                        {/if}
                    </li>
                {/each}
            </ul>

            <div class="mt-4">
                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    class="border p-3 w-full rounded-md"
                    bind:value={newMessage}
                />
                <button on:click={sendMessage} class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Enviar
                </button>
            </div>
        {/if}
    {:else}
        <div class="flex flex-col justify-center items-center gap-3">
            <p class="text-3xl">Você precisa estar logado para acessar essa página</p>
            <a href="/login" class="text-blue-500">Fazer login</a>
        </div>
    {/if}

</main>
