import axiosInstance  from "./axios";
import {store} from "../redux/store"
import { refreshToken } from "../redux/actions/auth";
const  setup=()=>{
    axiosInstance.interceptors.request.use(
        (config) => {
          const accessToken = store.getState().auth.token
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // set in header
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const originalRequest = error.config;
          if (error.response.status === 401  || error.response.status===403 && !originalRequest._retry) {
            originalRequest._retry = true;
            
           
              try {
                const response = await store.dispatch(refreshToken());
                // don't use axious instance that already configured for refresh token api call
                const newAccessToken = response.data.accessToken; //set new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); //recall Api with new token
              } catch (error) {
                // Handle token refresh failure
                // mostly logout the user and re-authenticate by login again
              }
            
          }
          return Promise.reject(error);
        }
      );
}

export default setup;