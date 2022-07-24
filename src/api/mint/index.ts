import { requestWithJwt, requestWithoutJwt } from 'api/request/index.api';
import { MarketplaceProof } from './interface';
import { AxiosResponse } from 'axios';

export const getMarketplaceProof = (walletAddress: string): Promise<AxiosResponse<MarketplaceProof>> => {
  return requestWithoutJwt.post<MarketplaceProof>('/auth/merkle_proof', { walletAddress: walletAddress });
};
