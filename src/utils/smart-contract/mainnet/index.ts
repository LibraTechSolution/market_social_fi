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
    addressMint: "0x3c7a989a05F2CCaC5BF13Aa7BBB721144890a861",
    abiMarketPlace: order1155Abi,
    marketPlaceAddress: "0xC30ffDB65A10D94BC453c0c60dB422636F47A753",
  },
};

const mainnet = {
  BNB: bnbConfig,
  BUSD: busdConfig,
  DOR: dorConfig,
  WETH: wethConfig,
  SMART_CONTRACT,
};

export default mainnet;
