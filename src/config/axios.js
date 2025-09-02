import axios from 'axios';
import { API_URL } from './env';

const request = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export { request };
