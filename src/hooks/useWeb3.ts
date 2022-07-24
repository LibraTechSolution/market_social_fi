import { useCallback, useMemo, useRef, useEffect } from 'react';
import { MarketPlace } from 'utils/interfaces';
import { SC } from 'utils/smart-contract';
import mainnet from 'utils/smart-contract/mainnet';
import testnet from 'utils/smart-contract/testnet';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getWalletSupports } from 'utils/functions';
import { Order, LazyMint } from 'utils/order';
import { Types, TypesMint721, TypesMint1155, createTypeData } from 'utils/sign/EIP712';

interface SignInProps {
  nonce: string;
  address: string;
  errorCb?: (e: Error) => void;
}

interface DataColection {
  addressSC: string;
  name: string;
  description: string;
  image: string;
  cover: string;
}

interface SignCollectionProps {
  data: DataColection;
  address: string;
  errorCb?: (e: Error) => void;
}

const createWalletConnectProvider = () => {
  return new WalletConnectProvider({
    infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
    qrcodeModalOptions: {
      mobileLinks: getWalletSupports(),
    },
    rpc: {
      137: mainnet['MATIC'].rpcUrls[0],
      80001: testnet['MATIC'].rpcUrls[0],
    },
    // accept number
    chainId: SC['MATIC'].chainIdNumber,
  });
};

let walletConnectProvider = createWalletConnectProvider();

type ChangeWallet = 'toMetamask' | 'toWalletConnect' | 'empty';

let changeWalletRef: ChangeWallet = 'empty';

let _isClearData: boolean = true;

