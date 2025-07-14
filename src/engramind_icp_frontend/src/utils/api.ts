import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BASE_URL_AI;
export const API_KEY = import.meta.env.VITE_AI_KEY;
export const API_REQUEST_FROM = import.meta.env.VITE_REQUEST_FROM;

export const axiosElwyn = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-AI_TOKEN": API_KEY,
    "X-REQUEST_FROM": API_REQUEST_FROM,
  },
});

export const fetcherElwyn = (url: string) =>
  axiosElwyn.get(url).then((res) => res);
