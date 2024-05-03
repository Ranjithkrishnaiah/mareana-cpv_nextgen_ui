// Ranjith K
// Mareana Software
// Version 1
// Last modified - 07 March, 2022

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Select, Table, Tag, Card, Tooltip } from 'antd';
import { functionTextName } from '../../../../../duck/actions/viewCreationAction';

const { Option } = Select;

const Editorcolumns = [
  {
    title: 'Math Editor',
    key: 'batch',
    dataIndex: 'batch',
  },
];

const FunctionEditor = (props) => {
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
    parentBatches,
    setParentBatches,
    functionEditorColumns,
    setFunctionEditorColumns,
    functionEditorRecord,
    setFunctionEditorRecord,
    newBatchData,
    setNewBatchData,
    functionName,
    setFunctionName,
    form,
    functionText,
    setFunctionText,
    passStateFunc,
    getNewData,
    id,
    setId,
    functionChanged,
    setMathFunction,
    mathFunction,
    setMeanChange,
    params,
  } = props;

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const functionData = useRef();
  const columnsHandler = () => {
    let columns = [];
    Object.entries(newBatchData).map(([key, value1], index) => {
      let Index = 0;
      let obj = {
        title: (
          <Tooltip placement='topLeft' title={key}>
            {key.substring(0, 3)}
          </Tooltip>
        ),
        key: index,
        dataIndex: key,
        width: 50,
        onCell: (record, rowIndex) => {
          return {
            onClick: () => {
              Index = rowIndex;
            },
          };
        },
        render: (key) => {
          return key === true ? (
            // <Checkbox
            //     checked={true}
            //     onChange={(e) => onChange(e, key, key, index)}
            // />
            <span style={{ textAlign: 'center', display: 'block' }}>
              <CheckCircleFilled
                style={{ color: '#093185', fontSize: '18px' }}
                onChange={(e) => onChange(e, key, key, index)}
              />
            </span>
          ) : (
            <span
              className='batchClosed'
              style={{ textAlign: 'center', display: 'block' }}
            >
              <CloseOutlined />
            </span>
          );
        },
      };
      columns.push(obj);
    });
    if (functionEditorColumns.length === 1) {
      let data = [...functionEditorColumns, ...columns];
      setFunctionEditorColumns(data);
    }
  };

  const onChange = (e, key, value, rowIndex) => {
    let filteredRecord = [...functionData.current];
    filteredRecord[rowIndex][key] =
      e.target.checked == false ? '' : e.target.checked;
    setFunctionEditorRecord(filteredRecord);
  };

  const onChangeParameterHandler = (value) => {
    let indexDuplicate = functionEditorRecord.findIndex(
      (x) => x.param == value
    );
    let filteredParameter = viewSummaryTable.filter((el) => el.param == value);

    if (indexDuplicate < 0) {
      setFunctionEditorRecord([...functionEditorRecord, ...filteredParameter]);
      setFunctionName(value);
      setId(filteredParameter[0].id);
    }
  };

  const mathEditorFunction = (value) => {
    setMathFunction(value);
    functionChanged.current = true;
    let data = [...functionEditorRecord];
    let obj = {},
      count = 1;
    if (value != 'union') {
      data.forEach((item, i) => {
        if (i == 0) {
          obj = { ...item };
        } else {
          Object.entries(item).forEach(([key, value], index) => {
            if (key.includes('B')) {
              obj[key] = obj[key] && item[key];
              obj.param = item.param;
              obj.id = item.id;
            }
          });
        }
      });
      getNewData(obj);
    } else if (value == 'union') {
      data.forEach((item, i) => {
        if (i == 0) {
          obj = { ...item };
        } else {
          Object.entries(item).forEach(([key, value], index) => {
            if (key.includes('B')) {
              obj[key] = obj[key] || item[key];
              obj.param = item.param;
              obj.id = item.id;
            }
          });
        }
      });
      getNewData(obj);
    }
  };

  const handleMean = (e) => {
    setMeanChange(e);
  };

  useEffect(() => {
    form.setFieldsValue({
      function_name: functionName,
      parameter: functionName,
      id: id,
      aggregation: 'Mean',
    });
  }, [functionName, id]);

  useEffect(() => {
    columnsHandler();
  }, []);

  useEffect(() => {
    functionData.current = functionEditorRecord;
  }, [functionEditorRecord]);

  const handlePassState = (e) => {
    passStateFunc(e.target.value);
  };

  return (
    <div className='viewSummary-container functionEditor-container'>
      <div className='functionEditor-FormBlock'>
        <Form.Item label='ID' name='id'>
          <Input placeholder='Enter ID' disabled />
        </Form.Item>
        <Form.Item label='Function Name' name='function_name'>
          <Input
            placeholder='Enter Function Name'
            onChange={(e) => handlePassState(e)}
            disabled={params}
          />
        </Form.Item>
        <Form.Item label='Aggregation' name='aggregation'>
          <Select
            placeholder='Select Aggregation'
            onChange={handleMean}
            disabled={params}
          >
            <Option value='Min'>Min</Option>
            <Option value='Mean'>Mean</Option>
            <Option value='Max'>Max</Option>
            <Option value='First'>First</Option>
            <Option value='last'>last</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Parameter' name='parameter'>
          <Select
            placeholder='Select Parameter'
            onChange={onChangeParameterHandler}
            disabled={params}
          >
            {viewSummaryTable.map((item, i) => {
              return (
                <Option value={item.param} key={i}>
                  {item.param}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label='Function' name='function'>
          <Select
            placeholder='Select Function'
            onChange={mathEditorFunction}
            disabled={params}
          >
            {/* <Option value='round'>round</Option> */}
            <Option value='add'>add</Option>
            <Option value='subtract'>subtract</Option>
            <Option value='multiply'>multiply</Option>
            <Option value='divide'>divide</Option>
            <Option value='union'>union</Option>
          </Select>
        </Form.Item>
      </div>
      <div className=' MathEditor-FormBlock'>
        <div className='viewSummary-table functionBatch-table site-card-border-less-wrapper'>
          <Card title='Math Editor' bordered className='cardClass'>
            {mathFunction ? (
              mathFunction == 'round' ? (
                <p>
                  {`=${mathFunction}(${functionName},`}{' '}
                  <input
                    type='text'
                    style={{ height: '20px', width: '20px' }}
                  />
                  )
                </p>
              ) : (
                `=${mathFunction}(${functionEditorRecord.map(
                  (el) => el.param
                )})`
              )
            ) : (
              ''
            )}
          </Card>
        </div>
        <div>
          <Table
            className={
              params
                ? 'viewSummary-table MathEditor-table tabledisable'
                : 'viewSummary-table MathEditor-table'
            }
            columns={functionEditorColumns}
            dataSource={functionEditorRecord}
            scroll={{ x: 900 }}
            style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            pagination={false}
            rowKey={(record) => record.param}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionEditor;
