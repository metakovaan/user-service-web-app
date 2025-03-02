import { HttpClient } from "../lib/axios";

const BaseUrl = "http://localhost:5051/api/User";

export const loginUser = async (credentials) => {
    const httpClient = new HttpClient(BaseUrl);
    return httpClient.post("/loginuser", credentials);
};

export const signupUser = async (userData) => {
    const httpClient = new HttpClient(BaseUrl);
    return httpClient.post("/createuser", userData);
};
