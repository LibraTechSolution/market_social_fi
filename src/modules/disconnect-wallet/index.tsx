import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { logout } from 'api/user/index.api';
import { PersonalInfo } from 'utils/interfaces';
import useLocalStorage from 'hooks/useLocalStorage';
import { useRouter } from 'next/router';
import useWeb3 from 'hooks/useWeb3';
import Modal from 'components/modal';
import Button from 'components/button';
import { navigateDisconnect } from 'utils/router/navigate-disconnect.route';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  setIsChangeWallet: Dispatch<SetStateAction<boolean>>;
  setIsWalletConnectConnectedBefore: Dispatch<SetStateAction<boolean>>;
}

const DisconnectWallet = ({ isShowModal, closeModal, setIsChangeWallet, setIsWalletConnectConnectedBefore }: Props) => {
  const [personalInfo, setPersonalInfo] = useLocalStorage<PersonalInfo | null>('personal-info', null);
  const web3 = useWeb3();
  const router = useRouter();

  const handleDisconnect = useCallback(async () => {
    try {
      setPersonalInfo(null);
      setIsChangeWallet(false);
      setIsWalletConnectConnectedBefore(false);
      web3.isWalletConnected ? await web3.disconnectWalletConnect(true) : await web3.disconnect();
      closeModal?.();
      if (!web3.isWalletConnected) {
        navigateDisconnect(router);
      }
    } catch (error) {
      console.error(error);
    }
  }, [closeModal, setPersonalInfo, web3, router, setIsChangeWallet, setIsWalletConnectConnectedBefore]);

  const content = useMemo(() => {
    return (
      <div className={cx('wrapper')}>
        <div className="gdf-title">Sign out</div>
        <div className="gdf-desc">Are you sure you want to sign out?</div>
        <div className={cx('group-action')}>
          <Button className={cx('btn-cancel')} onClick={closeModal}>
            Cancel
          </Button>
          <Button className={cx('btn-proceed')} onClick={handleDisconnect}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }, [closeModal, handleDisconnect]);

  return <Modal isShow={isShowModal} close={closeModal} content={content} />;
};

export default DisconnectWallet;
