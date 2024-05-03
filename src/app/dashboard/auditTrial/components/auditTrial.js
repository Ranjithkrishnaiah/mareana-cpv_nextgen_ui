// eslint-disable-next-line
import React from 'react';
import {
  Table,
  Input,
  DatePicker,
  Space,
  Menu,
  Dropdown,
  Button,
  Select,
  Typography,
} from 'antd';
import {
  loadFilter,
  auditDataChange,
} from '../../../../duck/actions/auditTrialAction';

import './styles.scss';
import moment from 'moment';
import { BMS_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';

const { Option } = Select;
const { Text } = Typography;
let filterIng = [];

class AuditTrials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: [],
      eventType: '',
      productList: [],
      columnConfig: [],
      questionList: [],
      eventList: [],
      brandListPkg: [],
      productListPkg: [],
      questionListPkg: [],
      orderSort: {
        old_value: 0,
        activity: 0,
        user_id: 0,
        entry_date: 0,
        table_name: 0,
      },
      sortState: 'DESC',
      tableData: [],
      userList: [],
      filterIng: [],
      filterPkg: [],
      type: '',
      dataGrid: {
        columns: [],
        rows: [],
        totalRecord: null,
        pageNumber: 0,
        pageOffset: null,
        selectedIndexes: [],
      },
      tableDataPackaging: [],
      ansList: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
      ansListPkg: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
      selectedBrand: '',
      selectedProduct: '',
      selectedQuestion: '',
      selectedBrandPkg: '',
      selectedProductPkg: '',
      selectedQuestionPkg: '',
      selectedAns: '',
      selectedAnsPkg: '',
      // loading: true,
      searchText: '',
      colSort: 'entry_date',
      searchedColumn: '',
      filterTable: null,
      searchText1: '',
      searchedColumn1: '',
      filterTable1: null,
      value: false,
      checkedColumns: [],
      visibleMenuSettings: false,
      user: '',
      daterange: [],
      downloadData: [],
      selectedDate: [],
      // config: [],
      columns: [
        {
          title: 'User',
          dataIndex: 'user_id',
          key: '2',
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.user_id - b.user_id,
        },
        {
          title: 'Event',
          dataIndex: 'activity',
          key: '3',
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.activity - b.activity,
        },
        {
          title: 'Old Value',
          dataIndex: 'old_value',
          key: '3',
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          className: 'old_value_class',

          sorter: (a, b) => a.old_value - b.old_value,
        },
        {
          title: 'New Value',
          dataIndex: 'new_value',
          key: '3',
          defaultSortOrder: 'descend',
          className: 'old_value_class',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.new_value - b.new_value,
        },
        {
          title: 'Reason For Change',
          dataIndex: 'reason',
          key: '2',
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.reason - b.reason,
        },
        {
          title: 'Changed On',
          dataIndex: 'entry_date',
          key: '1',
          width: 200,
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.entry_date - b.entry_date,
          render: (text) => moment(text).format('YYYY-MM-DD'),
        },
        {
          title: 'Table Name',
          dataIndex: 'table_name',
          key: '4',
          defaultSortOrder: 'descend',
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              },
            };
          },
          sorter: (a, b) => a.table_name - b.table_name,
        },
      ],

      initialColumns: [],
    };
  }
  componentDidMount() {
    this.setState({ initialColumns: this.state.columns });
    this.auditHighlight();
    this.loadEventFilter('audit_activity_filter')

    let userReq = {
      //appId: "CPV",
      appId: "MDH_APP",
      filterId: "bms_user_filter",
      q: ""
    };
    loadFilter(userReq).then(res => {
      let userList = res.data;
      this.setState({
        userList: userList
      });
    });
  }

  loadData = (column) => {
    this.setState({ colSort: column }, () => this.auditHighlight());
  };

  getExcelFile = (value) => {
    var today = new Date();
    today.setDate(today.getDate() + 1);

    let endPoint = '/audit-information?';
    let baseUrl = BMS_APP_PYTHON_SERVICE + endPoint;

    let startDate =
      this.state.selectedDate.length > 0
        ? this.state.selectedDate[0]
        : '2021-09-01';
    let endDate =
      this.state.selectedDate.length > 0
        ? this.state.selectedDate[1]
        : today.toISOString().slice(0, 10);
    let tableName = ['Parameter Data'];
    let activity = this.state.eventType.value;
    let userid = this.state.user.value;

    const myUrlWithParams = new URL(baseUrl);
    if (startDate == endDate) {
      myUrlWithParams.searchParams.append('startdate', startDate);
    } else {
      myUrlWithParams.searchParams.append('startdate', startDate);
      myUrlWithParams.searchParams.append('enddate', endDate);
    }

    if (activity) {
      myUrlWithParams.searchParams.append('activity', activity);
    }
    if (userid) {
      myUrlWithParams.searchParams.append('userid', userid);
    }
    myUrlWithParams.searchParams.append('table_name', tableName);

    if (value == 'excel') {
      myUrlWithParams.searchParams.append('export_csv', false);
    }
    if (value == 'csv') {
      myUrlWithParams.searchParams.append('export_csv', true);
    }

    let url = myUrlWithParams.href;
    window.open(url);
  };

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };

  auditHighlight = () => {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    let req = {
      identification: '10.10.16.30',
      source_system: 'cpv',
      transactionid: '20200813161038.066',
      // username: this.state.user ? this.state.user.value : "",
      startdate:
        this.state.selectedDate.length > 0 && this.state.selectedDate[0]
          ? this.state.selectedDate[0]
          : '2021-09-01',
      enddate:
        this.state.selectedDate.length > 0 && this.state.selectedDate[1]
          ? this.state.selectedDate[1]
          : today.toISOString().slice(0, 10),
      order_by_col: this.state.colSort,
      order_by_type: this.state.sortState,
      // activity:this.state.eventType ? this.state.eventType.value : '',
    };
    if (this.state.eventType) {
      req['activity'] = this.state.eventType
        ? this.state.eventType.value
        : '';
    }
    if (this.state.user) {
      req['username'] = this.state.user ? this.state.user.value : '';
    }

    auditDataChange(req).then((res) => {
      let antdDataTable = [];
      res.data.forEach((item, key) => {
        let antdObj = {};
        let val11 = item.delta.toString();
        antdObj['key'] = key;
        antdObj['user_id'] = item.user_id;
        antdObj['activity'] = item.activity;
        antdObj['old_value'] = item.old_value;
        antdObj['entry_date'] = item.entry_date;
        antdObj['table_name'] = item.table_name;
        antdObj['reason'] = item.reason;
        if (val11 === item.new_value) {
          antdObj['new_value'] = (
            <p style={{ background: 'yellow' }}>{item.new_value}</p>
          );
        } else if (item.activity === 'U' && item.delta.length > 0) {
          let val = '';
          item.delta.forEach((item1) => {
            if (val.length > 0) {
              let val1 = val.replace(
                item1,
                `<span style='background-color:yellow'>${item1}</span>`
              );
              val = val1;
            } else {
              let val1 = item.new_value.replace(
                item1,
                `<span style='background-color:yellow'>${item1}</span>`
              );
              val = val1;
            }
          });
          antdObj['new_value'] = (
            <p dangerouslySetInnerHTML={{ __html: val }}></p>
          );
        } else {
          antdObj['new_value'] = item.new_value;
        }
        antdDataTable.push(antdObj);
      });
      this.setState({
        tableData: antdDataTable,
        downloadData: this.state.tableData,
      });
    });
  };
  loadEventFilter = (_filterId, _filter) => {
    let _req = {
      appId: 'MDH_APP',
      filterId: _filterId,
      q: '',
      filters: _filter ? _filter : [],
    };
    loadFilter(_req)
      .then((res) => {
        let eventlist = res.data;
        this.setState({
          eventList: eventlist,
        });
      })
      .catch((error) => {
        if (error && error.message)
          console.log('Warning', error.message);
      });
  };

  search = (value) => {
    console.log(value);
    const { tableData } = this.state;
    const filterTable = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable });
  };

  searchTable = (value) => {
    const { tableData1 } = this.state;
    const filterTable1 = tableData1.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable1 });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visibleMenuSettings: flag });
  };

  onChangeCheckbox = (e) => {
    var checkedColumns = this.state.checkedColumns;
    if (e.target.checked) {
      checkedColumns = checkedColumns.filter((id) => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkedColumns.push(e.target.id);
    }

    var filtered = this.state.initialColumns;
    for (var i = 0; i < checkedColumns.length; i++)
      filtered = filtered.filter((el) => {
        return el.dataIndex !== checkedColumns[i];
      });

    this.setState({ columns: filtered, checkedColumns: checkedColumns });
  };

  onChangeIng = (e, value) => {
    if (value !== null) {
      let userarr = [];
      userarr.push({
        field: 'user_id',
        operator: 'IN',
        value: [value.value.trim()],
      });
      filterIng = userarr;
    }
  };

  onChangePkg = (e, value) => {
    if (value !== null) {
      let arr = [];

      arr.push({
        field: 'entry_date',
        operator: 'Between',
        value: value,
      });
      this.setState({ filterPkg: arr });
    }
  };

  handleFilter = () => {
    this.setState({ filterTable: null });
    this.auditHighlight();
  };
  handleFilterPkg = () => {
    this.esgTablePackaging(this.state.filterPkg);
  };

  handleClear = () => {
    this.setState(
      {
        selectedBrand: '',
        selectedProduct: '',
        selectedQuestion: '',
        selectedAns: '',
        user: '',
        daterange: [],
        selectedDate: [],
        eventType: '',
        filterTable: null,
      },
      () => this.auditHighlight()
    );

    // this.auditDateTable();
    let userReq = {
      //appId: "CPV",
      appId: 'MDH_APP',
      filterId: 'bms_user_filter',
      q: '',
    };
    loadFilter(userReq).then((res) => {
      let userList = res.data;
      this.setState({
        userList: userList,
      });
    });
  };

  handleClearPkg = () => {
    this.setState({
      selectedBrandPkg: '',
      selectedProductPkg: '',
      selectedQuestionPkg: '',
      selectedAnsPkg: '',
    });
    this.esgTablePackaging();
  };
  handleAutoCompleteChange = (state, evt, value) => {
    if (evt) {
      if (value === null) {
        value = { label: '', value: '' };
      } else {
        this.setState({
          user: value,
        });
      }
    }
  };

  render() {
    const { RangePicker } = DatePicker;
    const { filterTable, tableData, columns, columnConfig } = this.state;

    const userMenu = (
      <Menu>
        <Menu.Item key='1' onClick={() => this.getExcelFile('excel')}>
          Excel
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='2' onClick={() => this.getExcelFile('csv')}>
          CSV
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className='divFilterDrop bg-white'>
          <div className='filter-header' style={{ height: '150px' }}>
            <div className='divFilter-name'>
              <Text>Date</Text>
              <Text style={{ marginLeft: '15px' }}>User</Text>
              <Text>Event Type</Text>
            </div>
            <div className='divFilter'>
              <Space>
                <RangePicker
                  value={this.state.daterange}
                  onChange={(e, value) => {
                    this.setState({
                      selectedDate: value,
                      type: 'date',
                      daterange: e,
                    });
                    this.onChangePkg(e, value);
                  }}
                  disabledDate={this.disabledDate}
                />
              </Space>
              <Space>
                <Select
                  style={{
                    width: '150px',
                    marginLeft: '20px',
                  }}
                  placeholder='User'
                  onChange={(e, value) => {
                    return (
                      this.setState({
                        type: 'user',
                        user: value,
                      }),
                      this.onChangeIng(e, value, 'user')
                    );
                  }}
                  value={this.state.user}
                >
                  {this.state.userList.map((item, i) => {
                    return (
                      <Option value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              </Space>
              <Space>
                <Select
                  style={{ width: '150px' }}
                  placeholder='Event'
                  onChange={(e, value) => {
                    return this.setState({
                      eventType: value,
                    });
                  }}
                  value={this.state.eventType}
                >
                  {this.state.eventList.map((item, i) => {
                    return (
                      <Option value={item.value}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              </Space>
            </div>
            <div className='divFilter-second'>
              <Button
                style={{
                  backgroundColor: '#495fc3',
                  color: '#ffffff',
                  width: '100px',
                }}
                type='primary'
                onClick={() => {
                  this.handleFilter();
                }}
              >
                Filter
              </Button>
              <Button
                style={{
                  backgroundColor: '#495fc3',
                  color: '#ffffff',
                  width: '100px',
                }}
                type='primary'
                className='simulate-btn'
                onClick={() => {
                  this.handleClear();
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          <div
            className='custom-table-card'
            style={{ margin: '10px 0' }}
          >
            <div className='table-header'>
              <div>
                <p>Audit Trail Report</p>
              </div>
              <div
                style={{
                  marginLeft: '100px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Input.Search
                  className='table-search'
                  placeholder='Search by...'
                  enterButton
                  onSearch={this.search}
                />
              </div>
              <div
                style={{
                  marginTop: '10px',
                  float: 'right',
                  marginRight: '10px',
                }}
              >
                <Dropdown
                  style={{ color: '#ffffff' }}
                  overlay={userMenu}
                >
                  <Button
                    style={{
                      backgroundColor: '#495fc3',
                      color: '#ffffff',
                    }}
                    type='primary'
                  >
                    Export
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Table
              style={{ margin: '20px' }}
              loading={this.state.loading}
              size='small'
              columns={columns}
              dataSource={
                filterTable === null ? tableData : filterTable
              }
              scroll={{ x: 400 }}
              bordered
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AuditTrials;
