<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { type Contact } from '$lib/index';
	import { logout } from '$lib/logout';
    import { apiKeyStore } from '$lib/apiKeyStore';

    let contacts: Contact[] = [];
    let amount = 10;
    let isLoading = true;

    const loadContacts = async () => {
        isLoading = true;
        const response: { data: any } = await axios.get(`http://localhost:5000/contacts/get-contacts?amount=${amount}`);
        contacts = response.data;
        isLoading = false;
    };

    const changeAmount = (e: Event) => {
        amount = +(e.target as HTMLSelectElement).value;
        loadContacts();
    };

    onMount(loadContacts);
</script>

<main class="p-28">
    {#if $apiKeyStore !== ''}
        <button on:click={logout} class="text-red-500 mb-4 flex self-end">Sair</button>

        <header class="flex flex-row justify-between items-center">
            <h1 class="text-3xl">Contatos</h1>
            <select class="p-3 mt-4 rounded-md bg-amber-400" on:change={(e) => { changeAmount(e) }}>
                <option disabled selected>Quantidade de contatos</option>
                <option value=1>1</option>
                <option value=5>5</option>
                <option value=10>10</option>
                <option value=15>15</option>
                <option value=20>20</option>
            </select>
        </header>
        <ul>
            {#if isLoading}
                <p class="italic">Carregando...</p>
            {/if}

            {#each contacts as contact}
                <li class="p-4 border-b">
                    <a href={`/contato/${contact.identity}`} class="text-blue-500">{contact.name}</a>
                </li>
            {/each}
        </ul>
    {:else}
        <div class="flex flex-col justify-center items-center gap-3">
            <p class="text-3xl">Você precisa estar logado para acessar essa página</p>
            <a href="/login" class="text-blue-500">Fazer login</a>
        </div>
    {/if}

</main>

<style>
    select {
        border-right: 12px solid transparent
    }
</style>
