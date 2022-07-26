import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWeb3 from 'hooks/useWeb3';
import useClickOutside from 'hooks/useClickOutside';
import useLocalStorage from 'hooks/useLocalStorage';
import { dotsSensitive } from 'utils/functions';
import { CURRENCY_UNIT_NAME } from 'utils/constant';
import { PersonalInfo } from 'utils/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import MetamaskAvatar from 'components/metamask-avatar';
import Button from 'components/button';
import ButtonArea from './button-area';
import classNames from 'classnames/bind';
import styles from './user-avatar.module.scss';
import BinanceSVG from 'assets/images/icons/binance.svg';
import UserProfileSvg from 'assets/images/icons/userMyProfile.svg';
import SignOutSvg from 'assets/images/icons/signOutSvg.svg';
const cx = classNames.bind(styles);

const UserAvatar = ({
  setConnectWalletStep,
  balance,
  setShowDisconnectWalletModal,
  setShowConnectWalletModal,
  setIsChangeWallet,
  setIsWalletConnectConnectedBefore,
}: {
  setConnectWalletStep: any;
  balance: string;
  setShowDisconnectWalletModal: Dispatch<SetStateAction<boolean>>;
  setShowConnectWalletModal: Dispatch<SetStateAction<boolean>>;
  setIsChangeWallet: Dispatch<SetStateAction<boolean>>;
  setIsWalletConnectConnectedBefore: Dispatch<SetStateAction<boolean>>;
}) => {
  const web3 = useWeb3();
  const [open, setOpen] = useState<boolean>(false);

  const [personalInfo, setPersonalInfo] = useLocalStorage<PersonalInfo | null>('personal-info', null);
  const handleChangeWallet = useCallback(async () => {
    setIsChangeWallet(true);
    setIsWalletConnectConnectedBefore(web3.isWalletConnected);
    web3.setChangeWalletRef(web3.isWalletConnected ? 'toMetamask' : 'toWalletConnect');
    setOpen(false);
    setShowConnectWalletModal(true);
  }, [web3, setShowConnectWalletModal, setIsWalletConnectConnectedBefore, setIsChangeWallet]);

  const ref = useRef<any>();

  useEffect(() => {
    const callback = async (event: any) => {
      if (!personalInfo && web3.isWalletConnected) {
        await web3.disconnectWalletConnect();
      }
    };
    window.addEventListener('load', callback);
    return () => window.removeEventListener('load', callback);
  }, [web3, personalInfo]);

  const displayUsername = useMemo(() => {
    return personalInfo?.username
      ? personalInfo?.username.length >= 20
        ? dotsSensitive({
            originalString: personalInfo?.username,
            startPosition: 9,
            endPosition: personalInfo?.username.length - 4,
          })
        : personalInfo?.username
      : 'Unnamed';
  }, [personalInfo]);

  useClickOutside(ref, () => setOpen(false));

  if (personalInfo) {
    const address = personalInfo?.walletAddress;
    return (
      <div ref={ref} className={cx('menu-item-dropdown')}>
        <div onClick={() => setOpen(!open)}>
          {personalInfo?.avatar ? (
            <Image src={personalInfo?.avatar} width={40} height={40} alt="" className={cx('avatar-aws')} />
          ) : (
            <MetamaskAvatar className={cx('avatar-aws')} address={personalInfo?.walletAddress} size={40} />
          )}
        </div>
        <div className={cx('menu-item-dropdown-content', { 'abs-block': open })}>
          <div className={cx('header')}>
            <div className={cx('user-info')}>
              <h2 className={cx('user-name')}>{displayUsername}</h2>
              <span className={cx('user-address')}>
                {address &&
                  dotsSensitive({
                    originalString: address,
                    startPosition: 6,
                    endPosition: address.length - 4,
                  })}
              </span>
            </div>
            <Button className={cx('button-change')} onClick={handleChangeWallet}>
              Change
            </Button>
          </div>
          <div className={cx('content')}>
            <div className={cx('balance')}>
              <div className={cx('title')}>Balance</div>
              <div className={cx('number-binance')}>
                <BinanceSVG />
                <span>
                  {balance || 0} {CURRENCY_UNIT_NAME.MATIC}
                </span>
              </div>
            </div>
            <div className={cx('group-action')}>
              <Link href={'/dashboard/profile'} passHref>
                <a className={cx('action')} onClick={() => setOpen(false)}>
                  <UserProfileSvg width={24} />
                  <span>My Profile</span>
                </a>
              </Link>
              <div
                className={cx('action')}
                onClick={() => {
                  setShowDisconnectWalletModal(true);
                  setOpen(false);
                }}
              >
                <SignOutSvg width={24} />
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ButtonArea signIn={() => setShowConnectWalletModal(true)} />;
};

export default UserAvatar;
