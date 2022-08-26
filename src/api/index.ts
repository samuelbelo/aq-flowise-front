import axios, {type AxiosInstance} from 'axios'
import {serverApiUrl} from './default.js'
import store from "@/store";
import router from "@/router";

let token = store.getters['AuthModule/authToken'] || localStorage.getItem('flowise.session.authToken')

const api: AxiosInstance = axios.create({
  baseURL: serverApiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('AuthModule/logout')
      return router.push('/login')
    }
  }
})

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


export default api
