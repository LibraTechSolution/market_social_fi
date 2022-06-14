import { cloneElement, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

type Props = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

const ActiveLink = ({ children, activeClassName, ...rest }: Props) => {
  const { asPath } = useRouter();
  const childClassName = children.props.className ?? '';
  const newClassName = `${childClassName} ${activeClassName ?? ''}`;
  const className = asPath === rest.href ? newClassName.trim() : '';

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
