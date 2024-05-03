import './style.scss';

import { Button, Input, Modal, Table, message } from 'antd';
import React, { useState } from 'react';
import {
  sendChartData,
  sendChartId,
  sendChartVersion,
  sendView,
} from '../../duck/actions/chartPersonalizationAction';

import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const ChartTable = (props) => {
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedViewId, setselectedViewId] = useState('');
  const [isDisabled, setisDisabled] = useState(true);

  const [filterData, setfilterData] = useState(null);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Chart ID',
      dataIndex: 'chart_disp_id',
      key: 'chart_disp_id',
    },
    {
      title: 'Chart Name ',
      dataIndex: 'chart_name',
      key: 'chart_name',
    },
    {
      title: 'Status',
      dataIndex: 'chart_status',
      key: 'chart_status',
    },
    {
      title: ' Version',
      dataIndex: 'chart_version',
      key: 'chart_version',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
  ];
  const data = props.data;

  const handleOk = () => {
    let selectedChartId = selectedViewId.chart_disp_id;
    let selectedChartVersion = selectedViewId.chart_version;
    props.handleOkModal(selectedChartId, selectedChartVersion);
  };
  const handleClose = () => {
    props.handleCloseModal();
  };

  const searchTable = (value) => {
    const tableData = data;
    const filterData = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setfilterData(filterData);
  };

  return (
    <Modal
      visible={props.isModal}
      title='Chart Table'
      width={600}
      closable={false}
      onCancel={handleClose}
      centered={true}
      footer={[
        <Button
          onClick={handleClose}
          className='custom-primary-btn'
          key='cancel'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleOk}
          className='custom-secondary-btn'
          key='link'
          type='primary'
          disabled={isDisabled}
        >
          Ok
        </Button>,
      ]}
    >
      <div className='modal-search-bar'>
        <Input.Search
          className='modal-table-search'
          placeholder='Search by...'
          enterButton
          onSearch={searchTable}
          allowClear
        />
      </div>
      <div className='custom-table-antd'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          columns={columns}
          // rowSelection={() => ({
          //   onChange: (selectedRowKeys, selectedRows) => {
          //     console.log(
          //       `selectedRowKeys: ${selectedRowKeys}`,
          //       'selectedRows: ',
          //       selectedRows
          //     );
          //     setselectedKeys({ selectedRowKeys });
          //   },
          // })}
          rowKey='key'
          onRow={(record) => ({
            onClick: () => {
              setselectedViewId(record);

              message.success(`${record.chart_disp_id} Selected`);
              setisDisabled(false);
              const selectedRowKeys = [...selectedKeys];
              if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
                dispatch(sendChartId(record.chart_disp_id));
                dispatch(sendChartVersion(record.chart_version));
              } else {
                selectedRowKeys.push(record.key);
                dispatch(sendChartId(record.chart_disp_id));
                dispatch(sendChartVersion(record.chart_version));
              }

              setselectedKeys({ selectedRowKeys });
            },
          })}
          dataSource={filterData === null ? data : filterData}
          size='small'
          scroll={{ y: 300 }}
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default ChartTable;
