import { requestWithJwt, requestWithoutJwt } from "api/request/index.api";
import {
  LoginRequestBody,
  LogoutRequestBody,
  MetamaskInfoResponse,
  UserInfoResponse,
  UpdateProfileResponse,
  GetUserDetailResponse,
} from './index.interface'

import { AxiosResponse } from "axios";

export const getMetamaskInfo = (
  address: string,
): Promise<AxiosResponse<MetamaskInfoResponse>> => {
  return requestWithoutJwt.get<MetamaskInfoResponse>(
    `/auth/get-nonce/${address}`,
  );
};

export const login = (
  params: LoginRequestBody,
): Promise<AxiosResponse<UserInfoResponse>> => {
  return requestWithoutJwt.post<UserInfoResponse>("/auth/login", params);
};

export const logout = (params: LogoutRequestBody): Promise<AxiosResponse> => {
  return requestWithJwt.post("/auth/logout", params);
};

// Use in my profile page
export const updateUser = (
  params: FormData,
): Promise<AxiosResponse<UpdateProfileResponse>> => {
  return requestWithJwt.put<GetUserDetailResponse>(`/user`, params);
};
