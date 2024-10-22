import { goto } from "$app/navigation";
import axios from "axios";
import { apiKeyStore } from "./apiKeyStore";

export const logout = async () => {
    let apiKey = '';

    apiKeyStore.subscribe((value) => {
        apiKey = value;
    });

    await axios.post('http://localhost:5000/logout', { apiKey: apiKey });

    apiKeyStore.set('');

    goto('/login');
};
