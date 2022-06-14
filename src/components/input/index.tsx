import { ChangeEventHandler, InputHTMLAttributes, ReactNode, useCallback, useEffect } from 'react';
import { resolveSrv } from 'dns';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  maxLength?: number;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  setValue?: (value: any) => void;
}

const Input = ({
  label = '',
  subLabel = '',
  maxLength = 3000,
  value,
  className = '',
  preIcon = null,
  postIcon = null,
  disabled = false,
  placeholder = '',
  type = 'text',
  required = false,
  onChange,
  setValue,
  ...props
}: Props) => {
  useEffect(() => {
    setValue?.(value);
  }, [onChange]);

  return (
    <div className={cx(className, 'wrapper')}>
      <span className={cx('pre-icon')}>{preIcon}</span>
      {label && (
        <div className={cx('label', { 'custom-label': !subLabel })}>
          {label}
          {required && <span className={cx('required')}>*</span>}
        </div>
      )}
      {subLabel && <div className={cx('sub-label')}>{subLabel}</div>}
      <div className={cx('relative-wrapper')}>
        <input
          {...props}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cx('input', { disabled: disabled, hasPreIcon: !!preIcon, hasPostIcon: !!postIcon })}
        />
        <span className={cx('post-icon')}>{postIcon}</span>
      </div>
    </div>
  );
};

export default Input;
