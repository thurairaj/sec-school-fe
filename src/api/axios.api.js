import axios from "axios";
import {clearTokens, getAccessToken, getRefreshToken, setTokens} from "./token.api.js";

const API_BASE = "http://localhost:3000";

export const api = axios.create({ baseURL: API_BASE, withCredentials: true });

api.interceptors.request.use(function (request) {
  const access = getAccessToken();
  if (access) request.headers.Authorization = `Bearer ${access}`;
  return request;
});

let isRefreshing = false;
let requestsQueue = [];

function enqueue(newRequest) {
  requestsQueue.push(newRequest);
}

function processAllRequests(token) {
  requestsQueue.forEach(req => req(token))
  requestsQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry && getRefreshToken()) {
      original._retry = true;

      if (isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await api.post("/auth/refresh", {refreshToken: getRefreshToken()});
          setTokens({accessToken: data.tokens.access, refresh: data.tokens.refresh});

          isRefreshing = false;
          processAllRequests(data.tokens.access)
          original.headers.Authorization = `Bearer ${data.tokens.access}`;
          return api(original)

        } catch (e) {
          isRefreshing = false;
          processAllRequests(null);
          clearTokens();
          return Promise.reject(e);
        }
      }

      return new Promise((resolve, reject) =>
        enqueue((newToken) => {
          if (!newToken) reject();
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original))
        })
      );
    }

    return Promise.reject(error);
  },
);
