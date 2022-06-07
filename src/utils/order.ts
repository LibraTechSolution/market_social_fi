/**
 * Global interfaces
 */

export interface AssetType {
  assetClass: string;
  data: any;
}

export interface Asset {
  assetType: AssetType;
  value: any;
}

export interface Order {
  maker: any;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  salt: number;
  start: number;
  end: number;
  dataType: any;
  data: any;
}

export interface Part {
  account?: string;
  value: number;
}

export interface DataV1 {
  payouts: Part[];
  originFees: Part[];
}

export interface DataV2 {
  payouts: Part[];
  originFees: Part[];
  isMakeFill: boolean;
}

export interface NFTSG {
  royalties: Part[];
  creators: Part[];
  tokenId: any;
  tokenURI: any;
}
export interface LazyMint {
  royalties: Part[];
  creators: Part[];
  tokenId: any;
  tokenURI: any;
  signatures: any[];
  supply?: any;
}
