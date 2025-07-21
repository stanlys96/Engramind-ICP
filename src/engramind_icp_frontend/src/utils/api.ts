import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BASE_URL_AI;
export const API_KEY = import.meta.env.VITE_AI_KEY;
export const API_REQUEST_FROM = import.meta.env.VITE_REQUEST_FROM;
export const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_API_KEY;
export const BACKEND_BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND;

export const axiosElwyn = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-AI_TOKEN": API_KEY,
    "X-REQUEST_FROM": API_REQUEST_FROM,
  },
});

export const axiosBackend = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const fetcherElwyn = (url: string) =>
  axiosElwyn.get(url).then((res) => res);

export const fetcherBackend = (url: string) =>
  axiosBackend.get(url).then((res) => res);
