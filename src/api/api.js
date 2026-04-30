import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

const normalizeToken = (tokenValue) => {
    if (!tokenValue) {
        return null;
    }

    if (tokenValue.includes("=") && tokenValue.includes(";")) {
        const rawToken = tokenValue.split("=")[1];
        return rawToken?.split(";")[0] || null;
    }

    return tokenValue;
};

api.interceptors.request.use((config) => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
        return config;
    }

    try {
        const parsedAuth = JSON.parse(auth);
        const token = normalizeToken(parsedAuth?.jwtToken);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error("Failed to parse auth token", error);
    }

    return config;
});

export default api;
