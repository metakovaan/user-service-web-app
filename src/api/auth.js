import { HttpClient } from "../lib/axios";

const PATH = "/api/auth";

export const loginUser = async (credentials) => {
    const httpClient = new HttpClient(PATH);
    return httpClient.post("/login", credentials);
};

export const signupUser = async (userData) => {
    const httpClient = new HttpClient(PATH);
    return httpClient.post("/signup", userData);
};
