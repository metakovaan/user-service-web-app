import axios from "axios";

export class HttpClient {
    constructor(basePath) {
        this.client = axios.create({
            baseURL: basePath,
        });
    }

    get(url, config = {}) {
        return this.client.get(url, config);
    }

    post(url, data, config = {}) {
        const headers = data instanceof FormData
            ? { "Content-Type": "multipart/form-data", ...config.headers }
            : { "Content-Type": "application/json", ...config.headers };

        return this.client.post(url, data, { ...config, headers });
    }
}
