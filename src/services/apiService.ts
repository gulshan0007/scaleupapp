import {API} from './apiConstent';
import axiosInstance from './axiosinstance';

export const loginApi = (payload: any) => {
  return axiosInstance.post(API.SIGNIN, payload);
};

export const getOtp = (payload: any) => {
  return axiosInstance.post(API.AUTH_OTP, payload);
};

export const verifyOtp = (payload: any) => {
  return axiosInstance.post(API.OTP_VERIFY, payload);
};

export const registerApi = (payload: any) => {
  return axiosInstance.post(API.REGISTER, payload);
};
