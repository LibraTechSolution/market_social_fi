import React, { ReactElement, useState } from 'react';
import Layout from 'layouts';
import Search from 'components/search';
import SelectBox from 'components/dropdown/select';
import Pagination from 'components/pagination';
import CardNFT from 'modules/card-nft';
import NFT01 from 'assets/images/nft/nft-01.png';
import NFT02 from 'assets/images/nft/nft-02.png';
import NFT03 from 'assets/images/nft/nft-03.png';
import NFT04 from 'assets/images/nft/nft-04.png';
import NFT05 from 'assets/images/nft/nft-05.png';
import PerspectiveMatte from 'assets/images/icons/perspective_matte.svg';
import ConfettiPerspectiveMatte from 'assets/images/icons/confetti_perspective_matte.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

interface IWhitelistQuery {
  pattern: string;
  page: number;
  pageSize: number;
}

const Card = () => {
  const [select, setSelect] = useState('');
  const [query, setQuery] = useState<IWhitelistQuery>({ pattern: '', page: 1, pageSize: 10 });

  const recentlyListed = [
    { value: '', label: 'Recently listed' },
    { value: 'art', label: 'Art' },
    { value: 'photography', label: 'Photography' },
  ];

  const style = [
    { value: '', label: 'All stype' },
    { value: 'art', label: 'Art' },
    { value: 'photography', label: 'Photography' },
  ];

  return (
    <>
      <section className={cx('wrapper')}>
        <h1 className={cx('heading')}>Marketplace</h1>
        {/* Information Card NFT */}
        <article className={cx('card')}>
          <ConfettiPerspectiveMatte className={cx('confetti_perspective_matte')} />
          <div className={cx('block-circle')}>
            <div className={cx('draw-circle')}></div>
          </div>
          <PerspectiveMatte className={cx('perspective_matte')} />
          <header className={cx('card-info')}>
            <div className={cx('card-item')}>
              <p>Total Amount</p>
              <h2 className="gdf-heading-6">710,316,001,525</h2>
            </div>
            <div className={cx('card-item')}>
              <p>Amount (24h)</p>
              <h2 className="gdf-heading-6">171,754,192</h2>
            </div>
            <div className={cx('card-item')}>
              <p>Transactions (24h)</p>
              <h2 className="gdf-heading-6">525</h2>
            </div>
            <div className={cx('card-item')}>
              <p>Total Transaction</p>
              <h2 className="gdf-heading-6">2,532,617</h2>
            </div>
          </header>
        </article>
      </section>
      <section className={cx('group-card-nft')}>
        <div className={cx('filter')}>
          <Search />
          <div className={cx('sort')}>
            <SelectBox options={recentlyListed} currentValue={select} />
            <SelectBox options={style} currentValue={select} />
          </div>
        </div>
        <div className={cx('list-cart-nft')}>
          <CardNFT icon={NFT01} />
          <CardNFT icon={NFT02} />
          <CardNFT icon={NFT03} />
          <CardNFT icon={NFT04} />
          <CardNFT icon={NFT05} />
        </div>
        <Pagination page={1} totalPage={10} click={(page) => setQuery({ ...query, page })} />
      </section>
    </>
  );
};

Card.getLayout = function getLayout(page: ReactElement) {
  return <Layout isBackgroundContent={true}>{page}</Layout>;
};

export default Card;
