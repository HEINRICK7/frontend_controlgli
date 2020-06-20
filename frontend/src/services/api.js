import axios from 'axios';
import {getToken} from '../services/auth'

const api = axios.create({
    baseURL: 'http://ec2-18-214-211-47.compute-1.amazonaws.com',
});

api.interceptors.request.use(async config =>{
    const token = getToken();
    if(token){
        config.headers.Authorization = `${token}`;
    }

    return config;
});

export default api;
