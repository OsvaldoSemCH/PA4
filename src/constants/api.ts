import axios from "axios";

export const Api = axios.create
(
    {
        baseURL: "https://dragonball-api.com/api",
    }
)