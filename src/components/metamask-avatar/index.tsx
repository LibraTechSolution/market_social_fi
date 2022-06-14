import { useEffect, useRef } from 'react';
import jazzicon from '@metamask/jazzicon';

const MetamaskAvatar = ({ className, address, size = 50 }: { address: string; size?: number; className?: any }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = avatarRef.current;
    if (element && address) {
      const addr = address.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon: HTMLDivElement = jazzicon(size, seed);
      icon.className = 'jazzicon';
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
      return () => {
        element?.removeChild(icon);
      };
    }
  }, [address, avatarRef, size]);

  return <div className={className} ref={avatarRef} />;
};

export default MetamaskAvatar;
