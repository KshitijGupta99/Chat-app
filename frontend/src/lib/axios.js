import axios from "axios"

export const Axios = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials: true
})