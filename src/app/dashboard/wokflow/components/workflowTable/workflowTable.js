import React, { useEffect, useState, useRef } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { Table, Input, Space, Button, Avatar } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from 'moment';
import './styles.scss';



function workflowTable(props) {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [newColumns, setNewColumns] = useState([]);
  const refSearchInput = useRef();
  const history = useHistory();

  useEffect(() => {
    updateTableColumns();
  }, [props.columns])

  const getColumnSearchProps = (
    dataIndex,
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
          style={{ width: 240, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                setSearchText,
                setSearchedColumn
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(
                clearFilters,
                setSearchText,
                setSearchText,
                setSearchedColumn
              )
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    setSearchText,
    setSearchedColumn
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, setSearchText) => {
    clearFilters();
    setSearchText("");
  };
  // const columns = [
  //     {
  //         title: 'Site',
  //         key: 'site',
  //         dataIndex: 'site',
  //         ...getColumnSearchProps('site',refSearchInput,searchText,setSearchText,searchedColumn,setSearchedColumn)
  //     },
  //     {
  //         title: 'Product',
  //         key: 'product',
  //         dataIndex: 'product',
  //     },
  //     {
  //         title: 'Test Name',
  //         key: 'test_name',
  //         dataIndex: 'test_name',
  //     },
  //     {
  //         title: 'Batch',
  //         key: 'batch',
  //         dataIndex: 'batch',
  //     },
  //     {
  //         title: 'Test Value',
  //         key: 'test_value',
  //         dataIndex: 'test_value',
  //     },
  //     {
  //         title: 'UOM Code',
  //         key: 'uom code',
  //         dataIndex: 'uom code',
  //     }
  // ]

  const getRandomColor=(index) =>{
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    let colors=['#56483F','#728C69','#c04000','#c19578']
    return colors[index%4];

  }

  const updateTableColumns = () => {
    let columns = [];
    let obj1={};
    if (props.activeTab === "1") {
      props.columns.map((i) => {
        let { display_name, field_name } = i;

        if (i.visible) {
           let obj = {
              title: display_name,
              dataIndex: field_name,
              key: i.field_name,
              width: field_name=='Id' || field_name=='event_id'?'110px':'165px',
              ...getColumnSearchProps(field_name, refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
              sorter: (a, b) => {

                return a.field_name === null || a.field_name === undefined || a.field_name === "" ? -1 : b.field_name == null || b.field_name == undefined || b.field_name == "" ? 1 : a.field_name.toString().localeCompare(b.field_name)

              },

            };
          

          if (i.field_name === "appl_url") {
            obj.fixed='left'
            obj.render = (text, row, index) => {
              return (
                <a onClick={() => history.push(`${text}?id=${row.Id}&version=${row.version}`)} className='review-submission'>Review Submission</a>

              );
            }
          }

          if (i.field_name === "created_by") {
            obj.render = (text, row, index) => {
              return (
                <div>
                  <Avatar className='avatar-icon' style={{backgroundColor:getRandomColor(index+1)}}>{text.split("")[0].toUpperCase()} </Avatar>
                  <span className='avatar-text'>{text}</span>
                </div>
              );
            }
          }

          if (i.field_name === "created_on") {
            obj.render = (text, row, index) => {
              return (
                <>
                  {moment(text.split('T')[0]).format('DD/MM/YYYY')}
                </>
              );
            }
          }


          columns.push(obj)
        }

      })
    } else {
      props.columns.map((i) => {
        let { display_name, field_name } = i;

        if (i.visible) {
          let obj = {
            title: display_name,
            dataIndex: field_name,
            key: i.field_name,
            width: '165px',
            ...getColumnSearchProps(field_name, refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            sorter: (a, b) => {

              return a.field_name === null || a.field_name === undefined || a.field_name === "" ? -1 : b.field_name == null || b.field_name == undefined || b.field_name == "" ? 1 : a.field_name.toString().localeCompare(b.field_name)

            },

          };

          if (i.field_name === "created_by") {
            obj.render = (text, row, index) => {
              return (
                <div>
                  <Avatar className='avatar-icon' style={{backgroundColor:getRandomColor(index+1)}}>{text.split("")[0].toUpperCase()} </Avatar>
                  <span className='avatar-text'>{text}</span>
                </div>
              );
            }
          }

          if (i.field_name === "created_on") {
            obj.render = (text, row, index) => {
              return (
                <>
                  {moment(text.split('T')[0]).format('DD/MM/YYYY')}
                </>
              );
            }
          }

          columns.push(obj)
        }

      })
    }


    setNewColumns(columns)
  }
  return (
    <div className='workflow-table'>
      <Table
        className='approval-table'
        columns={newColumns}
        dataSource={props.dataSource}
        style={{ border: '1px solid #ececec', borderRadius: '2px' }}
        pagination={false}
        scroll={{ x:600,y:300 }}
      //rowKey={(record) => record.param}
      />
    </div>
  )
}

export default workflowTable;
