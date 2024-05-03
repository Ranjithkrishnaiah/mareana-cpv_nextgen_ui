// Ranjith K
// Mareana Software
// Version 1
// Last modified - 07 March, 2022

import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Input, Space, Table, Tag } from 'antd';
import emptyIcon from '../../../../../assets/icons/empty.svg';

function ViewSummary(props) {
  const {
    viewSummaryTable,
    setViewSummaryTable,
    parentBatches,
    setParentBatches,
    viewSummaryColumns,
    setViewSummaryColumns,
    newBatchData,
    setNewBatchData,
    functionEditorViewState,
    viewDisplayId,
    viewStatus,
    viewVersion,
    form,
    moleculeId,
    setViewFunctionName,
    viewFunctionName,
    saveResponseView,
    params,
  } = props;

  useEffect(() => {
    onChangeColumnsHandler();
  }, [newBatchData]);

  const onChangeColumnsHandler = () => {
    let columns = [];
    Object.entries(newBatchData).map(([key, value], index) => {
      let obj = {
        title: key,
        key: index,
        dataIndex: key,
        width: 100,
        render: (value) =>
          value ? (
            <span className='batchChecked'>
              <CheckOutlined />
            </span>
          ) : (
            <span className='batchClosed'>
              <CloseOutlined />
            </span>
          ),
      };
      columns.push(obj);
    });

    if (viewSummaryColumns.length === 3) {
      let data = [...viewSummaryColumns, ...columns];
      setViewSummaryColumns(data);
    }
  };

  const handleFunctionNameChange = (e) => {
    setViewFunctionName(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue({
      viewId: saveResponseView.viewId,
      status: saveResponseView.viewStatus,
      version: saveResponseView.version,
    });
  }, [saveResponseView]);

  return (
    <div className='viewSummary-container'>
      <div className='viewSummary-FormBlock'>
        <Form.Item label='View ID' name='viewId'>
          <Input disabled />
        </Form.Item>
        <Form.Item label='Name' name='viewName'>
          <Input
            placeholder='Enter Name'
            value={viewFunctionName}
            onChange={handleFunctionNameChange}
            disabled={params}
          />
        </Form.Item>
        <Form.Item label='Status' name='status'>
          <Input placeholder='New' disabled />
        </Form.Item>
        <Form.Item label='Version' name='version'>
          <Input disabled />
        </Form.Item>
      </div>
      {!functionEditorViewState && (
        <div className='emptyDiv'>
          <div>
            <img src={emptyIcon} alt={'empty'} />
            <p>Please select a parameter to create a function</p>
          </div>
        </div>
      )}
      {functionEditorViewState && (
        <div className='viewSummary-TableBlock'>
          <Table
            className={
              params
                ? 'viewSummary-table viewSummary-tablewidth viewSummaryTable-disable'
                : 'viewSummary-table viewSummary-tablewidth'
            }
            pagination={false}
            columns={viewSummaryColumns}
            dataSource={viewSummaryTable}
            scroll={{ x: 900 }}
            style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            rowKey={(record) => record.id}
          />
        </div>
      )}
    </div>
  );
}

export default ViewSummary;
