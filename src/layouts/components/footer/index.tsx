import Image from 'next/image';
import Link from 'next/link';
import LogoImg from 'assets/images/Logo.png';
import QRCode1 from 'assets/images/icons/qrcode-1.svg';
import QRCode2 from 'assets/images/icons/qrcode-2.svg';
import Facebook from 'assets/images/social-media/facebook.svg';
import Twitter from 'assets/images/social-media/twitter.svg';
import Telegram from 'assets/images/social-media/telegram.svg';
import Youtube from 'assets/images/social-media/youtube.svg';
import Instagram from 'assets/images/social-media/instagram.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className="gdf-flex-center">
          <h2 className={cx('logo')}>
            <Link href="/">
              <a>
                <Image src={LogoImg} />
                <span className="gdf-heading-7">GoDatingFi</span>
              </a>
            </Link>
          </h2>
          <div className={cx('qrcode')}>
            <div>
              <QRCode2 />
              <QRCode1 />
            </div>
            <p className="gdf-heading-1">Quét mã QR code để cài đặt ứng dụng</p>
          </div>
        </div>
        <div className="gdf-flex-center">
          <div className={cx('social-network')}>
            <Facebook />
            <Twitter />
            <Telegram />
            <Youtube />
            <Instagram />
          </div>
          <p className="gdf-heading-2">GoDatingFi©2021 by RadioCaca.COM</p>
          <div className={cx('w-empty')}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
