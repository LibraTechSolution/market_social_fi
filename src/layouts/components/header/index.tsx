import { useCallback, useEffect, useRef, useState } from 'react';
import { getMetamaskInfo } from 'api/user/index.api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LogoImg from 'assets/images/Logo.png';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { ConnectWalletSteps, PersonalInfo } from 'utils/interfaces';
import { navigateDisconnect } from 'utils/router/navigate-disconnect.route';
import useWeb3 from 'hooks/useWeb3';
import useClickOutside from 'hooks/useClickOutside';
import useSessionStorage from 'hooks/useSessionStorage';
import ConnectWallet from 'modules/connect-wallet';
import DisconnectWallet from 'modules/disconnect-wallet';
import Menu from './Menu';
import UserAvatar from './Menu/user-avatar';

const cx = classNames.bind(styles);

const Navbar = () => {
  const router = useRouter();
  const { reload } = router;
  const [isChangeWallet, setIsChangeWallet] = useState<boolean>(false);
  const [showDisconnectWalletModal, setShowDisconnectWalletModal] = useState<boolean>(false);
  const [isWalletConnectConnectedBefore, setIsWalletConnectConnectedBefore] = useState<boolean>(false);
  const [connectWalletStep, setConnectWalletStep] = useState<ConnectWalletSteps>('init');
  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>('');
  const [personalInfo, setPersonalInfo] = useSessionStorage<PersonalInfo | null>('personal-info', null);
  const [open, setOpen] = useState<boolean>(false);
  const countRef = useRef<number>(0);
  const ref = useRef<any>();
  const web3 = useWeb3();

  const fetchBalance = useCallback(async () => {
    let balance: string = await web3.getBalance(personalInfo?.walletAddress || '');
    setBalance(balance);
  }, [personalInfo?.walletAddress, web3]);

  const handleShowMetaNotiToSign = useCallback(
    async (address: string, nonce: string) => {
      try {
        const signature = await web3.signIn({
          address,
          nonce,
          errorCb: (error: Error) => {
            if (error) {
              countRef.current = 0;
              setConnectWalletStep('error-connecting');
            }
          },
        });
        return signature;
      } catch (_) {
        countRef.current = 0;
        setConnectWalletStep('error-connecting');
        return '';
      }
    },
    [web3],
  );

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    web3.listenWalletConnectAccountChange(async (accounts: string[]) => {
      if (
        accounts[0]?.toLowerCase() !== personalInfo?.walletAddress.toLowerCase() &&
        personalInfo?.walletAddress &&
        countRef.current === 0
      ) {
        countRef.current += 1;
        try {
          const metamaskInfo = await getMetamaskInfo(accounts[0].toLowerCase());
          const nonce = metamaskInfo?.data?.data;
          const signature = await web3.signWalletConnect(nonce, accounts[0].toLowerCase(), (error: any) => {
            console.log(error);
          });
          if (!signature) {
            return;
          }

          countRef.current = 0;
          reload();
        } catch (error) {
          countRef.current = 0;
          console.log(error, 'error');
        }
      }
    });
  }, [web3, personalInfo, reload, setPersonalInfo]);

  useEffect(() => {
    web3.listenAccountChange(async (accounts: string[]) => {
      if (
        ((accounts && accounts.length === 0) || !accounts) &&
        window.location.pathname === router.asPath &&
        personalInfo?.walletAddress
      ) {
        setPersonalInfo(null);
        navigateDisconnect(router);
        return;
      }
      if (
        accounts[0]?.toLowerCase() !== personalInfo?.walletAddress.toLowerCase() &&
        personalInfo?.walletAddress &&
        countRef.current === 0
      ) {
        countRef.current += 1;
        try {
          const metamaskInfo = await getMetamaskInfo(accounts[0]);
          // if (metamaskInfo.data.data.isNew && !web3.isWalletConnected) {
          //   countRef.current = 0;
          //   setPersonalInfo(null);
          //   setShowConnectWalletModal(true);
          // } else {
          //   if (
          //     (metamaskInfo.data.data.hasOwnProperty('isNew') && !metamaskInfo.data.data.isNew) ||
          //     'isNew' in metamaskInfo.data.data === false
          //   ) {
          //     await web3.disconnect();
          //     await web3.createWeb3Instance();
          //     const signature = await handleShowMetaNotiToSign(accounts[0], metamaskInfo.data.data.nonce);
          //     if (!signature) {
          //       return;
          //     }
          //     countRef.current = 0;
          //     reload();
          //   }
          // }
        } catch (error) {
          countRef.current = 0;
          console.log(error, 'error');
        }
      }
    });
  }, [setPersonalInfo, web3, reload, router]);

  useClickOutside(ref, () => setOpen(false));

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h2 className={cx('logo')}>
          <Link href="/">
            <a>
              <Image src={LogoImg} />
              <span className="gdf-heading-7">GoDatingFi</span>
            </a>
          </Link>
        </h2>

        <div className={cx('menu')}>
          <Menu />
          <UserAvatar
            balance={balance}
            setConnectWalletStep={setConnectWalletStep}
            setShowConnectWalletModal={setShowConnectWalletModal}
            setShowDisconnectWalletModal={setShowDisconnectWalletModal}
            setIsChangeWallet={setIsChangeWallet}
            setIsWalletConnectConnectedBefore={setIsWalletConnectConnectedBefore}
          />
          <ConnectWallet
            startStep={connectWalletStep}
            isShowModal={showConnectWalletModal}
            closeModal={() => setShowConnectWalletModal(false)}
            isChangeWallet={isChangeWallet}
            isWalletConnectConnectedBefore={isWalletConnectConnectedBefore}
            setIsChangeWallet={setIsChangeWallet}
            setIsWalletConnectConnectedBefore={setIsWalletConnectConnectedBefore}
          />
          <DisconnectWallet
            isShowModal={showDisconnectWalletModal}
            closeModal={() => setShowDisconnectWalletModal(false)}
            setIsChangeWallet={setIsChangeWallet}
            setIsWalletConnectConnectedBefore={setIsWalletConnectConnectedBefore}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
