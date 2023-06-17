import axios from "axios";

// VM IP주소(34.64.81.88)로 변경
axios.defaults.baseURL = "http://34.64.81.88/api";
axios.defaults.baseURL = "http://34.64.81.88/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.defaults.baseURL = "http://localhost:3001/api";

export const api = axios.create();
