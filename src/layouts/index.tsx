import { ReactNode, useState } from 'react';
import useWeb3 from 'hooks/useWeb3';
import Header from './components/header';
import Footer from './components/footer';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { ConnectWalletSteps, PersonalInfo } from 'utils/interfaces';
import BackgroundBannerCard from 'assets/images/background-banner.svg';

const cx = classNames.bind(styles);

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="gdf-wrapper">
      <Header />
      <main className={cx('wrapper')}>
        <div className={cx('inner')}>
          <BackgroundBannerCard />
          <section className={cx('content')}>{children}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
