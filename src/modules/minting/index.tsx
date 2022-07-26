import React, { useCallback, useMemo, useState } from 'react';
import useMarket from 'hooks/useMarket';
import Input from 'components/input';
import Button from 'components/button';
import Modal from 'components/modal';
import { toWei } from 'web3-utils';
import { getMarketplaceProof } from 'api/mint';
import { SC, MinScContract } from 'utils/smart-contract';
import { formatThousand } from 'utils/functions';
import useSessionStorage from 'hooks/useSessionStorage';
import PencilIcon from 'assets/images/icons/pencil.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { PersonalInfo } from 'utils/interfaces';
const cx = classNames.bind(styles);
import { ProcessMintNftProps, initProcess } from 'utils/constant';
import { ethers } from 'ethers';

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
}

const MintModule = ({ isShowModal, closeModal }: Props) => {
  const marketHook = useMarket();
  const [quantity, setQuantity] = useState<number | string>('');
  const [touched, setTouched] = useState(0);
  const [personalInfo] = useSessionStorage<PersonalInfo | null>('personal-info', null);
  const [process, setProcess] = useState<ProcessMintNftProps>(initProcess);

  const handleFocus = useCallback(() => {
    if (!touched) {
      setTouched(1);
    }
  }, [touched]);

  const handleKeyPress = useCallback((e: any) => {
    if (isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }, []);

  const handleChangeQuantity = useCallback((e: any) => setQuantity(e.target.value.replace(/,/g, '')), []);

  const handleMint = useCallback(
    (hookFunction: typeof marketHook) => {
      if (personalInfo) {
        const marketMint = hookFunction.createMarket({
          contractAddress: MinScContract.ERC721.address,
          contractAbi: MinScContract.ERC721.abi,
        });
        const address = personalInfo?.walletAddress;
        setProcess((pre) => ({ ...pre, isLoadingMint: true }));
        const payablePrice = toWei((0.5 * Number(quantity)).toFixed(9).toString(), 'ether');
        //const payablePrice = (Number(ethers.utils.parseEther('0.5')) * Number(quantity)).toString();
        getMarketplaceProof(address).then(async (res) => {
          const markleProof = res?.data?.data?.proof;
          await marketHook
            .mint({
              market: marketMint,
              markleProof,
              mintAmount: quantity,
              targetPrice: payablePrice,
            })
            .then((res) => {
              setProcess((pre) => ({ ...pre, isLoadingMint: false }));
            });
        });
      }
    },
    [quantity],
  );

  const content = useMemo(() => {
    return (
      <div className={cx('wrapper')}>
        <div className="gdf-title">Mint</div>
        <div className="gdf-desc">
          <Input
            value={formatThousand(quantity.toString())}
            onKeyPress={handleKeyPress}
            onBlur={handleFocus}
            onChange={handleChangeQuantity}
            preIcon={<PencilIcon />}
            placeholder="Quantity mint"
            className={cx('quantity')}
          />
        </div>
        <div className={cx('group-action')}>
          <Button className={cx('btn-cancel')} onClick={closeModal}>
            Cancel
          </Button>
          <Button className={cx('btn-proceed')} disabled={!quantity} onClick={() => handleMint(marketHook)}>
            Mint
          </Button>
        </div>
      </div>
    );
  }, [closeModal, handleChangeQuantity, quantity]);

  return (
    <Modal
      isShow={isShowModal}
      close={closeModal}
      content={content}
      preventClickOutside={true}
      className={cx('module-connect')}
    />
  );
};

export default MintModule;
