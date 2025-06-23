import axios from "axios";
const api = axios.create({
    baseURL:'http:/localhost:8000',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',

    },
    withCredentials:false,
});
export default api;