import axios from "axios";

const API_BASE = "http://localhost:3000";

export const api = axios.create({ baseURL: API_BASE, withCredentials: true });

export function attachAccessToken(getToken) {
  api.interceptors.request.use(function (request) {
    const access = getToken?.();
    if (access) request.headers.Authorization = `Bearer ${access}`;
    return request;
  });
}

let isRefreshing = false;
let pending = [];

function onRefreshed(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      if (isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await api.post("/auth/refresh");
          const newToken = data.accessToken;
          onRefreshed(newToken);

          // update authContext
          window.dispatchEvent(
            new CustomEvent("token:refreshed", { detail: newToken }),
          );
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        } catch (e) {
          isRefreshing = false;
          pending = [];
          return Promise.reject(e);
        }
      }

      return new Promise((resolve) =>
        pending.push((newToken) => {
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        }),
      );
    }

    return Promise.reject(error);
  },
);
