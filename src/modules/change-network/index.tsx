import { useCallback, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import Styled from './index.style';
import useWeb3 from 'hooks/useWeb3';
import { SC } from 'utils/smart-contract';
import FailSvg from 'assets/images/icons/fail.svg';

interface Props {
  isChangeNetwork?: boolean;
  setIsChangeNetwork?: Dispatch<SetStateAction<boolean>>;
}

const ChangeNetwork = ({ isChangeNetwork = false, setIsChangeNetwork = () => {} }: Props) => {
  const web3 = useWeb3();

  const handleSwitchNetwork = useCallback(async () => {
    await web3.switchNetwork('MATIC');
    setIsChangeNetwork(false);
  }, [web3]);

  const content = useMemo(() => {
    return (
      <Styled.ModalContentWrap>
        <Styled.ErrorIcon>
          <FailSvg width={64} height={64} />
        </Styled.ErrorIcon>
        <div className="title">Wrong Network</div>
        <div className="desc network">Please change network on your wallet to</div>
        <div className="network-name" onClick={handleSwitchNetwork}>
          {SC['MATIC'].chainName}
        </div>
      </Styled.ModalContentWrap>
    );
  }, [handleSwitchNetwork]);

  const handleChainChange = useCallback(async () => {
    const chainID = await web3.getNetworkChainID();
    if (!web3.isWalletConnected) {
      chainID && setIsChangeNetwork(chainID !== SC['MATIC'].chainId);

      web3.listenNetworkChange((chainID: any) => {
        chainID && setIsChangeNetwork(chainID !== SC['MATIC'].chainId);
      });
    }
  }, [web3]);

  useEffect(() => {
    web3.listenWalletConnectNetworkChange((chainId: number) => {
      chainId && setIsChangeNetwork(chainId !== SC['MATIC'].chainIdNumber);
    });
  }, [web3]);

  useEffect(() => {
    handleChainChange();
  }, [handleChainChange]);

  return (
    <Styled.ChangeNetworkModal
      isShow={isChangeNetwork}
      close={() => setIsChangeNetwork(false)}
      content={content}
      showCloseBtn={true}
      preventClickOutside={true}
    />
  );
};

export default ChangeNetwork;
