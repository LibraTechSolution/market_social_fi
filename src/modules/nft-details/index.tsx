import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { dotsSensitive, roundingNumber } from 'utils/functions';
import { CURRENCY_NAME, ERC_TOKEN, ERRORS, MESSAGE_STATUS, PRICE_TO_USD } from 'utils/constant';
import { NextPageWithLayout, NFTItem, NFTOverview, PersonalInfo, PriceToUSD } from 'utils/interfaces';
import { getListNFTPrice } from 'api/gecko/index';
import nftDetail, { useNFTDetailStore } from 'stores/nft-detail';
import Modal from 'components/modal';
import Payment from 'modules/nft-details/payment';
import Overview from 'modules/nft-details/overview';
import Activities from 'modules/nft-details/activities';
import NFT from 'assets/images/nft/nft.png';
import Eye from 'assets/images/icons/eye.svg';
import Heart from 'assets/images/icons/heart.svg';
import Share from 'assets/images/icons/fi_share.svg';
import Level01 from 'assets/images/icons/level-01.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

const NFTDetail = () => {
  const { nftDetailStore, setNFTDetailStore } = useNFTDetailStore();
  const [priceToUSD, setPriceToUSD] = useState<PriceToUSD>(PRICE_TO_USD);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const getPriceToUsd = useCallback(async () => {
    try {
      const listNFTPrice = await getListNFTPrice({
        ids: Object.values(CURRENCY_NAME).join(','),
        vs_currencies: 'usd',
      });
      if (listNFTPrice) {
        setPriceToUSD(listNFTPrice.data);
        setNFTDetailStore((prev) => ({
          ...prev,
          priceToUSD: listNFTPrice.data,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }, [setNFTDetailStore]);

  useEffect(() => {
    getPriceToUsd();
  }, [getPriceToUsd]);

  return (
    <section className={cx('wrapper')}>
      <Modal
        isShow={isPreview}
        close={() => setIsPreview(false)}
        content={<Image src={NFT} alt={''} objectFit={'contain'} />}
      />

      <div className={cx('inner')}>
        <div className={cx('nft-info')}>
          <div className={cx('left-detail')}>
            <div className={cx('block-circle')}>
              <div className={cx('draw-circle')}></div>
            </div>
            <h2 className={`gdf-heading-7 ${cx('txt-sale')}`}>Sale</h2>
            <div className={cx('views')}>
              <Eye />
              <span>1234</span>
            </div>
            <div className={cx('image')}>
              <Image
                src={NFT}
                alt={''}
                objectFit={'contain'}
                objectPosition={'center'}
                onClick={() => setIsPreview(true)}
              />
            </div>
          </div>
          <div className={cx('right-detail')}>
            <div className={cx('group-name')}>
              <div className={cx('material')}>
                <div className={cx('left-material')}>
                  <Level01 />
                  <h2 className="gdf-heading-10">SLIVER</h2>
                </div>
                <Share />
              </div>
              <h1 className="gdf-heading-11">Mystery Boxes Round</h1>
              <h2 className={cx('owned-by')}>
                <span>Owned by </span>
                <span className={cx('address')}>
                  {dotsSensitive({
                    originalString: '0x0C4D42B9BCA84e6aA29bf94dA184b06F56C436b1',
                    startPosition: 6,
                    endPosition: '0x0C4D42B9BCA84e6aA29bf94dA184b06F56C436b1'.length - 4,
                  })}
                </span>
              </h2>
            </div>
            <div className={cx('properties')}>
              <Payment priceToUSD={priceToUSD} />
              <Overview />
            </div>
            <div className={cx('description')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor erat at id elit iaculis egestas vel. Diam
              proin lacus pulvinar sapien non volutpat nascetur. Ipsum ut euismod quis nunc. Nunc, tincidunt et a id
              mauris ultrices diam sapien.
            </div>
          </div>
        </div>

        <Activities label={'Activities'} />
      </div>
    </section>
  );
};

export default memo(NFTDetail);
