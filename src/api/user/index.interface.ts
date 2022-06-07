import {
  PersonalInfo,
  User,
} from 'utils/interfaces'

export interface LoginRequestBody {
  address: string;
  signature: string;
}

export interface LogoutRequestBody {
  refreshToken: string;
}

export interface MetamaskInfoResponse {
  data: {
    address: string;
    nonce: string;
    isNew?: boolean;
  };
}

export interface UserInfoResponse {
  data: PersonalInfo;
}

export interface UpdateProfileResponse {
  data: User;
}

export interface GetUserDetailResponse {
  data: User & {
    avatar: string;
    personalSiteOrPortfolio: string;
  };
}
