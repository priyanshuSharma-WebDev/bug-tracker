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



export const signInUser = async (data) => {
    try {
        return await axios.post("http://localhost:5000/api/users/login", data)
    }
    catch(e) {
        return {msg: e.message, status: 500};
    }
};


export const getLogInUser = async () => {

    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
        const {data} = await axios.get("http://localhost:5000/api/users/me", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let user = {...data}
        user = {user,token}
        return user;
    }
    catch (e) {
        return { msg: e.message, status: 500 };
    }
}