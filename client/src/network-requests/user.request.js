import axios from "axios";


export const createUser = async (data) => {
    try {
        const getUser = await axios.post("http://localhost:5000/api/users/findByCred", data)
        if(getUser.data) {
            throw new Error("User already exists with that credentials.")
        }
        const res = await axios.post("http://localhost:5000/api/users/create", data)
        return res;
    }
    catch(e) {
        return {msg: e.message, status: 500};
    }
};
export const signInUser = (data) => axios.post("http://localhost:5000/api/users/login", data);