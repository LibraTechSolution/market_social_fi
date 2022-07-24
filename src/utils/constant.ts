import { CurrencyName } from 'utils/interfaces';
import maticConfig from 'utils/smart-contract/testnet/matic';

export const RouteConst = {
  BASE_URL: process.env.NEXT_PUBLIC_DOMAIN,
};

export const ERRORS = {
  E0: (fieldName: string) => `${fieldName} already existed.`,
  E1: 'Please enter a valid email address.',
  E2: (fieldName: string, num: number) => `${fieldName} must be at least ${num} characters.`,
  E3: (fieldName: string, num: number) => `${fieldName} can’t be longer than ${num} characters.`,
  E4: (fieldName: string) => `${fieldName} is required.`,
  E5: (fieldName: string, num: number) => `${fieldName} must be greater than ${num}.`,
  E6: (fieldName: string, maxAvaiQuantity: number) => `Maximum ${fieldName} is ${maxAvaiQuantity}`,
  E7: 'Maximum number must be greater than minimum number',
  E8: 'Something went wrong! There was error with your transaction! Please try again.',
  E9: (fileSize: number) => `File size is exceeding ${fileSize}MB`,
  E10: 'File format is invalid',
  E11: (fieldName: string) => `${fieldName} must be must be an integer.`,
  E12: 'Please enter a valid username address.',
};

export const METAMASK_DOWNLOAD_LINK = 'https://metamask.io/download.html';

export const ERC_TOKEN = {
  ERC_721: 'ERC-721',
};

export const FILE_NFT_TYPE = [
  'image/jpeg',
  'image/gif',
  'image/svg+xml',
  'image/png',
  'video/mp4',
  'audio/mpeg',
  'video/webm',
  'audio/wav',
  'audio/ogg',
];

export const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100Mb
export const MAX_IMG_SIZE = 1024 * 1024 * 3; // 3Mb
export const MAX_LOGO_FILE_SIZE = 1024 * 1024 * 3; // 3Mb
export const MAX_BANNER_FILE_SIZE = 1024 * 1024 * 10; // 10Mb

export const CURRENCY_NAME: CurrencyName = {
  BNB: 'binancecoin',
  WETH: 'weth',
  BUSD: 'binance-usd',
};

export const CURRENCY_UNIT_NAME = {
  // BNB: 'BNB',
  // WETH: 'WETH',
  // BUSD: 'BUSD',
  MATIC: 'MATIC',
};

export const PRICE_TO_USD = {
  weth: { usd: 0 },
  'binance-usd': { usd: 0 },
  binancecoin: { usd: 0 },
  doragonland: { usd: 0 },
};

export interface PriceToUSD {
  [key: string]: { usd: number };
}

export type ICreateNFTProcess = 'approve' | 'mint' | 'signsalesorder';

export interface ProcessMintNftProps {
  step: ICreateNFTProcess | string;
  txHash: string;
  isShowModalCreateNFT: boolean;
  isLoadingApprove: boolean;
  isLoadingMint: boolean;
  isLoadingSign: boolean;
  isApproveSuccess: boolean;
  isMintSuccess: boolean;
  isSignSuccess: boolean;
  isCreateNftSuccess: boolean;
  isError: boolean;
}

export const initProcess: ProcessMintNftProps = {
  step: '',
  txHash: '',
  isShowModalCreateNFT: false,
  isLoadingApprove: false,
  isLoadingMint: false,
  isLoadingSign: false,
  isApproveSuccess: false,
  isMintSuccess: false,
  isSignSuccess: false,
  isCreateNftSuccess: false,
  isError: false,
};
