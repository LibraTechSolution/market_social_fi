import mainnet from "./mainnet";
import testnet from "./testnet";
import erc721 from "./abi/erc721.json";
import erc1155 from "./abi/erc1155.json";
import minErc721 from "./abi/erc721-v2.json";
import minErc1155 from "./abi/erc1155-v2.json";
import collectionErc721 from "./abi/collectionErc721.json";
import collectionErc1155 from "./abi/collectionErc1155.json";
import order from "./abi/order.json";

export const contractBNB = "0x0000000000000000000000000000000000000000";
export const ZERO = "0x0000000000000000000000000000000000000000";

export const SCOrder = {
  address: "0xee4bD1070D8AcE63f0423FB4Ed01801165fA7b87",
  abi: order,
};

export const AddressTransfer = "0x39afD2C5b4d44A3b9ECcA52E251463d096064d91";
export const erc20Transfer = "0x80D18aa41Ea83D84a6205014486E905229388df1";

export const SC: { [key: string]: any } =
  process.env.APP_ENV === "production" ? mainnet : testnet;

export const SCAddresses = {
  "ERC-1155": "0xC30ffDB65A10D94BC453c0c60dB422636F47A753",
  "ERC-721": "0xF86c5975EE544685BE1E71e786e0BbC2d0857753",
};

export const SCAddressesv2 = {
  "ERC-1155": "0xDFA923090A0C65851Aa5F3d2A3581911E8b9E838",
  "ERC-721": "0x2D62c8a36748845861681eba5416D54d3d9905bB",
};

export const SCAbi = {
  "ERC-1155": erc1155,
  "ERC-721": erc721,
};

export const SCAbiv2 = {
  "ERC-1155": minErc1155,
  "ERC-721": minErc721,
};

export const MinScContract = {
  ERC721: {
    abi: minErc721,
    address: "0x2D62c8a36748845861681eba5416D54d3d9905bB",
  },
  ERC1155: {
    abi: minErc1155,
    address: "0xDFA923090A0C65851Aa5F3d2A3581911E8b9E838",
  },
};

export const SCCollection: { [key: string]: any } = {
  "ERC-1155": "0x72b18Ed5528232b90f134a5A70Ee5985E90263CC",
  "ERC-721": "0xa6b92C5E5c08abd82Ac0868dEFf3A1b284B74894",
};

export const SCCollectionAbi: { [key: string]: any } = {
  "ERC-1155": collectionErc1155,
  "ERC-721": collectionErc721,
};
