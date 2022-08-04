import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { NFTDetailListingItem, PersonalInfo, PriceToUSD } from 'utils/interfaces';
import { CURRENCY_NAME, NFT_DETAIL_STATUSES } from 'utils/constant';
import { priceToUSDConverter, roundingNumber } from 'utils/functions';
import ConnectWallet from 'modules/connect-wallet';
import Button from 'components/button';
import useLocalStorage from 'hooks/useLocalStorage';
import Matic from 'assets/images/crypto-currency/matic.svg';
import classNames from 'classnames/bind';
import styles from './payment.module.scss';
const cx = classNames.bind(styles);

const Payment = ({ priceToUSD }: { priceToUSD: PriceToUSD }) => {
  const [modalOpen, setModalOpen] = useState('');
  const [personalInfo] = useLocalStorage<PersonalInfo | null>('personal-info', null);

  const handleCloseModal = useCallback(() => {
    if (!personalInfo || modalOpen !== 'connect-wallet') {
      setModalOpen('');
      return;
    }
    if (modalOpen === 'connect-wallet') {
      setModalOpen('buy-now');
    }
  }, [modalOpen, personalInfo]);

  const renderPrice = useCallback(
    (price: number, unitPrice?: string) => {
      let originalPrice = 0;
      if (unitPrice) {
        originalPrice = priceToUSD?.[CURRENCY_NAME?.[unitPrice]]?.usd;
      }
      return priceToUSDConverter({
        nftPrice: 6300,
        originalPrice: 0.916451,
        toFixed: 2,
      });
    },
    [priceToUSD],
  );

  const renderOverview = useMemo(() => {
    return (
      <div className={cx('payment')}>
        <div className={cx('price-properties')}>
          <Matic />
          <span className="gdf-heading-7">{`${roundingNumber(String(6300), undefined, true, 5)} MATIC`}</span>
          <span className="gdf-heading-12">$ {renderPrice(6300, 'MATIC')}</span>
        </div>
        <span className={cx('description-fee')}>Includes 8.5% in fees</span>
        <Button className={cx('btn-buy-now')}>Buy now</Button>
      </div>
    );
  }, []);

  return (
    <>
      {renderOverview}
      {modalOpen === 'connect-wallet' && (
        <ConnectWallet startStep={'init'} isShowModal={modalOpen === 'connect-wallet'} closeModal={handleCloseModal} />
      )}
      {/*{modalOpen === 'buy-now' && <BuyNow isShowModal={modalOpen === 'buy-now'} closeModal={handleCloseModal} />}*/}
    </>
  );
};

export default memo(Payment);
