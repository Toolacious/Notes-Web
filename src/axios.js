import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/user" });

const signin = async (user) => {
    const {
        data: { msg },
    } = await instance.post("/login", user);
    return msg;
};

const signup = async (user) => {
    const {
        data: { msg },
    } = await instance.post("/register", user);
    return msg;
};

export { signin, signup };
