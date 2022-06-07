import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface CurrencyName {
  [key: string]: string;
}

export interface PriceToUSD {
  [key: string]: { usd: number };
}

export interface PersonalInfo {
  user: User;
  tokens: {
    access: TokenInfo;
    refresh: TokenInfo;
  };
}

export interface MarketPlace {
  contractAddress: string;
  contractAbi: any;
}

export interface User {
  _id: string;
  address: string;
  nonce: number;
  dateCreated: string;
  dateUpdated: string;
  email?: string;
  username?: string;
  role?: string;
  avatar?: string;
  cover?: string;
}

export interface TokenInfo {
  token: string;
  expires: string;
}

export type SmartContractInterfaces = "ERC-721" | "ERC-1155";

export type ConnectWalletSteps =
  | "init"
  | "metamask-not-found"
  | "connecting-to-metamask"
  | "error-connecting"
  | "wrong-network"
  | "update-profile";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
