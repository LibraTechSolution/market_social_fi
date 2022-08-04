import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export interface CurrencyName {
  [key: string]: string;
}

export interface PriceToUSD {
  [key: string]: { usd: number };
}

export interface PersonalInfo {
  refreshToken: string;
  refreshTokenExpiresAt: string;
  token: string;
  tokenExpiresAt: string;
  userId: string;
  walletAddress: string;
  username?: string;
  avatar?: string;
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

export interface MarketPlace {
  contractAddress: string;
  contractAbi: any;
}

export interface NFTDetailListingItem {
  status: string;
  _id: string;
  nftId: string;
  sellerId: string;
  price: number;
  usdPrice: number;
  quantity: number;
  remainQuantity: number;
  from: string;
  dateCreated: string;
  dateUpdated: string;
  original?: boolean;
  acceptedToken?: string;
  orderIdListing?: number;
  unitPrice?: string;
}

export interface NFTItem {
  unlockAbleContent: {
    mode: boolean;
    content: string;
  };
  nftInterface: string;
  numberOfView: number;
  attributes: Attributes[];
  displaySetting: boolean;
  unitPrice: string;
  _id: string;
  name: string;
  royaltyFee: number;
  description: string;
  price: number;
  seller: Seller;
  numberOfCopy: number;
  content: string;
  previewImage: string;
  typeContent: string;
  dateCreated: string;
  dateUpdated: string;
  categoryId: string;
  collectionId: string;
  collection: CollectionItem;
  verified?: boolean;
  category: Category;
  ipfsImage: string;
  tokenURI: string;
  totalMinted: number;
  totalOwner: number;
  totalSold: number;
  stage: string;
  tokenId: string;
  onSaleQuantity: number;
  pushItemOnSale: boolean;
  contractAddress: string;
  displayOnMarketplace: boolean;
  isSeller?: boolean;
  nftId: string;
  createdByAdmin: boolean;
  status?: string;
  hasListing?: boolean;
  totalOwnedQuantity?: number;
}

export interface NFTOverview {
  available: number;
  owners: number;
}

export interface NFTTradingHistory {
  nft: {
    id: string;
    content: string;
    previewImage: string;
    typeContent: string;
  };
  _id: string;
  sellerId: string;
  buyerId: string;
  quantity: number;
  fromAddress: string;
  toAddress: string;
  price: number;
  event: string;
  listingId: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface Attributes {
  key: string;
  imageIcon: string;
  type: string;
  value: string;
}

export interface Seller {
  role: string;
  _id: string;
  address: string;
  nonce: number;
  dateCreated: string;
  username: string;
  email: string;
  dateUpdated: string;
}

export interface CollectionItem {
  _id: string;
  collectionType: string;
  logoImage: string;
  collectionBanner: string;
  collectionName: string;
  collectionDescription: string;
  numberOfViews: number;
  sellerId: string;
  categoryId: string;
  seller: Seller;
  category: Category;
  dateCreated: string;
  dateUpdated: string;
}

export interface Category {
  _id: string;
  name: string;
  dateCreated: string;
  dateUpdated: string;
}

export type Sort = 'desc' | 'asc' | '';

type Align = 'left' | 'center' | 'right';

export interface Cell {
  isSort?: boolean;
  headerName: string | ReactNode;
  field: string;
  align?: Align;
  width?: number | string;
  renderCell: ({ value }: { value: any }, cellData: any, index?: number) => ReactNode;
}

export interface TableSort {
  field: string;
  sort: Sort;
}

export type SmartContractInterfaces = 'ERC-721';

export type ConnectWalletSteps =
  | 'init'
  | 'metamask-not-found'
  | 'connecting-to-metamask'
  | 'error-connecting'
  | 'wrong-network'
  | 'update-profile';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
