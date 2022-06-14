import { useMemo, useCallback } from 'react';
import ChevLeftSvg from 'assets/images/icons/chevLeft.svg';
import ChevRightSvg from 'assets/images/icons/chevRight.svg';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

interface Props {
  page: number;
  totalPage: number;
  click: (selectPage: number) => void;
  className?: string;
}

const Pagination = ({ page, totalPage, click, className }: Props) => {
  const renderNumbers = useMemo(() => {
    let pages: (string | number)[] = [];
    for (let i = 1; i <= totalPage; i++) {
      let offset = (i == 1 || totalPage) && 1;
      if (i == 1 || (page - offset <= i && page + offset >= i) || i == page || i == totalPage) {
        pages.push(i);
      } else if (i == page - (offset + 1) || i == page + (offset + 1)) {
        pages.push('...');
      }
    }
    return pages.map((p, index) => {
      if (typeof p === 'string') {
        return (
          <div className={cx('number-box')} key={p + index}>
            {p}
          </div>
        );
      }
      return (
        <div key={p} className={cx('number-box', { active: page === p })} onClick={() => click(p + 1)}>
          {p}
        </div>
      );
    });
  }, [click, page, totalPage]);

  const handlePrev = useCallback(() => {
    if (page > 1) {
      click(page - 1);
    }
  }, [click, page]);

  const handleNext = useCallback(() => {
    if (page < totalPage) {
      click(page + 1);
    }
  }, [click, page, totalPage]);

  return (
    <div className={`${cx('wrapper')} ${className}`}>
      <div onClick={handlePrev} className={cx('navigate', 'number-box', { disabled: !totalPage || page === 1 })}>
        <div className={cx('chev-left')}></div>
      </div>
      {renderNumbers}
      <div
        onClick={handleNext}
        className={cx('navigate', 'number-box', { disabled: !totalPage || page === totalPage })}
      >
        <div className={cx('chev-right')}></div>
      </div>
    </div>
  );
};

export default Pagination;
