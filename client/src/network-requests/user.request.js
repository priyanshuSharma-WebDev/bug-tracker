import axios from "axios";


export const createUser = (data) => axios.post("http://localhost:5000/api/users/create", data);