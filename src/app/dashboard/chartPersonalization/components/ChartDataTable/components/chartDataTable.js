import './chartTableStyles.scss';

import { Card, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExclusionTable from './exclusion_table';
import ParameterTable from './parameter_table/components/ParameterTable';
import ShiftTable from './shift_table';
import TrendTable from './trend_table';
import ViolationTable from './violation';
import { sendParameterTableData } from '../../../../../../duck/actions/chartPersonalizationAction';

function ChartDataTable({
  exclusionTableData,
  setExclusionTableData,
  dataTable,
  setDataTable,
  tempArrForExclude,
  counterIdForExclusion,
  tempArrForData,
}) {
  const parameterData = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage
  );
  const [paramData, setparamData] = useState([]);
  let columns = [];

  const dispatch = useDispatch();

  useEffect(() => {
    setparamData(parameterData);
    // dispatch(sendParameterTableData(parameterData ? parameterData : []));
  }, [parameterData]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const objkeys =
    dataTable !== undefined && dataTable.length > 0
      ? Object.keys(dataTable[0])
      : [];

  const filterColumn = objkeys.filter(uniqueArr);
  filterColumn.map((item, i) => {
    columns.push({
      title: item.toUpperCase(),
      dataIndex: item,
      key: `${item}-${i}`,
    });
  });

  useEffect(() => {}, [dataTable]);

  const { TabPane } = Tabs;
  return (
    <div>
      <div>
        <Card bordered={false} style={{ height: '350px' }}>
          <Tabs defaultActiveKey='3'>
            <TabPane tab='Exclusion' key='1'>
              <ExclusionTable
                tempArrForData={tempArrForData}
                setDataTable={setDataTable}
                counterIdForExclusion={counterIdForExclusion}
                tempArrForExclude={tempArrForExclude}
                dataTable={dataTable}
                setExclusionTableData={setExclusionTableData}
                exclusionTableData={exclusionTableData}
              />
            </TabPane>
            {/* <TabPane tab='Shift' key='2'>
                              <ShiftTable />
                          </TabPane>
                          <TabPane tab='Trends' key='3'>
                              <TrendTable />
                          </TabPane> */}
            <TabPane tab='Violation' key='2'>
              <ViolationTable />
            </TabPane>
            <TabPane tab='Data Table' key='3'>
              {
                <Table
                  style={{ height: '300px' }}
                  rowClassName={(record, index) =>
                    index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                  }
                  size='small'
                  className='parameter_table'
                  columns={columns}
                  dataSource={dataTable}
                  scroll={{ y: 350 }}
                  pagination={false}
                />
              }
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default ChartDataTable;
