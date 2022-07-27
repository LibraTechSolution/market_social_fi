import { requestWithJwt, requestWithoutJwt } from 'api/request/index.api';
import {
  LoginRequestBody,
  LogoutRequestBody,
  MetamaskInfoResponse,
  UserInfoResponse,
  UpdateProfileResponse,
  GetUserDetailResponse,
} from './index.interface';

import { AxiosResponse } from 'axios';

export const getMetamaskInfo = (address: string): Promise<AxiosResponse<MetamaskInfoResponse>> => {
  return requestWithoutJwt.post<MetamaskInfoResponse>('/auth/get_nonce', { walletAddress: address });
};

export const login = (params: LoginRequestBody): Promise<AxiosResponse<UserInfoResponse>> => {
  return requestWithoutJwt.post<UserInfoResponse>('/auth/login', params);
};

export const logout = (params: LogoutRequestBody): Promise<AxiosResponse> => {
  return requestWithJwt.post('/auth/logout', params);
};

// Use in my profile page
export const updateUser = (params: any): Promise<AxiosResponse<UpdateProfileResponse>> => {
  return requestWithJwt.post<GetUserDetailResponse>(`/user/register_final`, params);
};

export const verifySignedMessage = (params: LoginRequestBody): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.post<any>('/auth/verify_signed_message', params);
};
