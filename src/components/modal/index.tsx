import React, { useRef, ReactNode, useCallback } from 'react';
import useClickOutside from 'hooks/useClickOutside';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import CloseSvg from 'assets/images/icons/close.svg';
const cx = classNames.bind(styles);

export interface Props {
  className?: string;
  isShow: boolean;
  showCloseBtn?: boolean;
  preventClickOutside?: boolean;
  close: (params?: any) => void;
  content?: ReactNode | string | null;
  nftId?: string;
}

const Modal = ({
  className,
  isShow,
  close,
  showCloseBtn = true,
  preventClickOutside = false,
  content,
  nftId,
}: Props) => {
  const ref = useRef(null);

  const handleClickOutside = useCallback(() => {
    !preventClickOutside && close();
  }, [close, preventClickOutside]);

  // TODO: useLocked hook but still have problem with padding style
  // useLockedBody(isShow);
  useClickOutside(ref, handleClickOutside);

  const clickClose = () => {
    if (showCloseBtn) {
      return <CloseSvg className={cx('close-modal')} onClick={close} />;
    }
  };

  return (
    <div className={cx(className, 'wrapper', { show: isShow })} id="modal">
      <div className={cx('inner')} ref={ref}>
        {clickClose()}
        {content}
      </div>
    </div>
  );
};

export default Modal;
