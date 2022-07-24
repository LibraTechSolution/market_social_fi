import { useCallback } from 'react';
import useWeb3 from './useWeb3';
import Big from 'big.js';
import useSessionStorage from './useSessionStorage';
import { PersonalInfo, SmartContractInterfaces } from 'utils/interfaces';
import { SCAddresses } from 'utils/smart-contract';
import { ERC_TOKEN } from 'utils/constant';

const useMarket = () => {
  const { getContract, getContractOfNetwork } = useWeb3();
  const [personalInfo] = useSessionStorage<PersonalInfo | null>('personal-info', null);

  const isApproveToken = useCallback(
    async ({
      market,
      amount,
      account,
      nftInterface,
    }: {
      market: any;
      amount: string;
      account: string;
      nftInterface: SmartContractInterfaces;
    }) => {
      const number = await market.contract.methods.allowance(account, SCAddresses[nftInterface]).call();
      return Big(number).cmp(Big(amount)) >= 0;
    },
    [],
  );

  const approveMarketPlace = useCallback(async ({ market, marketAddress }: { market: any; marketAddress: string }) => {
    return await market.contract.methods.setApprovalForAll(marketAddress, true).send({ from: market.account });
  }, []);

  const approveToken = useCallback(
    async ({
      market,
      nftInterface,
      account,
    }: {
      market: any;
      account: string;
      quantities: number;
      nftInterface: SmartContractInterfaces;
    }) => {
      return await market.contract.methods
        .approve(SCAddresses[nftInterface], BigInt(2 ** 256 / 1.1))
        .send({ from: account });
    },
    [],
  );

  const createMarket = useCallback(
    (contractMarket: any, token?: any) => {
      return {
        contract: getContract(contractMarket, token),
        contractCurrentNetwork: getContractOfNetwork(contractMarket, token),
        address: contractMarket.contractAddress,
        account: personalInfo?.user?.address || '',
      };
    },
    [getContract, getContractOfNetwork, personalInfo?.user?.address],
  );

  const takeOrderMarketplace = useCallback(
    async ({
      market,
      orderId,
      quantities,
      targetPrice,
      account,
      afterSent,
    }: {
      market: any;
      orderId: number;
      account: string;
      quantities: number;
      targetPrice?: string;
      afterSent?: any;
    }) => {
      const params: any = { from: account };
      if (targetPrice) {
        params.value = targetPrice;
      }
      return await market.contract.methods.takeOrder(orderId, quantities).send(params, () => {
        afterSent?.();
      });
    },
    [],
  );

  const approve = useCallback(async ({ market }: { market: any }) => {
    return await market.contract.methods.setApprovalForAll(market.address, true).send({ from: market.account });
  }, []);

  const sendTransactionToCreate = useCallback(async ({ orderInfo, market }: { orderInfo: any; market: any }) => {
    return await market.contract.methods.createOrder(...orderInfo).send({ from: market.account });
  }, []);

  const cancelOrder = useCallback(async ({ orderId, market }: { orderId: number; market: any }) => {
    return await market.contract.methods.cancelOrder(orderId).send({ from: market.account });
  }, []);

  const isApprovedForAll = useCallback(
    async ({ owner, operator, market }: { owner: string; operator: string; market: any }) => {
      return await market.contract.methods.isApprovedForAll(owner, operator).call();
    },
    [],
  );

  const getOderById = useCallback(async ({ orderId, market }: { orderId: number; market: any }) => {
    return await market.contract.methods.getOrder(orderId).call();
  }, []);

  const getBalanceOfUser = useCallback(
    async ({ account, id, market }: { account: string; id: number; market: any }) => {
      return await market.contract.methods.balanceOf(account, id).call();
    },
    [],
  );

  const mint = useCallback(
    async ({
      market,
      markleProof,
      mintAmount,
      targetPrice,
    }: {
      market: any;
      markleProof: any;
      mintAmount: number | string;
      targetPrice: any;
    }) => {
      const params: any = { from: market.account };
      if (targetPrice) {
        params.value = targetPrice;
      }
      return await market.contract.methods.mintWhitelist(markleProof, mintAmount).send(params);
    },
    [],
  );

  return {
    createMarket,
    isApproveToken,
    approveToken,
    takeOrderMarketplace,
    approve,
    sendTransactionToCreate,
    cancelOrder,
    isApprovedForAll,
    approveMarketPlace,
    getOderById,
    getBalanceOfUser,
    mint,
  };
};

export default useMarket;
