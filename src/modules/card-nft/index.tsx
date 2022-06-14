import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NFT01 from 'assets/images/nft/nft-01.png';
import Heart from 'assets/images/icons/heart.svg';
import Start from 'assets/images/icons/start.svg';
import Person from 'assets/images/icons/person.svg';
import Bitcoin from 'assets/images/icons/bitcoin.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

const CardNFT = () => {
  return (
    <article className={cx('nft-item')}>
      <Link href={'/'} passHref>
        <a>
          <div className={cx('heart-icon')}>
            <div className={cx('heart-block')}>
              <Heart />
            </div>
          </div>
          <div className={cx('nft-img')}>
            <Image alt="NFT-01" src={NFT01} className={cx('aaa')} />
          </div>
          <div className={cx('nft-info')}>
            <div className={cx('nft-total')}>
              <Start />
              <span>64</span>
            </div>
            <div className={cx('nft-total')}>
              <Person />
              <span>123</span>
            </div>
          </div>
          <header className={cx('nft-content')}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className={cx('nft-price')}>
              <p>$ 10.345</p>
              <p>
                <Bitcoin />
                6,300 DOR
              </p>
            </div>
          </header>
        </a>
      </Link>
    </article>
  );
};

export default CardNFT;
