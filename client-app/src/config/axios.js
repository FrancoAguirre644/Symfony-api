import axios from 'axios';

export const apiAxios = axios.create({
    baseURL: "http://localhost:8000/api/v1"
});