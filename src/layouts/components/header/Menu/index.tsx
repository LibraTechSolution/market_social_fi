import MenuConst from 'utils/menu.const';
import ActiveLink from './active-link';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const MenuHeader = () => {
  return (
    <nav>
      <ul className={cx('navbar')}>
        {MenuConst &&
          MenuConst.map((item, index) => (
            <li key={index} className={cx('navbar-item')}>
              <ActiveLink href={item.to} activeClassName="active-nav">
                <span>{item.label}</span>
              </ActiveLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuHeader;
