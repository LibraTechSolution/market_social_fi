import { Props } from './index.utils';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Button = ({
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  medium = false,
  large = false,
  children,
  className,
  leftIcon = null,
  rightIcon = null,
  onClick,
  ...passProps
}: Props) => {
  let Comp: any = 'button';
  const props: any = {
    onClick,
    ...passProps,
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', 'gdf-heading-3', {
    [className]: className,
    primary,
    outline,
    text,
    disabled,
    rounded,
    small,
    large,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={`${cx('icon')} leftIcon`}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={`${cx('icon')} rightIcon`}>{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
