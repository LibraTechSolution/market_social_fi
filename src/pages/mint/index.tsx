import React, { useState } from 'react';
import CardNFT from 'modules/card-nft';
import MintModule from 'modules/minting';
import NFT03 from 'assets/images/nft/nft-03.png';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Button from 'components/button';
import useLocalStorage from 'hooks/useLocalStorage';
import { PersonalInfo } from 'utils/interfaces';
const cx = classNames.bind(styles);

interface IWhitelistQuery {
  pattern: string;
  page: number;
  pageSize: number;
}

const MintPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [personalInfo] = useLocalStorage<PersonalInfo | null>('personal-info', null);

  const handleOpenModalMint = () => {
    setModalOpen(true);
  };

  return (
    <>
      <section className={cx('wrapper')}>
        <h1 className={cx('heading')}>NFT Launchpad</h1>
        <section className={cx('group-card-nft')}>
          <div className={cx('list-cart-nft')}>
            <CardNFT icon={NFT03} />
          </div>
          <Button className={cx('btn-mint')} disabled={!personalInfo} onClick={handleOpenModalMint}>
            Mint
          </Button>
        </section>
      </section>
      <MintModule isShowModal={modalOpen} closeModal={() => setModalOpen(false)} />
    </>
  );
};

export default MintPage;
