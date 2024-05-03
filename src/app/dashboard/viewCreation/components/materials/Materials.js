// Ranjith K
// Mareana Software
// Version 1
// Last modified - 07 March, 2022

import React, { useEffect, useState } from 'react';
import './styles.scss';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, message, Spin, Table, Tag, Tooltip } from 'antd';
const { Panel } = Collapse;

function Materials(props) {
    const {
        moleculeId,
        setMoleculeId,
        materialsList,
        setMaterialsList,
        filterdData,
        setFilterdData,
        dataLoadingState,
        setDataLoadingState,
        viewSummaryTable,
        setViewSummaryTable,
        viewSummaryColumns,
        setViewSummaryColumns,
        functionEditorViewState,
        setFunctionEditorViewState,
        parentBatches,
        setParentBatches,
        newBatchData,
        setNewBatchData,
        count,
        setCount,
        setMaterialIdName,
        materialIdName,
        getNewData
    } = props;


    const columns = [
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            render: (param) => (
                <Tooltip title={param}>
                    <Tag color="geekblue" className='parameter-tag'>
                        {param}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Batch Coverage',
            key: 'coverage_metric' + 'coverage_metric_percent',
            dataIndex: 'coverage_metric_percent',
            render: (text, record) => (
                <span>{record.coverage_metric}({record.coverage_metric_percent})</span>
              )
        },
        {
            title: '',
            key: 'add',
            dataIndex: 'add',
            render: (text, record, index) => (
                <>
                    <span
                        className='material-addIcon'
                        onClick={() => {
                            parameterPassHandler(record, index);
                        }}
                    >
                        <PlusSquareOutlined />
                    </span>
                </>
            ),
        },
    ];

    const parameterPassHandler = (record, index) => {
        let rowData = {};
        let batchData = {};
        let newBatchData = {};
        parentBatches.map((el, index) => {
            if (record.coverage_list.includes(el)) {
                batchData[el] = true;
                newBatchData[el] = true;
               
            } else {
                batchData[el] = false;
                newBatchData[el] = false;   
            }
            
        });
        batchData['id']=count;
        setCount(count+1);
       
        //check for duplicate records
        const indexDuplicate = viewSummaryTable.findIndex(
            (x) => x.param == record.param
        );
        if (indexDuplicate === -1) {
            rowData = Object.assign(record, batchData);
            rowData.sourceType = 'material' 
            rowData.mat_no = record.mat_no
            rowData.parameters = [rowData];
            getNewData(rowData);
            let data = [...viewSummaryTable];
            data.push(rowData);
            setNewBatchData(newBatchData);
            setViewSummaryTable([...data]);
            setFunctionEditorViewState(true);
        } else {
            message.error('Function already exists');
        }
    };
    
   
    return (
        <div className='materials-wrapper'>
            <Collapse
                accordion
                className='materials-accordion'
                expandIconPosition='right'
            >
                {!dataLoadingState ? (
                    <div className='loadSpinner-block'>
                        <Spin />
                    </div>
                ) : filterdData != null ? (
                    filterdData.map((item, index) => {
                        item.parameters.forEach((ele) => {
                            ele.mat_no =  item.mat_no
                        })
                        return (
                            <Panel
                                className='materials-panel'
                                header={item.product}
                                key={index}
                            >
                                <Table
                                    className='viewSummary-table materialsList-table borderless-table'
                                    pagination={false}
                                    columns={columns}
                                    dataSource={item.parameters}
                                    rowKey={(record) => record.param}
                                />
                            </Panel>
                        );
                    })
                ) : (
                    materialsList.map((item, index) => {
                        item.parameters.forEach((ele) => {
                            ele.mat_no =  item.mat_no
                        })
                        return (
                            <Panel
                                className='materials-panel'
                                header={item.product}
                                key={index}
                            >
                                <Table
                                  className='viewSummary-table materialsList-table borderless-table'
                                  pagination={false}
                                  columns={columns}
                                  dataSource={item.parameters}
                                  rowKey={(record) => record.param}
                                />
                            </Panel>
                        );
                    })
                )}
            </Collapse>
        </div>
    );
}

export default Materials;
