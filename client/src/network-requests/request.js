import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_HTTP_URI,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});


function CreateUser() {
    try {

    }
    catch(e) {
        console.log(e.message)
    }
}


export default api;