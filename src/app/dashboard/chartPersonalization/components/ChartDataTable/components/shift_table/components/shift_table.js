import React, { Component } from 'react';

import { Table } from 'antd';

import './shift.scss';

class ShiftTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Table
                    size='small'
                    className='shift_table'
                    columns={[]}
                    dataSource={[]}
                    bordered
                    pagination={false}
                />
            </div>
        );
    }
}

export default ShiftTable;
