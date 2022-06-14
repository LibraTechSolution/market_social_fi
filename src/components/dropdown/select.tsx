import HeadlessTippy from '@tippyjs/react/headless';
import { useCallback, useMemo, useRef, useState } from 'react';
import { SelectProps } from './index.utils';
import useClickOutside from 'hooks/useClickOutside';
import classNames from 'classnames/bind';
import styles from './select.module.scss';
const cx = classNames.bind(styles);

const Dropdown = ({
  options,
  onChange,
  currentValue,
  className,
  placeholder = '',
  label = '',
  subLabel = '',
  required = false,
  ...props
}: SelectProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useRef(null);

  const renderSelected = useMemo(() => {
    const selected = options?.find((i) => i.value === currentValue)?.label;
    return selected ?? placeholder;
  }, [currentValue, options, placeholder]);

  const closeSelectMenu = useCallback(() => {
    setIsActive(false);
  }, []);

  useClickOutside(ref, closeSelectMenu);

  return (
    <HeadlessTippy>
      <div className={cx('wrapper', className)} ref={ref} {...props}>
        {label && <div className={cx('label', { 'custom-label': !subLabel })}>{label}</div>}
        {subLabel && <div className={cx('sub-label')}></div>}
        <div className={cx('select-box', { 'select-toggle': isActive })} onClick={() => setIsActive(!isActive)}>
          <div className="selected">{renderSelected}</div>
        </div>
        <div className={cx('select-options', { active: isActive })}>
          {options?.map(({ value, label, sc }, index) => (
            <div
              className={cx('option')}
              key={index}
              onClick={() => {
                onChange?.(value, sc || '');
                setIsActive(false);
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </HeadlessTippy>
  );
};

export default Dropdown;
