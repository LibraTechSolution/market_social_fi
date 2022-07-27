import axios, { AxiosError } from 'axios';
import { getFromLocalStorage } from 'utils/functions';
import { PersonalInfo } from 'utils/interfaces';
import { ErrorResponse } from './index.interface';

export const requestWithJwt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

export const requestWithoutJwt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

export const geckoRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GECKO_URL,
  timeout: 10000,
  withCredentials: false,
});

requestWithJwt.interceptors.request.use(async (config) => {
  const personalInfo: PersonalInfo = getFromLocalStorage('personal-info');

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${personalInfo?.token || ''}`,
      ...config.headers,
    },
  };
});

requestWithoutJwt.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
});

requestWithJwt.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (!error.response || !error.response?.data) {
      return Promise.reject({
        code: 'Unknown',
        errors: {
          code: 'Unknown',
          message: 'Server error',
          status: 500,
        },
        message: 'Server error',
      });
    }
    return Promise.reject({
      ...error.response?.data,
    });
  },
);

requestWithoutJwt.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    return Promise.reject({
      ...error.response?.data,
    });
  },
);

geckoRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    return Promise.reject({
      ...error.response?.data,
    });
  },
);
