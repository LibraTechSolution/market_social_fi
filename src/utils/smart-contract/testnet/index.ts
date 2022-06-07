import bnbConfig from "./bnb";
import busdConfig from "./busd";
import dorConfig from "./dor";
import wethConfig from "./weth";
import erc1155Abi from "utils/smart-contract/abi/erc1155-v2.json";
import erc721Abi from "utils/smart-contract/abi/erc721-v2.json";
import order721Abi from "utils/smart-contract/abi/order721.json";
import order1155Abi from "utils/smart-contract/abi/order1155.json";

export const SMART_CONTRACT = {
  ERC721: {
    abiMint: erc721Abi,
    addressMint: "0x2D62c8a36748845861681eba5416D54d3d9905bB",
    abiMarketPlace: order721Abi,
    marketPlaceAddress: "0xF86c5975EE544685BE1E71e786e0BbC2d0857753",
  },
  ERC1155: {
    abiMint: erc1155Abi,
    addressMint: "0xDFA923090A0C65851Aa5F3d2A3581911E8b9E838",
    abiMarketPlace: order1155Abi,
    marketPlaceAddress: "0xC30ffDB65A10D94BC453c0c60dB422636F47A753",
  },
};

export const TOKEN_ADDRESSES: any = {
  USD: "",
  BNB: "0x0000000000000000000000000000000000000000",
  ETH: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
  WBNB: "0x97c012Ef10eDc79510A17272CEE3ecBE1443177F",
  BUSD: "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47",
  DOR: "0x440b856beA3AB8dfDf140a7b292D9F170d2222e2",
  WETH: "0xc3Dc43e9344D2199996edC025b15D0f86cB01443",
  ERC20: "0x80D18aa41Ea83D84a6205014486E905229388df1",
};

const testnet = {
  BNB: bnbConfig,
  BUSD: busdConfig,
  DOR: dorConfig,
  WETH: wethConfig,
  TOKEN_ADDRESSES,
  SMART_CONTRACT,
};

export default testnet;
