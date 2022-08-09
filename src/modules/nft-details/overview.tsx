import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Gemini from 'assets/images/icons/gemini.svg';
import Person from 'assets/images/icons/person.svg';
import Male from 'assets/images/icons/male.svg';
import classNames from 'classnames/bind';
import styles from './overview.module.scss';
const cx = classNames.bind(styles);

const Overview = () => {
  return (
    <div className={cx('overview')}>
      <div className={cx('overview-info')}>
        <div className={cx('overview-item')}>
          <p>Rank</p>
          <h2 className="gdf-heading-6">
            <Gemini /> <span className="gdf-heading-10">123</span>
          </h2>
        </div>
        <div className={cx('overview-item')}>
          <p>Zodiac</p>
          <h2 className="gdf-heading-6">
            <Gemini /> <span className="gdf-heading-10">Cancer</span>
          </h2>
        </div>
        <div className={cx('overview-item')}>
          <p>Gender</p>
          <h2 className="gdf-heading-6">
            <Male /> <span className="gdf-heading-10">Male</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default memo(Overview);
