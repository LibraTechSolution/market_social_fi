import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
// import { getNFTDetail } from 'api/nft-detail.api';
import NFTDetailStoreProvider, { initialNFTDetailState } from 'stores/nft-detail';
import NFTDetail from 'modules/nft-details';

const NFTDetailPage: NextPage = () => {
  return (
    <NFTDetailStoreProvider initStore={initialNFTDetailState}>
      <NFTDetail />
    </NFTDetailStoreProvider>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nftId = context.params?.nftID;

  try {
    //TODO: GET NFT ID and Check Found NFT
    // const responseDetail = await getNFTDetail(nftId?.toString());
    // if (responseDetail && !responseDetail?.data?.data?.displayOnMarketplace) {
    //   return {
    //     redirect: {
    //       destination: '/404',
    //       permanent: false,
    //     },
    //   };
    // }
  } catch (e) {
    console.log(e);
  }
  return {
    props: {},
  };
}

export default NFTDetailPage;
