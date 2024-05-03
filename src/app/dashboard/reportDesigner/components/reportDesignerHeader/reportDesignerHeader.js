import React from 'react';

import { Table } from 'antd';

import './styles.scss';

const dataSource = [
    {
    //key: '1',
        key: 'Plant',
        value: 'Set Princeton',
    },
    {
    //key: '2',
        key: 'Summary',
        value: 'Summary',
    },
];

const columns = [
    {
        title: 'Key',
        dataIndex: 'keyName',
        key: 'keyName',
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
    },
];

function ReportDesignerHeader() {
    return (
        <div className="reportDesigner-headerTableBlock">
            <Table pagination={false} columns={columns} dataSource={dataSource} />
        </div>
    );
}

export default ReportDesignerHeader;
