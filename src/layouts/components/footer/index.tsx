import Image from 'next/image';
import Link from 'next/link';
import LogoImg from 'assets/images/Logo.png';
import QRCode1 from 'assets/images/icons/qrcode-1.svg';
import QRCode2 from 'assets/images/icons/qrcode-2.svg';
import Medium from 'assets/images/social-media/medium.svg';
import Twitter from 'assets/images/social-media/twitter.svg';
import Telegram from 'assets/images/social-media/telegram.svg';
import Github from 'assets/images/social-media/github.svg';
import Discord from 'assets/images/social-media/discord.svg';
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
            <a href="https://medium.com/@godatingfi" target="_blank">
              <Medium />
            </a>
            <a href="https://twitter.com/GoDatingFi" target="_blank">
              <Twitter />
            </a>
            <a href="https://t.me/+fNtO9-m-YewyZTVl" target="_blank">
              <Telegram />
            </a>
            <a href="https://github.com/GoDatingFi" target="_blank">
              <Github />
            </a>
            <a href="https://discord.gg/tDtEZtwT" target="_blank">
              <Discord />
            </a>
          </div>
          <p className="gdf-heading-2">GoDatingFi©2022 by GoDatingFi.com</p>
          <div className={cx('w-empty')}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
