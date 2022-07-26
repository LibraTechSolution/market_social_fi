import mainnet from './mainnet';
import testnet from './testnet';
import erc721 from './abi/erc721.json';

export const AddressTransfer = '0x39afD2C5b4d44A3b9ECcA52E251463d096064d91';
export const erc20Transfer = '0x80D18aa41Ea83D84a6205014486E905229388df1';

export const SC: { [key: string]: any } = process.env.APP_ENV === 'production' ? mainnet : testnet;

export const SCAddresses = {
  'ERC-721': '0xAb0515f6302A5C42A7362F983B016a65774F79de',
};

export const SCAbi = {
  'ERC-721': erc721,
};

export const MinScContract = {
  ERC721: {
    abi: erc721,
    address: '0xAb0515f6302A5C42A7362F983B016a65774F79de',
  },
};
