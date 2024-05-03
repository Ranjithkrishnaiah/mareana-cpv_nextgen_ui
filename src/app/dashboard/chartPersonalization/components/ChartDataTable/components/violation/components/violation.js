import React, { Component } from 'react';

import { Table } from 'antd';

import './violation.scss';

const ViolationTable = () => {
  
    const newColumns = [
        {
            title: 'Id',
            key: 'exclusionId',
            dataIndex: 'exclusionId',
            width: 50,
            fixed: 'left'
        },
        {
            title: 'Batch',
            key: 'batch_num',
            dataIndex: 'batch_num',
            width: 100,
            fixed: 'left'
        }
    ]

    return (
        <div>
            <Table
                size='small'
                className='violation_table'
                columns={newColumns}
                dataSource={[]}
                bordered
                pagination={false}
            />
        </div>
    );
}

export default ViolationTable;