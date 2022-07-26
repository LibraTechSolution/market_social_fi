import { ChangeEventHandler, InputHTMLAttributes, ReactNode, useCallback, useEffect } from 'react';
import cx from 'classnames';
import Styled from './index.style';

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
  ...props
}: Props) => {
  return (
    <Styled.Input className={cx(className)}>
      <Styled.PreIcon className="pre-icon">{preIcon}</Styled.PreIcon>
      {label && (
        <Styled.Label className={cx('label', { 'custom-label': !subLabel })}>
          {label} {required && <Styled.Start>*</Styled.Start>}
        </Styled.Label>
      )}
      {subLabel && <Styled.SubLabel className="sub-label">{subLabel}</Styled.SubLabel>}
      <Styled.RelativeWrapper>
        <Styled.TextBox
          {...props}
          maxLength={maxLength}
          type={type}
          placeholder={placeholder}
          value={value}
          hasPreIcon={!!preIcon}
          hasPostIcon={!!postIcon}
          disabled={disabled}
          onChange={onChange}
          className="input"
        />
        <Styled.PostIcon className="post-icon">{postIcon}</Styled.PostIcon>
      </Styled.RelativeWrapper>
    </Styled.Input>
  );
};

export default Input;
