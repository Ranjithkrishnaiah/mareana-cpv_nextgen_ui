import './parameter.scss';

import React, { useEffect, useState } from 'react';

import { Table } from 'antd';
import { useSelector } from 'react-redux';

function ParameterTable(props) {
  return (
    <>
      <Table
        size='small'
        className='parameter_table'
        columns={[]}
        dataSource={[]}
        bordered
        pagination={false}
      />
    </>
  );
}

export default ParameterTable;
