<script lang="ts">
    import axios from 'axios';
    import { goto } from '$app/navigation';

    let apiKey = '';
    let error = '';
    let res: string;

    axios.get('http://localhost:5000/').then((response: { data: any }) => {
        res = response.data.message;
    });

    const login = async () => {
        try {
            await axios.post('http://localhost:5000/login', {
                key: apiKey,
            });

            goto('/');
        } catch (err) {
            error = 'Chave API inválida. Tente novamente.';
        }
    };
</script>

<main class="p-3 w-100 flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl">Login</h1>
    <form on:submit|preventDefault={login} class="w-96">
        <div class="flex flex-col gap-2">
            <label for="apiKey" class="block">API Key:</label>
            <input id="apiKey" bind:value={apiKey} autocomplete="off" class="border p-2 w-96 mb-4 rounded-md"/>
        </div>

        <div class="flex justify-center w-100">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300 transition">Login</button>
        </div>
    </form>
    {#if error}
        <p class="text-red-500 bold">{error}</p>
    {/if}
</main>
