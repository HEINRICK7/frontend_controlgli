import axios from 'axios';
import {getToken} from '../services/auth'

const api = axios.create({
    baseURL: 'http://localhost:3334',
});

api.interceptors.request.use(async config =>{
    const token = getToken();
    if(token){
        config.headers.Authorization = `${token}`;
    }

    return config;
});

export default api;
