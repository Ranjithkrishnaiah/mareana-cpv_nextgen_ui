/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 15 March, 2022
 * @Last Changed By - Dinesh Kumar
 */
import React, { useEffect, useState } from 'react';
import { Collapse, Table } from 'antd';
import { tableColumns } from '../../../../../utils/TableColumns';

function GenealogyDataTable(props) {
  const [batchData, setbatchData] = useState([]);
  const [processData, setprocessData] = useState([]);
  const { Panel } = Collapse;
  useEffect(() => {
    if (props && props.batchInfo && props.batchInfo.length > 0) {
      setbatchData(props.batchInfo);
    }
    if (props && props.processInfo && props.processInfo.length > 0) {
      setprocessData(props.processInfo);
    }
  }, [props.processInfo, props.batchInfo]);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      className={props.className}
    >
      <Panel header='Batch details' key='1'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          size='small'
          columns={tableColumns(batchData)}
          dataSource={batchData}
          scroll={{ x: 2600, y: 350 }}
          pagination={false}
        />
      </Panel>
      <Panel header='Into process order' key='2'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          size='small'
          columns={tableColumns(processData)}
          dataSource={processData}
          scroll={{ y: 350 }}
          pagination={false}
        />
      </Panel>
      <Panel header='From process order' key='3'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          size='small'
          // columns={columns}
          // dataSource={dataTable}
          scroll={{ y: 350 }}
          pagination={false}
        />
      </Panel>
      <Panel header='Purchase information' key='4'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          size='small'
          // columns={columns}
          // dataSource={dataTable}
          scroll={{ y: 350 }}
          pagination={false}
        />
      </Panel>
      <Panel header='Component details' key='5'>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          size='small'
          // columns={columns}
          // dataSource={dataTable}
          scroll={{ y: 350 }}
          pagination={false}
        />
      </Panel>
    </Collapse>
  );
}

export default GenealogyDataTable;
