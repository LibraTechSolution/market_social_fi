import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import Styled from "./index.style";
import { logout } from "api/user/index.api";
import { PersonalInfo } from "utils/interfaces";
import useSessionStorage from "hooks/useSessionStorage";
import { useRouter } from "next/router";
import useWeb3 from "hooks/useWeb3";
import { navigateDisconnect } from "utils/router/navigate-disconnect.route";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  setIsChangeWallet: Dispatch<SetStateAction<boolean>>;
  setIsWalletConnectConnectedBefore: Dispatch<SetStateAction<boolean>>;
}

const DisconnectWallet = ({
  isShowModal,
  closeModal,
  setIsChangeWallet,
  setIsWalletConnectConnectedBefore,
}: Props) => {
  const [personalInfo, setPersonalInfo] =
    useSessionStorage<PersonalInfo | null>("personal-info", null);
  const web3 = useWeb3();
  const router = useRouter();

  const handleDisconnect = useCallback(async () => {
    try {
      // await logout({ refreshToken: personalInfo?.tokens.refresh.token || "" });
      setPersonalInfo(null);
      setIsChangeWallet(false);
      setIsWalletConnectConnectedBefore(false);
      web3.isWalletConnected
        ? await web3.disconnectWalletConnect(true)
        : await web3.disconnect();
      closeModal?.();
      if (!web3.isWalletConnected) {
        navigateDisconnect(router);
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    closeModal,
    setPersonalInfo,
    web3,
    router,
    setIsChangeWallet,
    setIsWalletConnectConnectedBefore,
  ]);

  return (
   <></>
  );
};

export default DisconnectWallet;
