import './style.scss';

import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Spin } from 'antd';

const DEFAULT_LOADING_TEXT = 'Please wait...';
const antIcon = (
  <LoadingOutlined style={{ fontSize: 45, color: '#fff' }} spin />
);
const Spinner = ({ text }) => {
  return (
    <div className='loading-wrapper'>
      <Spin tip={text || DEFAULT_LOADING_TEXT} indicator={antIcon} />
    </div>
  );
};

export default Spinner;
