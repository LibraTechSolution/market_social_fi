import WethSvg from "assets/images/crypto-currency/weth.png";
import BusdSvg from "assets/images/crypto-currency/busd.png";
import BinanceSvg from "assets/images/crypto-currency/IconCrypto.png";
import BNBIcon from "assets/images/crypto-currency-new/IconBnb.png";
import WethIcon from "assets/images/crypto-currency-new/IconEth.png";
import BusdIcon from "assets/images/crypto-currency-new/IconBusd.png";

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
  weth: "ETH",
  busd: "Binance USD",
};
export const CryptoCurrencyNew: CryptoCurrency = {
  bnb: BNBIcon,
  weth: WethIcon,
  busd: BusdIcon,
};
