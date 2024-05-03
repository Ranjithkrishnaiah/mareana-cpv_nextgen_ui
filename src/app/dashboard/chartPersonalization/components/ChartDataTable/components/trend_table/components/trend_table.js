import React, { Component } from 'react';

import { Table } from 'antd';

import './trend.scss';

class TrendTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Table
                    size='small'
                    className='trend_table'
                    columns={[]}
                    dataSource={[]}
                    bordered
                    pagination={false}
                />
            </div>
        );
    }
}

export default TrendTable;
