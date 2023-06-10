import axios from "axios";

axios.defaults.baseURL = "/api";

export const api = axios.create();
