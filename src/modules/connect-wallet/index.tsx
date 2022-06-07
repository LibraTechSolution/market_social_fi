import { ConnectWalletSteps, PersonalInfo } from "utils/interfaces";
import { getMetamaskInfo, login, updateUser } from "api/user/index.api";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ERRORS } from "utils/constant";
import { SC } from "utils/smart-contract";
import useSessionStorage from "hooks/useSessionStorage";
import useWeb3 from "hooks/useWeb3";
import { navigateDisconnect } from "utils/router/navigate-disconnect.route";
import { useRouter } from "next/router";
import { isEmpty } from "utils/functions";
import AvtiveSquareSvg from "assets/images/icons/active-square.svg";

const removeWhiteSpaceRegxp = /\s+/g;

interface Props {
  startStep: ConnectWalletSteps;
  isShowModal: boolean;
  closeModal: () => void;
  connectSuccessCb?: (params?: any) => void;
  isChangeWallet?: boolean;
  isWalletConnectConnectedBefore?: boolean;
  setIsChangeWallet?: Dispatch<SetStateAction<boolean>>;
  setIsWalletConnectConnectedBefore?: Dispatch<SetStateAction<boolean>>;
}

interface IError {
  email: string[];
  username: string[];
}
const ConnectWallet = ({
  isShowModal,
  closeModal,
  connectSuccessCb,
  isChangeWallet = false,
  isWalletConnectConnectedBefore = false,
  setIsWalletConnectConnectedBefore = () => {},
  setIsChangeWallet = () => {},
}: Props) => {
  const web3 = useWeb3();
  const wrongNetworkStatus = useRef(false);
  const [step, setStep] = useState<ConnectWalletSteps>("init");
  const [isWalletConnect, setIsWalletConnect] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
  });

  const router = useRouter();
  const [errors, setErrors] = useState<IError>({ email: [], username: [] });

  const [personalInfo, setPersonalInfo] =
    useSessionStorage<PersonalInfo | null>("personal-info", null);

  useEffect(() => {
    if (isShowModal) {
      wrongNetworkStatus.current = false;
      setStep("init");
    }
  }, [isShowModal]);

  const validateUserInfo = useCallback(() => {
    const errors: any = {};
    const emailRegex = /^[\w-\._]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const usernameRegex = /^[\w-\._]+$/g;
    if (!emailRegex.test(userInfo.email) && userInfo.email.length > 0) {
      errors.email = errors.email ? errors.email.push(ERRORS.E1) : [ERRORS.E1];
    }

    if (
      !usernameRegex.test(userInfo.username) &&
      userInfo.username.length > 0
    ) {
      errors.username = errors.username
        ? errors.username.push(ERRORS.E12)
        : [ERRORS.E12];
    }

    if (userInfo.email.length > 256) {
      errors.email = errors.email
        ? [...errors.email, ERRORS.E3("Email", 256)]
        : [ERRORS.E3("Email", 256)];
    }

    if (userInfo.username.length > 256) {
      errors.username = errors.username
        ? [...errors.username, ERRORS.E3("Username", 256)]
        : [ERRORS.E3("Username", 256)];
    }

    return errors;
  }, [userInfo]);

  const handleUpdateProfile = useCallback(async () => {
    const validateErrors = validateUserInfo();
    if (!isEmpty(validateErrors)) {
      setErrors(validateErrors);
      return;
    }

    try {
      const form = new FormData();
      form.append("username", userInfo.username);
      form.append("email", userInfo.email);

      const response: any = await updateUser(form);
      const updatedInfo = {
        ...personalInfo,
        user: response.data.data,
      } as PersonalInfo;
      setPersonalInfo(updatedInfo);
    } catch (error: any) {
      console.log("Error Update", error);
      if (error.errors && error.errors.message) {
        if (error.errors.message.search("Email") > -1) {
          validateErrors.email = validateErrors.email
            ? [...validateErrors.email, ERRORS.E0("Email")]
            : [ERRORS.E0("Email")];
        }
        if (error.errors.message.search("Username") > -1) {
          validateErrors.username = validateErrors.username
            ? [...validateErrors.username, ERRORS.E0("Username")]
            : [ERRORS.E0("Username")];
        }
      }
    }
    isEmpty(validateErrors) ? closeModal() : setErrors(validateErrors);
  }, [
    closeModal,
    personalInfo,
    setPersonalInfo,
    userInfo.email,
    userInfo.username,
    validateUserInfo,
  ]);

  const handleLogin = useCallback(
    async (address: string, signature: string) => {
      try {
        const userInfo = await login({ address, signature });
        return userInfo.data;
      } catch (error) {
        setStep("error-connecting");
        return null;
      }
    },
    [],
  );

  const handleShowMetaNotiToSign = useCallback(
    async (address: string, nonce: string) => {
      try {
        const signature = await web3.signIn({
          address,
          nonce,
          errorCb: (error: Error) => {
            if (error) {
              setStep("error-connecting");
            }
          },
        });
        return signature;
      } catch (_) {
        setStep("error-connecting");
        return "";
      }
    },
    [web3],
  );

  const handleConnect = useCallback(async () => {
    const address = await web3.getAddress();
    try {
      const metamaskInfo = await getMetamaskInfo(address);
      const signature = await handleShowMetaNotiToSign(
        address,
        metamaskInfo.data.data.nonce,
      );
      if (!signature) {
        return;
      }

      const personalInfo = await handleLogin(address, signature);
      if (!personalInfo) {
        return;
      }

      setPersonalInfo(personalInfo.data);

      if (metamaskInfo.data.data.isNew) {
        setUserInfo({ email: "", username: "" });
        setStep("update-profile");
      } else {
        closeModal();
      }
      setIsWalletConnectConnectedBefore(false);
      web3.setChangeWalletRef("empty");
      connectSuccessCb?.();
      if (isChangeWallet && web3.isWalletConnected) {
        await web3.disconnectWalletConnect();
        router.reload();
      }
    } catch (error) {
      setStep("error-connecting");
    }
  }, [
    closeModal,
    connectSuccessCb,
    handleLogin,
    handleShowMetaNotiToSign,
    setPersonalInfo,
    web3,
    setIsWalletConnectConnectedBefore,
    isChangeWallet,
    router,
  ]);

  const handleConnectWallet = useCallback(async () => {
    setIsWalletConnect(false);
    if (!web3.isMetamaskInstalled) {
      setStep("metamask-not-found");
      return;
    }
    setStep("connecting-to-metamask");

    try {
      await web3.createWeb3Instance();
    } catch (error: any) {
      setStep("error-connecting");
    }
    try {

      await web3.addEthereumChain('BNB');
      const chainID = await web3.getNetworkChainID();
      if (
        web3.isHex(chainID)
          ? chainID !== SC["BNB"].chainId
          : web3.toHex(chainID) !== SC["BNB"].chainId
      ) {
        setStep("wrong-network");
        wrongNetworkStatus.current = true;
      } else {
        handleConnect();
        wrongNetworkStatus.current = false;
      }
    } catch (error) {
      setStep("error-connecting");
    }
  }, [handleConnect, web3]);

  useEffect(() => {
    web3.listenWalletConnectSessionReject(
      async (error: any, payload: any, _isClearData: boolean) => {
        if (
          web3.isWalletConnecting &&
          !wrongNetworkStatus.current &&
          !isWalletConnectConnectedBefore
        ) {
          setStep("error-connecting");
        }
        if (web3.isWalletConnecting && wrongNetworkStatus.current) {
          setStep("wrong-network");
        }
        if (web3.isWalletConnected) {
          //signout button
          if (_isClearData && window.location.pathname === router.asPath) {
            setPersonalInfo(null);
            navigateDisconnect(router);
          }
          setIsChangeWallet(false);
          setIsWalletConnectConnectedBefore(false);
        }
      },
    );
  }, [
    web3,
    setPersonalInfo,
    router,
    setIsChangeWallet,
    setIsWalletConnectConnectedBefore,
    isChangeWallet,
    isWalletConnectConnectedBefore,
  ]);

  const handleConnectWalletConnect = useCallback(async () => {
    try {
      setStep("connecting-to-metamask");
      const accounts = await web3.walletConnect();
      const metamaskInfo = await getMetamaskInfo(accounts[0].toLowerCase());
      const signature = await web3.signWalletConnect(
        metamaskInfo.data.data.nonce,
        accounts[0],
        (error: any) => {
          if (error) {
            setStep("error-connecting");
          }
        },
      );

      if (web3.getWalletConnectChainId() !== SC["BNB"].chainIdNumber) {
        wrongNetworkStatus.current = true;
        setStep("wrong-network");
        await web3.disconnectWalletConnect();
        return;
      }

      const personalInfo = await handleLogin(
        accounts[0].toLowerCase(),
        signature,
      );
      if (!personalInfo) {
        return;
      }

      setPersonalInfo(personalInfo.data);

      if (metamaskInfo.data.data.isNew) {
        setUserInfo({ email: "", username: "" });
        setStep("update-profile");
      } else {
        closeModal();
      }
      setIsChangeWallet(false);
      setIsWalletConnectConnectedBefore(true);
      web3.setChangeWalletRef("empty");
      connectSuccessCb?.();
      if (isChangeWallet && !web3.isWalletConnected) {
        await web3.disconnect();
        router.reload();
      }
    } catch (error: any) {
      console.error(error, "error");
      setStep("error-connecting");
    }
  }, [
    web3,
    handleLogin,
    closeModal,
    connectSuccessCb,
    setPersonalInfo,
    setIsChangeWallet,
    setIsWalletConnectConnectedBefore,
    isChangeWallet,
    router,
  ]);

  const handleClickWalletConnect = useCallback(async () => {
    setIsWalletConnect(true);
    try {
      await handleConnectWalletConnect();
    } catch (error) {
      setStep("error-connecting");
    }
  }, [handleConnectWalletConnect]);

  const handleSwitchNetwork = useCallback(async () => {
    if (!isWalletConnect) {
      await web3.switchNetwork("BNB");
      setStep("connecting-to-metamask");
      // handleConnect();
    } else {
      closeModal();
    }
  }, [web3, isWalletConnect, closeModal]);

  useEffect(() => {
    web3.listenNetworkChange((chainID: any) => {
      if (wrongNetworkStatus.current && chainID === SC["BNB"].chainId) {
        setStep("connecting-to-metamask");
        handleConnect();
      }
      wrongNetworkStatus.current = false;
    });
  }, [handleConnect, web3]);

  return (
    <></>
  );
};

export default ConnectWallet;
