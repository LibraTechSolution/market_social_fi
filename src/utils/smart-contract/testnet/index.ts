import maticConfig from './matic';
import erc721Abi from 'utils/smart-contract/abi/erc721.json';

export const SMART_CONTRACT = {
  ERC721: {
    abiMint: erc721Abi,
    addressMint: '0xAb0515f6302A5C42A7362F983B016a65774F79de',
    marketPlaceAddress: '0xF86c5975EE544685BE1E71e786e0BbC2d0857753',
  },
};

export const TOKEN_ADDRESSES: any = {
  USD: '',
  MATIC: '0x0000000000000000000000000000000000001010',
  ERC20: '0x80D18aa41Ea83D84a6205014486E905229388df1',
};

const testnet = {
  MATIC: maticConfig,
  TOKEN_ADDRESSES,
  SMART_CONTRACT,
};

export default testnet;
