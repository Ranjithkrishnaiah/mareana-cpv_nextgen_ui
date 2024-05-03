// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import '../Personalization.scss';
import './style.scss';
import { Button, Card, Collapse, Table, Popconfirm, DatePicker, Input } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import {
  DeleteTwoTone,
  PlusSquareOutlined
} from '@ant-design/icons';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';






const ControLimits = ({controlSource,setControlSource,specificationSource, setSpecificationSource, warningSource, setWarningSource}) => {
  const [controlColumns, setControlColumns] = useState({ll:'', ul:'', date:''});
  const [specifyColumns, setSpecifyColumns] = useState({ll:'', ul:'', date:''});
  const [warningColumns, setWarningColumns] = useState({ll:'', ul:'', date:''});
  const [count, setCount] = useState(1);
  const [specCount, setSpecCount] = useState(1);
  const [warningCount, setWarningCount] = useState(1);

  const handleChange = (event,record) => {
    const { name, value } = event.target;
    setControlColumns((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const data = [...controlSource]
    data.forEach((ele) => {
      if (ele.key === record.key) {
        if (name === 'ul') {
          ele.ul = value
        }
        if (name === 'll') {
          ele.ll = value
        }
      }
    })
    setControlSource([...data]);
  };
  
  const handleDateChange = (dateString, record) => {
     setControlColumns((prevState) => {
       return {
         ...prevState,
         date:dateString
       }
     })
     const data = [...controlSource]
     data.forEach((ele) => {
      if (ele.key === record.key) {
        ele.date = (dateString._d).toLocaleDateString()
      }
    })
    setControlSource([...data]);
  }
  const handleSpecifyDateChange = (dateString, record) => {
    setSpecifyColumns((prevState) => {
      return {
        ...prevState,
        date:dateString
      }
    })
    const data = [...specificationSource]
    data.forEach((ele) => {
     if (ele.key === record.key) {
       ele.date = (dateString._d).toLocaleDateString()
     }
   })
   setSpecificationSource([...data]);
 }
 const handleWarnDateChange = (dateString, record) => {
  setWarningColumns((prevState) => {
    return {
      ...prevState,
      date:dateString
    }
  })
  const data = [...warningSource]
  data.forEach((ele) => {
   if (ele.key === record.key) {
     ele.date = (dateString._d).toLocaleDateString()
   }
 })
 setWarningSource([...data]);
}

  const handleSpecChange = (event,record) => {
    const { name, value } = event.target;
    setSpecifyColumns((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const data = [...specificationSource]
    data.forEach((ele) => {
      if (ele.key === record.key) {
        if (name === 'ul') {
          ele.ul = value
        }
        if (name === 'll') {
          ele.ll = value
        }
      }
    })
    setSpecificationSource([...data]);
  };

  const handleWarnChange = (event,record) => {
    const { name, value } = event.target;
    setWarningColumns((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const data = [...warningSource]
    data.forEach((ele) => {
      if (ele.key === record.key) {
        if (name === 'ul') {
          ele.ul = value
        }
        if (name === 'll') {
          ele.ll = value
        }
      }
    })
    setWarningSource([...data]);
  };

  const columns = [
    {
      title: 'LL',
      dataIndex: 'LL',
      key: 'LL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ll' value={controlColumns.ll} onChange={(e) => handleChange(e,record)}/>
    },
    {
      title: 'UL',
      dataIndex: 'UL',
      key: 'UL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ul' value={controlColumns.ul} onChange={(e) => handleChange(e,record)} />
    },
    {
      title: 'Valid Until   ',
      dataIndex: 'validuntill',
      key: 'validuntill',
      render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={controlColumns.date} onChange={(dateString) => handleDateChange(dateString, row)} /></a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '8%',
      render: (_, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <DeleteTwoTone twoToneColor="red" />
        </Popconfirm>
    }

  ];

  const specColumns = [
    {
      title: 'LL',
      dataIndex: 'LL',
      key: 'LL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ll' value={specifyColumns.ll} onChange={(e) => handleSpecChange(e,record)}/>
    },
    {
      title: 'UL',
      dataIndex: 'UL',
      key: 'UL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ul' value={specifyColumns.ul} onChange={(e) => handleSpecChange(e,record)} />
    },
    {
      title: 'Valid Until   ',
      dataIndex: 'validuntill',
      key: 'validuntill',
      render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={specifyColumns.date} onChange={(dateString) => handleSpecifyDateChange(dateString, row)} /></a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '8%',
      render: (_, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleSpecifyDelete(record.key)}>
          <DeleteTwoTone twoToneColor="red" />
        </Popconfirm>
    }
  ];

  const warnColumns = [
    {
      title: 'LL',
      dataIndex: 'LL',
      key: 'LL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ll' value={warningColumns.ll} onChange={(e) => handleWarnChange(e,record)}/>
    },
    {
      title: 'UL',
      dataIndex: 'UL',
      key: 'UL',
      width: '18%',
      render: (text, record) =>
        <Input type="text" name='ul' value={warningColumns.ul} onChange={(e) => handleWarnChange(e,record)} />
    },
    {
      title: 'Valid Until   ',
      dataIndex: 'validuntill',
      key: 'validuntill',
      render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={warningColumns.date} onChange={(dateString) => handleWarnDateChange(dateString, row)}/></a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '8%',
      render: (_, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleWarningDelete(record.key)}>
          <DeleteTwoTone twoToneColor="red" />
        </Popconfirm>
    }
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
    };
    setControlSource([...controlSource, newData]);
    setCount(count + 1);
  }

  const handleSpecAdd = () => {
    const newData = {
      key: specCount,
    };

    setSpecificationSource([...specificationSource, newData]);
    setSpecCount(specCount + 1);
  }

  const handleWarnAdd = () => {
    const newData = {
      key: warningCount,
    };
    setWarningSource([...warningSource, newData]);
    setWarningCount(warningCount + 1);
  }

  const handleDelete = (key) => {
    const dataSource = [...controlSource]
    setControlSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSpecifyDelete = (key) => {
    const dataSource = [...specificationSource]
    setSpecificationSource(dataSource.filter((item) => item.key !== key));
  };

  const handleWarningDelete = (key) => {
    const dataSource = [...warningSource]
    setWarningSource(dataSource.filter((item) => item.key !== key));
  };

  return (
    <div className="container">
      <div className='controlLimit'>
        <div>
          <Table
            bordered
            title={() => {
              return (
                <>
                  <span>{'Control Limit'}</span>
                  <Button onClick={() => handleAdd()} className='add-row-btn' type="primary"><PlusSquareOutlined />Add Row</Button>
                </>
              )
            }
            }
            pagination={false}
            dataSource={controlSource}
            columns={columns}
          />
          <Table
            bordered
            title={() => {
              return (
                <>
                  <span>{'Specification'}</span>
                  <Button onClick={() => handleSpecAdd()} className='add-row-btn' type="primary"><PlusSquareOutlined />Add Row</Button>
                </>
              )
            }
            }
            pagination={false}
            dataSource={specificationSource}
            columns={specColumns}
          />
          <Table
            bordered
            title={() => {
              return (
                <>
                  <span>{'Warning'}</span>
                  <Button onClick={() => handleWarnAdd()} className='add-row-btn' type="primary"><PlusSquareOutlined />Add Row</Button>
                </>
              )
            }
            }
            pagination={false}
            dataSource={warningSource}
            columns={warnColumns}
          />
        </div>
      </div>

    </div>
  );

}


export default ControLimits;
