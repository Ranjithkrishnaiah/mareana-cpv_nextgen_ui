import React, { Component } from 'react';
// import NotificationMessage from '../../../../../utilities/snackbarComponent/components/MySnackbarComponent';
import './styles.scss';
// import WorkBook from '../../../../../utilities/WorkBook';
// import Workbook from 'react-excel-workbook';
import { returnData } from '../../../../duck/actions/tableViewAction';
import { loadFilter } from '../../../../duck/actions/filterAction';

import { Input, Table, Dropdown, Menu, Checkbox, Space, Button } from 'antd';
import SelectField from '../../../../components/SelectField/SelectField';

class FailureReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            loading: false,
            selectedIssueType: '',
            showLoader: false,
            feedback: '',
            dataGrid: {
                columns: [],
                rows: [],
                totalRecord: null,
                pageNumber: 0,
                pageOffset: null,
                selectedIndexes: [],
            },
            toastMessage: '',
            toastOpen: false,
            downloadData: [],
            initialColumns: [],
            checkedColumns: [],
            filterTable: null,
            selectedEvent: '',
            toastVariant: '',
            selectedDate: '',
            eventList: [],
            visibleMenuSettings: false,
            columnConfig: [],
            columns: [],
            tableData: [],
            componentList: [],
            selectedComponent: '',
        };
    }

    componentDidMount = () => {
        this.loadTableData();
        this.loadFilters('func_area');
        this.loadComponentFilter('component_error_filter');
    };

    createFilter() {
        let filter = [];
        const { selectedEvent, selectedComponent } = this.state;
        filter = [
            {
                field: 'func_area',
                value: selectedEvent.value ? [selectedEvent.value] : [],
                operator: 'Equals',
            },
            {
                field: 'origin_component',
                value: selectedComponent.value ? [selectedComponent.value] : [],
                operator: 'Equals',
            },
        ];
        return filter;
    }

    loadFilters = (_filterId, _filter) => {
        let _req = {
            appId: 'BMS',
            filterId: _filterId,
            q: '',
            filters: _filter ? _filter : [],
        };
        loadFilter(_req)
            .then((res) => {
                console.log(res, 'nodelist');
                let eventlist = res;

                this.setState({
                    eventList: eventlist,
                });
            })
            .catch((error) => {
                if (error && error.message)
                    console.log('Warning', error.message);
            });
    };
    loadComponentFilter = (_filterId, _filter) => {
        let _req = {
            appId: 'BMS',
            filterId: _filterId,
            q: '',
            filters: _filter ? _filter : [],
        };
        loadFilter(_req)
            .then((res) => {
                console.log(res, 'nodelist');
                let eventlist = res;

                this.setState({
                    componentList: eventlist,
                });
            })
            .catch((error) => {
                if (error && error.message)
                    console.log('Warning', error.message);
            });
    };

    loadTableData = (_filter, pageNo, pageOffset) => {
        this.setState({ loading: true });
        let reqObj = {
            appId: 'BMS',
            filters: _filter ? _filter : [],
            metadata: true,
            pageSize: 10,
            pageNumber: pageNo ? pageNo : 0,
            resultsetId: 'plat_system_error_data',
        };
        if (pageOffset) {
            reqObj['pageOffset'] = pageOffset;
        }
        returnData(reqObj)
            .then((res) => {
                const _response = res || {};
                const configMes = res.config;

                console.log(_response, 'tableresponse');
                if (_response.error) {
                    this.setState({
                        toastOpen: true,
                        toastMessage: _response.message,
                        toastVariant: 'error',
                    });
                } else {
                    let dataGrid = {
                        totalRecord: _response.data.filteredRecord,
                        pageNumber: _response.data.pageNumber,
                        pageOffset: _response.data.pageOffset,
                    };
                    this.setState({
                        dataGrid,
                        tableData: _response.data.content,
                        columnConfig: configMes,
                        loading: false,
                    });
                    this.updateTableColumn(configMes);
                }
            })
            .catch((err) => {
                this.setState({
                    toastOpen: true,
                    toastMessage: err.message,
                    toastVariant: 'error',
                });
            });
    };
    handleChangePage(evt, pageNumber) {
        let dataGrid = { ...this.state.dataGrid };

        dataGrid.pageNumber = pageNumber;
        dataGrid.pageOffset = pageNumber * 10;
        this.setState({
            dataGrid,
            selectedRecords: [],
        });

        this.loadTableData([], pageNumber, pageNumber * 10);
    }

    updateTableColumn = (config) => {
        let columns = [];
        config.map((i) => {
            let { displayName, fieldName } = i;
            if (i.visible) {
                let obj = {
                    title: displayName,
                    dataIndex: fieldName,
                    key: i.id,
                    sorter: (a, b) => {
                        return a.fieldName === null ||
                            a.fieldName === undefined ||
                            a.fieldName === ''
                            ? -1
                            : b.fieldName === null ||
                              b.fieldName === undefined ||
                              b.fieldName === ''
                                ? 1
                                : a.fieldName.toString().localeCompare(b.fieldName);
                    },
                };
                columns.push(obj);
            }
        });
        console.log(columns);
        this.setState({
            columns: columns,
        });
    };
    onChangeOutput = (e, table) => {
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
        this.setState({ columns: filtered, checkedColumns });
    };

    applyFilter = (event) => {
        this.setState({ filterTable: null });
        let filter = this.createFilter();
        this.loadTableData(filter);
    };

    clearFilter = (event) => {
        const { selectedEvent } = this.state;
        this.setState({
            selectedEvent: '',
            selectedComponent: '',
            filterTable: null,
        });

        // let filter = this.createFilter();
        this.loadTableData();
    };

    handleEventChange = (val) => {
        this.setState({ selectedEvent: val.value });
    };

    search = (value) => {
        const { tableData } = this.state;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        this.setState({ filterTable });
    };

    render() {
        const {
            toastOpen,
            toastMessage,
            showLoader,
            columns,
            toastVariant,
            eventList,
            tableData,
            selectedEvent,
            columnConfig,
            filterTable,
            dataGrid,
            componentList,
        } = this.state;

        return (
            <div>
                <Space className='app-panel'>
                    <SelectField
                        label='Area'
                        onChangeSelect={(e, value) => {
                            return this.setState({
                                selectedEvent: value,
                            });
                        }}
                        selectList={eventList.map((item) => item.value)}
                        selectedValue={this.state.selectedEvent}
                    />
                    <SelectField
                        label='Component'
                        onChangeSelect={(e, value) => {
                            return this.setState({
                                selectedComponent: value,
                            });
                        }}
                        selectList={componentList.map((item) => item.value)}
                        selectedValue={this.state.selectedComponent}
                    />
                    <Button
                        type='primary'
                        className='mg-top-20 '
                        onClick={this.applyFilter.bind(this)}
                    >
                        Apply
                    </Button>
                    <Button
                        className='mg-top-20 '
                        onClick={this.clearFilter.bind(this)}
                    >
                        Clear
                    </Button>
                </Space>
                <div className='custom-table-card' style={{ margin: '10px 0' }}>
                    <div className='table-header'>
                        <div>
                            <p>System Error</p>
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
                            {/* <Workbook
                                filename='system_error.xlsx'
                                element={
                                    <Button
                                        style={{
                                            background: '#495fc3',
                                            color: '#ffffff',
                                        }}
                                    >
                                        {' '}
                                        Export
                                    </Button>
                                }
                            >
                                <Workbook.Sheet
                                    data={
                                        filterTable === null
                                            ? tableData
                                            : filterTable
                                    }
                                    name='Sheet A'
                                >
                                    {columns.map((i) => (
                                        <Workbook.Column
                                            label={i.title}
                                            value={i.dataIndex}
                                        />
                                    ))}
                                </Workbook.Sheet>
                            </Workbook> */}
                        </div>
                    </div>
                    <Table
                        loading={this.state.loading}
                        size='small'
                        columns={columns}
                        dataSource={
                            filterTable === null ? tableData : filterTable
                        }
                        scroll={{ x: 400 }}
                        bordered
                        pagination={false}
                    />
                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='ReactDataGrid'
                        count={dataGrid.totalRecord}
                        rowsPerPage={10}
                        page={dataGrid.pageNumber}
                        onChangePage={this.handleChangePage.bind(this)}
                        // onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> */}
                </div>
            </div>
        );
    }
}
export default FailureReport;
