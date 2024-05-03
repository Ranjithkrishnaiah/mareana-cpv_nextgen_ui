import React, { useState } from 'react';

import { DeleteTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table } from 'antd';



function TableSummary() {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [data, setData] = useState([
        {
            keys: '',
            values: ''
        }
    ]);

    const addNewRecord = () => {
        
        let obj = {
            keys: '',
            values: ''
        };
        console.log(data);
        let component = [...data,obj];
        // component.push(obj)
        // let data=[...data]
        // data.push(obj)
        console.log('component',component);

        setData(component);
        
        console.log('after',data);

    };

    const  handleDelete = (key) => {
        const dataSource = [...data];
        setData(dataSource.filter((item) => item.key !== key));  
    };

    const [columns, setColumns] = useState([
        {
            title: '',
            render: (item, value, index) => 
                (<> 
                    <PlusSquareTwoTone onClick={() => addNewRecord()} />
                </>)
            ,
        },
        {
            title: 'Key',
            key: 'keys',
            render: (item) => (
                <>
                    <Input  type="text" onChange={(e) => setKey(e.target.value)}/>
                </>
            ),
        },
        {
            title: 'Value',
            key: 'value',
            render: (item) => (
                <>
                    <Input  type="text"  onChange={(e) => setValue(e.target.value)}/>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '5px',
            render: (item) => (
                <>
                    <Popconfirm title="Are you Sure you want to delete?" onConfirm={() => handleDelete(item.key)}>
                        <DeleteTwoTone />
                    </Popconfirm>

                </>
            ),

        },

    ]);
 

    return (
        <div>
            <button onClick={()=>addNewRecord()}>add</button>
            <center> <Input placeholder="Section" value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="summary-input" /></center>
            <Table className="summary-table"
                columns={columns} 
                dataSource={data}
                pagination={false}
                size="small" />
        </div>
    );
}

export default TableSummary;