import {
  PriceToUSD,
} from "utils/interfaces";

export interface GeckoSimplePriceBody {
  ids?: string;
  vs_currencies?: string;
}

export interface GeckoSimplePriceResponse extends PriceToUSD {}