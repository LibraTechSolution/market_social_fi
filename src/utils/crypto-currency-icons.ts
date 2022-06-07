import BinanceSvg from "assets/images/crypto-currency/bnb.svg";
import WethSvg from "assets/images/crypto-currency/weth.svg";
import BusdSvg from "assets/images/crypto-currency/busd.svg";

interface CryptoCurrency {
  [key: string]: any;
}

interface CryptoCurrencyName {
  [key: string]: string;
}

export const CryptoCurrency: CryptoCurrency = {
  bnb: BinanceSvg,
  weth: WethSvg,
  busd: BusdSvg,
};

export const CryptoCurrencyName: CryptoCurrencyName = {
  bnb: "Binance",
  weth: "WETH",
  busd: "Binance USD",
};
