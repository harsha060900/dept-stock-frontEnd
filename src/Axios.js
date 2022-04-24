import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000"});

// api.defaults.headers.common["adminauthtoken"] = localStorage.getItem("AuthId");

export default api;