const useWeb3 = () => {
  const web3 = useRef<Web3 | null>();
  const isMetamaskInstalled = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return (window as any).ethereum;
  }, []);
  const setChangeWalletRef = useCallback((changeWallet: ChangeWallet) => {
    changeWalletRef = changeWallet;
  }, []);

  //disable extension Coin98 wallet
  useEffect(() => {
    if ((window as any).ethereum && (window as any).ethereum.isCoin98) {
      (window as any).ethereum = (window as any).web3.currentProvider;
    }
  });

  const connectAfterReload = useCallback(async () => {
    if (walletConnectProvider.connector.connected) {
      await walletConnectProvider.enable();
    }
  }, []);

  useEffect(() => {
    connectAfterReload();
  }, [connectAfterReload]);

  const createWeb3Instance = useCallback(async () => {
    if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
      return;
    }
    const isWalletConnect =
      changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
    web3.current = new Web3(isWalletConnect ? (walletConnectProvider as any) : (window as any).ethereum);
    return isWalletConnect
      ? walletConnectProvider.request({
          method: 'eth_requestAccounts',
        })
      : await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
  }, [isMetamaskInstalled]);

  const signIn = useCallback(
    async ({ nonce, address, errorCb }: SignInProps) => {
      if (!isMetamaskInstalled) {
        return;
      }
      const signature = await web3.current?.eth?.personal?.sign(
        web3.current?.utils.toUtf8(`0x${nonce}`),
        address,
        '',
        (e: Error) => {
          errorCb?.(e);
        },
      );
      return signature || '';
    },
    [isMetamaskInstalled],
  );

  const signCollection = useCallback(
    async ({ data, address, errorCb }: SignCollectionProps) => {
      if (!isMetamaskInstalled) {
        return;
      }
      const web3 = new Web3((window as any).ethereum);
      return await web3.eth.personal.sign(
        `I would like to update preferences for
        \n${data.addressSC}.
        \nShort url is ${data.name}. Description is ${data.description}.
        \nPicture is ${data.image}. Cover is ${data.cover}`,
        address,
        '',
        (e: Error) => {
          errorCb?.(e);
        },
      );
    },
    [isMetamaskInstalled],
  );

  const id = useCallback((str: any) => {
    const web3 = new Web3((window as any).provider);
    return web3.utils?.keccak256(str).substring(0, 10);
  }, []);

  const enc = useCallback((token: any, tokenId: any) => {
    const web3 = new Web3((window as any).provider);
    if (tokenId) {
      return web3.eth.abi.encodeParameters(['address', 'uint256'], [token, tokenId]);
    } else {
      return web3.eth.abi.encodeParameter('address', token);
    }
  }, []);

  async function getSignOrder(order: Order, account: any, verifyingContract: any) {
    if (!isMetamaskInstalled) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      async function cb(err: any, result: any) {
        if (err) {
          return reject(err);
        }
        if (result.error) {
          return reject(result.error);
        }
        const sig = result.result;
        const sig0 = sig.substring(2);
        const r = '0x' + sig0.substring(0, 64);
        const s = '0x' + sig0.substring(64, 128);
        const v = parseInt(sig0.substring(128, 130), 16);
        resolve({
          data,
          sig,
          sig0,
          r,
          v,
          s,
        });
      }
      const web3 = new Web3((window as any).ethereum);
      const chainId = await web3.eth.getChainId();
      const data = createTypeData(
        {
          name: 'Order',
          version: '1',
          chainId,
          verifyingContract,
        },
        'Order',
        order,
        Types,
      );
      await (window as any).ethereum.sendAsync(
        {
          method: 'eth_signTypedData_v4',
          params: [account, JSON.stringify(data)],
          from: account,
        },
        cb,
      );
    });
  }

  async function getSignMint721(nft: LazyMint, account: any, verifyingContract: any) {
    if (!isMetamaskInstalled) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      async function cb(err: any, result: any) {
        if (err) {
          return reject(err);
        }
        if (result.error) {
          return reject(result.error);
        }
        const sig = result.result;
        const sig0 = sig.substring(2);
        const r = '0x' + sig0.substring(0, 64);
        const s = '0x' + sig0.substring(64, 128);
        const v = parseInt(sig0.substring(128, 130), 16);
        resolve({
          data,
          sig,
          sig0,
          r,
          v,
          s,
        });
      }
      const web3 = new Web3((window as any).ethereum);
      const chainId = await web3.eth.getChainId();
      const data = createTypeData(
        {
          name: 'Mint721',
          version: '1',
          chainId,
          verifyingContract,
        },
        'Mint721',
        nft,
        TypesMint721,
      );
      console.log(data);
      await (window as any).ethereum.sendAsync(
        {
          method: 'eth_signTypedData_v4',
          params: [account, JSON.stringify(data)],
          from: account,
        },
        cb,
      );
    });
  }

  async function getSignMint1155(nft: LazyMint, account: any, verifyingContract: any) {
    if (!isMetamaskInstalled) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      async function cb(err: any, result: any) {
        if (err) {
          return reject(err);
        }
        if (result.error) {
          return reject(result.error);
        }
        const sig = result.result;
        const sig0 = sig.substring(2);
        const r = '0x' + sig0.substring(0, 64);
        const s = '0x' + sig0.substring(64, 128);
        const v = parseInt(sig0.substring(128, 130), 16);
        resolve({
          data,
          sig,
          sig0,
          r,
          v,
          s,
        });
      }
      const web3 = new Web3((window as any).ethereum);
      const chainId = await web3.eth.getChainId();
      const data = createTypeData(
        {
          name: 'Mint1155',
          version: '1',
          chainId,
          verifyingContract,
        },
        'Mint1155',
        nft,
        TypesMint1155,
      );
      console.log(data);
      await (window as any).ethereum.sendAsync(
        {
          method: 'eth_signTypedData_v4',
          params: [account, JSON.stringify(data)],
          from: account,
        },
        cb,
      );
    });
  }

  const walletConnect = useCallback(async () => {
    try {
      walletConnectProvider = createWalletConnectProvider();
      return await walletConnectProvider.enable();
    } catch (error: any) {
      console.error(error, 'error');
      walletConnectProvider = createWalletConnectProvider();
      throw error;
    }
  }, []);

  const signWalletConnect = useCallback(async (nonce: number | string, address: string, errorCb: any) => {
    try {
      const web3 = new Web3(walletConnectProvider as any);
      return await web3.eth.personal.sign(`I am signing my one-time nonce: ${nonce}`, address, '', (e) => errorCb(e));
    } catch (error: any) {
      console.error(error, 'error');
      await walletConnectProvider.disconnect();
      _isClearData = false;
      throw error;
    }
  }, []);
  const disconnectWalletConnect = useCallback(
    async (isClearData: boolean = false, callbackAfterDisconnect = () => {}) => {
      await walletConnectProvider.disconnect();
      walletConnectProvider = createWalletConnectProvider();
      _isClearData = false;
      if (isClearData) {
        _isClearData = true;
        callbackAfterDisconnect?.();
      }
    },
    [],
  );

  const listenWalletConnectSessionReject = useCallback((cb: any) => {
    return walletConnectProvider.connector.on('disconnect', (error: any, payload: any) => {
      cb(error, payload, _isClearData);
      walletConnectProvider = createWalletConnectProvider();
    });
  }, []);

  const listenWalletConnectConnect = useCallback((cb: any) => {
    return walletConnectProvider.connector.on('wc_sessionRequest', (error: any, payload: any) => {
      cb(error, payload);
    });
  }, []);

  const getAddress = useCallback(async () => {
    if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
      return '';
    }
    const address = await web3.current?.eth?.getCoinbase();
    if (typeof window === 'undefined') {
      return '';
    }
    if (!address) {
      // window.alert("Please activate MetaMask first.");
      return '';
    }
    return address || '';
  }, [isMetamaskInstalled]);

  const getContract = useCallback(
    (contract: MarketPlace, token: keyof typeof SC) => {
      if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
        return;
      }
      const isWalletConnect =
        changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
      const web3 = isWalletConnect
        ? new Web3(walletConnectProvider as any)
        : new Web3((window as any).ethereum || SC[token].rpcUrls[0]);
      return new web3.eth.Contract(contract.contractAbi, contract.contractAddress);
    },
    [isMetamaskInstalled],
  );

  const getContractOfNetwork = useCallback(
    (contract: MarketPlace, token: keyof typeof SC) => {
      if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
        return;
      }
      const isWalletConnect =
        changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
      const web3 = isWalletConnect
        ? new Web3(walletConnectProvider as any)
        : new Web3((window as any).ethereum || SC[token].rpcUrls[0]);
      return new web3.eth.Contract(contract.contractAbi, contract.contractAddress);
    },
    [isMetamaskInstalled],
  );

  const getBalanceOfToken = useCallback(
    async (account: string, token: keyof typeof SC, tokenAddress: string) => {
      if ((!isMetamaskInstalled && !walletConnectProvider.connector.connected) || !account) {
        return '';
      }
      const isWalletConnect =
        changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
      const web3 = isWalletConnect ? new Web3(walletConnectProvider as any) : new Web3((window as any).ethereum);
      const contract = getContractOfNetwork(
        {
          contractAbi: SC[token].abi,
          contractAddress: SC[token].address,
        },
        token,
      );
      const balance = await contract?.methods.balanceOf(account).call();
      return web3.utils.fromWei(balance);
    },
    [getContractOfNetwork, isMetamaskInstalled],
  );

  const getBalance = useCallback(
    async (account: string) => {
      if ((!isMetamaskInstalled && !walletConnectProvider.connector.connected) || !account) {
        return '';
      }
      const isWalletConnect =
        changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
      const web3 = isWalletConnect ? new Web3(walletConnectProvider as any) : new Web3((window as any).ethereum);
      const balance = await web3.eth.getBalance(account);
      return web3.utils.fromWei(balance);
    },
    [isMetamaskInstalled],
  );

  const generateOrderID = useCallback(() => {
    if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
      return;
    }
    const isWalletConnect =
      changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
    const web3 = isWalletConnect ? new Web3(walletConnectProvider as any) : new Web3((window as any).ethereum);
    return Number(web3.utils.randomHex(32));
  }, [isMetamaskInstalled]);

  const switchNetwork = useCallback(
    async (token: keyof typeof SC, cancelCb?: () => void) => {
      if (!isMetamaskInstalled) {
        return;
      }
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SC[token].chainId }],
        });
      } catch (error: any) {
        if (error.code === 4001) {
          cancelCb?.();
        }

        // This error code indicates that the chain has not been added to MetaMask.
        if (error.code === 4902) {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: SC[token].chainId,
                chainName: SC[token].chainName,
                rpcUrls: SC[token].rpcUrls,
                nativeCurrency: SC[token].nativeCurrency,
              },
            ],
          });
        } else {
          throw error;
        }
        // handle other "switch" errors
      }
    },
    [isMetamaskInstalled],
  );

  const getNetworkChainID = useCallback(async () => {
    if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
      return;
    }
    const isWalletConnect =
      changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
    return isWalletConnect
      ? await walletConnectProvider.request({ method: 'eth_chainId' })
      : await (window as any).ethereum.request({ method: 'eth_chainId' });
  }, [isMetamaskInstalled]);

  const listenNetworkChange = useCallback(
    (cb?: (chaindID: any) => void) => {
      if (!isMetamaskInstalled) {
        return;
      }
      (window as any).ethereum.on('chainChanged', cb);
    },
    [isMetamaskInstalled],
  );

  const listenAccountChange = useCallback(
    (cb?: (accounts: Array<string>) => Promise<void>) => {
      if (!isMetamaskInstalled) {
        return;
      }
      (window as any).ethereum.on('accountsChanged', cb);
    },
    [isMetamaskInstalled],
  );

  const listenWalletConnectAccountChange = useCallback((cb?: (accounts: Array<string>) => Promise<void>) => {
    walletConnectProvider.on('accountsChanged', cb);
  }, []);

  const listenWalletConnectNetworkChange = useCallback((cb?: (chaindID: any) => void) => {
    walletConnectProvider.on('chainChanged', cb);
  }, []);

  const listenMetamaskDisconnect = useCallback((cb: any) => {
    return (window as any).ethereum.on('disconnect', cb);
  }, []);

  const listenWalletConnectDisconnect = useCallback((cb: any) => {
    return walletConnectProvider.on('disconnect', cb);
  }, []);

  const disconnect = useCallback(async () => {
    if (!isMetamaskInstalled) {
      return;
    }
    return await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    });
  }, [isMetamaskInstalled]);

  const getCurrentAddress = useCallback(() => {
    if (!isMetamaskInstalled && !walletConnectProvider.connector.connected) {
      return;
    }
    const isWalletConnect =
      changeWalletRef === 'empty' ? walletConnectProvider.connector.connected : changeWalletRef === 'toWalletConnect';
    return isWalletConnect
      ? walletConnectProvider.request({ method: 'eth_accounts' })
      : (window as any).ethereum.request({ method: 'eth_accounts' });
  }, [isMetamaskInstalled]);

  const getWalletConnectChainId = useCallback(() => {
    return walletConnectProvider.chainId;
  }, []);

  const isMetamaskConnected = useCallback(() => {
    if (!isMetamaskInstalled) {
      return;
    }
    return (window as any).ethereum.isConnected() as boolean;
  }, [isMetamaskInstalled]);

  const addEthereumChain = useCallback(
    async (token: keyof typeof SC) => {
      if (!isMetamaskInstalled) {
        return;
      }
      return await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: SC[token].chainId,
            chainName: SC[token].chainName,
            rpcUrls: SC[token].rpcUrls,
            nativeCurrency: SC[token].nativeCurrency,
          },
        ],
      });
    },
    [isMetamaskInstalled],
  );

  return {
    signIn,
    signCollection,
    id,
    enc,
    getSignOrder,
    getSignMint721,
    getSignMint1155,
    isMetamaskInstalled,
    getAddress,
    getContract,
    getContractOfNetwork,
    getBalanceOfToken,
    getBalance,
    generateOrderID,
    switchNetwork,
    getNetworkChainID,
    listenNetworkChange,
    createWeb3Instance,
    listenAccountChange,
    disconnect,
    getCurrentAddress,
    walletConnect,
    disconnectWalletConnect,
    signWalletConnect,
    isWalletConnected: walletConnectProvider.connected,
    listenWalletConnectSessionReject,
    listenWalletConnectConnect,
    getWalletConnectChainId,
    isWalletConnecting: walletConnectProvider.isConnecting,
    setChangeWalletRef,
    isHex: Web3.utils.isHexStrict,
    toHex: Web3.utils.toHex,
    changeWalletRef,
    listenWalletConnectAccountChange,
    listenWalletConnectNetworkChange,
    listenMetamaskDisconnect,
    listenWalletConnectDisconnect,
    isMetamaskConnected,
    addEthereumChain,
  };
};

export default useWeb3;
