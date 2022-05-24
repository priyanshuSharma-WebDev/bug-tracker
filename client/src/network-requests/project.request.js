import axios from "axios";

const createProject = async (data) => {

    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
        const res = await axios.post("http://localhost:5000/api/projects/create", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    }
    catch (e) {
        return { msg: e.message, status: 500 };
    }
}



const getProject = async () => {

    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
        const res = await axios.get("http://localhost:5000/api/projects/my", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    }
    catch (e) {
        return { msg: e.message, status: 500 };
    }
}


export { createProject,getProject }