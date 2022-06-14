import classNames from 'classnames/bind';
import styles from './button-area.module.scss';
import Button from 'components/button';

const cx = classNames.bind(styles);

const ButtonArea = ({ signIn }: any) => {
  return (
    <Button className={cx('btn-connect-wallet')} onClick={signIn}>
      Connect wallet
    </Button>
  );
};

export default ButtonArea;
