import axios from "axios";

export class HttpClient {
    constructor(basePath) {
        this.client = axios.create({
            baseURL: basePath,
            headers: { "Content-Type": "application/json" },
        });
    }

    get(url, config = {}) {
        return this.client.get(url, config);
    }

    post(url, data, config = {}) {
        return this.client.post(url, data, config);
    }
}
