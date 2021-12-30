import axios from 'axios';

const api = axios.create({
    baseURL: 'https://control-gli.herokuapp.com/',
});

export default api;
