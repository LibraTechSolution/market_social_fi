import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  NFTDetailListingItem,
  NFTItem,
  NFTOverview,
  NFTTradingHistory,
  PriceToUSD,
} from "utils/interfaces";

interface INFTDetailStore {
  nftDetail: NFTItem;
  nftOverview: NFTOverview;
  nftFirstListingItem: NFTDetailListingItem;
  nftBuySelected: NFTDetailListingItem;
  nftListingItems: NFTDetailListingItem[];
  priceToUSD: PriceToUSD;
  nftOffChainError: string;
  tradingHistory: NFTTradingHistory[];
}

interface INFTDetailContext {
  nftDetailStore: INFTDetailStore;
  setNFTDetailStore: (values: SetStateAction<INFTDetailStore>) => void;
}

interface IInitStore {
  children?: ReactNode | null;
  initStore: INFTDetailStore;
}

const NFTDetailContext = createContext<INFTDetailContext>({
  nftDetailStore: {} as INFTDetailStore,
  setNFTDetailStore: (values) => values,
});

export const initialNFTDetailState = {
  nftDetail: {} as NFTItem,
  nftOverview: {} as NFTOverview,
  nftFirstListingItem: {} as NFTDetailListingItem,
  nftBuySelected: {} as NFTDetailListingItem,
  nftListingItems: [] as NFTDetailListingItem[],
  priceToUSD: {} as PriceToUSD,
  nftOffChainError: "",
  tradingHistory: [] as NFTTradingHistory[],
};

const NFTDetailProvider = ({ children, initStore }: IInitStore) => {
  const [nftDetailStore, setNFTDetailStore] =
    useState<INFTDetailStore>(initStore);

  return (
    <NFTDetailContext.Provider value={{ nftDetailStore, setNFTDetailStore }}>
      {children}
    </NFTDetailContext.Provider>
  );
};

export const useNFTDetailStore = () => useContext(NFTDetailContext);

export default NFTDetailProvider;
