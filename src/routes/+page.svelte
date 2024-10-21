<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';
    import "../app.css";

    interface Contact {
        identity: string;
        name: string;
        group: string;
        lastMessageDate: string;
        lastUpdateDate: string;
        gender: string;
        extras: {}
    }

    let contacts: Contact[] = [];
    let amount = 10;

    const loadContacts = async () => {
      const response: { data: any } = await axios.get(`http://localhost:5000/contacts/get-contacts?amount=${amount}`);
      contacts = response.data;
    };

    const changeAmount = (e: any) => {
        amount = +e.target.value;
        loadContacts();

    };

    onMount(loadContacts);
</script>

<main class="p-6">
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
        {#each contacts as contact}
            <li class="p-4 border-b">
                <a href={`/contato/${contact.identity}`} class="text-blue-500">{contact.name}</a>
            </li>
        {/each}
    </ul>
</main>
