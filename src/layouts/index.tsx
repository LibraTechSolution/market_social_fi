import { ReactNode } from 'react';
import HeadApp from './head';
import Header from './components/header';
import Footer from './components/footer';
import ScrollToTop from 'react-scroll-to-top';
import BackgroundBannerCard from 'assets/images/background-banner.svg';
import ScrollToTopSvg from 'assets/images/icons/scroll-top-top.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="gdf-wrapper">
      <HeadApp />
      <ScrollToTop className={cx('scroll-top-top')} component={<ScrollToTopSvg />} smooth />
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
