import { ButtonHTMLAttributes, ReactNode, MouseEventHandler } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  primary?: boolean;
  outline?: boolean;
  text?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  children?: ReactNode;
  className?: any;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
