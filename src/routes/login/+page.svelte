<script lang="ts">
    import "../../app.css";
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
        //   userId,
          key: apiKey,
        });
        goto('/');
      } catch (err) {
        error = 'Login failed. Please check your credentials.';
      }
    };
</script>

<main class="p-3 w-100 flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl">Login</h1>
    <p>{res}</p>
    <form on:submit|preventDefault={login} class="w-96">
        <!-- <div class="flex flex-col gap-2">
            <label for="userId" class="block">User ID:</label>
            <input id="userId" bind:value={userId} class="border p-2 w-full mb-4 rounded-md"/>
        </div> -->

        <div class="flex flex-col gap-2">
            <label for="apiKey" class="block">API Key:</label>
            <input id="apiKey" bind:value={apiKey} autocomplete="off" class="border p-2 w-full mb-4 rounded-md"/>
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 transition">Login</button>
    </form>
    {#if error}
        <p class="text-red-500">{error}</p>
    {/if}
</main>
