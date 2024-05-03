import React from 'react';

import { Input, Button, Select } from 'antd';

import { SearchOutlined, BlockOutlined } from '@ant-design/icons';

import './styles.scss';

const InputView = (props) => {
  return (
    <div className='alert_field_view'>
      <p>{props.label}</p>
      <div className='alert_view'>
        <Select
          placeholder={props.placeholder}
          value={props.selectedValue}
          onChange={props.onChangeSelect}
          prefix={
            <SearchOutlined style={{ fontSize: '16px', color: '#D7D7D7' }} />
          }
        >
          {props.option}
        </Select>
       
      </div>
    </div>
  );
};

export default InputView;
