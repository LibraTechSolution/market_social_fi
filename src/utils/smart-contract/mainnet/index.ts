import maticConfig from './matic';
import erc721Abi from 'utils/smart-contract/abi/erc721.json';

export const SMART_CONTRACT = {
  ERC721: {
    abiMint: erc721Abi,
    addressMint: '0x2D62c8a36748845861681eba5416D54d3d9905bB',
    marketPlaceAddress: '0xF86c5975EE544685BE1E71e786e0BbC2d0857753',
  },
};

const mainnet = {
  MATIC: maticConfig,
  SMART_CONTRACT,
};

export default mainnet;
