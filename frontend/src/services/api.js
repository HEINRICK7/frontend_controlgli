import axios from 'axios';
import {getToken} from '../services/auth'

const api = axios.create({
    baseURL: 'http://controlgli-pr--pr-123.herokuapp.com',
});

api.interceptors.request.use(async config =>{
    const token = getToken();
    if(token){
        config.headers.Authorization = `${token}`;
    }

    return config;
});

export default api;
