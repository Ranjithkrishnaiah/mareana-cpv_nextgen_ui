/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir 
*/


import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    Typography,
    Checkbox,
    Modal,
    Radio,
    Space,
    Select,
    message,
    Input,
    Table
} from 'antd';
import { ArrowLeftOutlined, BlockOutlined } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../../../services/reportDesignerServices';
import ReportDesignerForm from '../components/reportGeneratorHeader';
import { sendReport, screenChange } from '../../../../duck/actions/reportDesignerAction';
import { saveReportGenerator, getReportGenerator } from '../../../../services/reportGeneratorServices';
import SaveModal from '../../../../components/SaveModal/saveModal'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../duck/actions/commonActions';



const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select

const columns = [
    {
        title: 'Report ID',
        dataIndex: 'rep_disp_id',
        key: 'rep_disp_id',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
    {
        title: 'Report Name',
        dataIndex: 'rep_name',
        key: 'rep_name',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },

    },
    {
        title: 'Report Status',
        dataIndex: 'rep_status',
        key: 'rep_status',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
    {
        title: 'Created By',
        dataIndex: 'created_by',
        key: 'created_by',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
];


function ReportGenerator() {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
    );

    function onChange(checkedValues, i) {
        update_object(checkedValues, i)
    }


    const [visible, setVisible] = useState(false)
    const [isvisible, setIsVisible] = useState(false)
    const [ReportData, setReportData] = useState(repotData)
    const [chart, setCharts] = useState([])
    const [table, setTable] = useState([])
    const [schedule, setSchedule] = useState('')
    const [emailList, setEmailList] = useState([])
    const [isSave, setIsSave] = useState(false);    // const [selectedUser, setSelectedUser] = useState(false)
    const [reportId, setReportId] = useState('')
    const [reportName, setReportName] = useState('')
    const [reportStatus, setReportStatus] = useState('')
    const [reportList, setReportList] = useState('')
    const [popvisible, setPopVisible] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [viewId, setViewId] = useState('')
    const dispatch = useDispatch();


    useEffect(() => {
        unloadTest(ReportData)
    }, [ReportData]
    );

    useEffect(() => {
        getReportList()
    }, []
    );

    const getReportList = () => {
        let req = { rep_status: 'all' };
        getReports(req).then((res) => {
            setReportList(res['Data']);
        });
    };

    const mapReportList = reportList && reportList.length > 0 ? reportList : []

    const createArraObj = (arr) => {
        let res = []
        arr.map((i) => {
            let chart = {}
            chart['chart'] = i
            chart['excursion'] = false
            chart['violation'] = false
            chart['parameter'] = false
            chart['exclusion'] = false

            res.push(chart)
        })
        return res
    }

    const radioSchedule = (e) => {
        setSchedule(e.target.value);
    };

    const handleChange = selectedItems => {
        setEmailList(selectedItems);
    };


    const getTableData = (obj) => {

        let headingList = []
        let allSections = []

        let titleHeading = obj['titlepage'] && obj['titlepage'].heading ? obj['titlepage'].heading : ''
        let titleObj = obj && obj['titlepage'] ? obj['titlepage'] : ''

        headingList.push(titleHeading)
        allSections.push(titleObj)

        let headingSection = obj['sections'] ? obj['sections'] : []
        allSections = [...allSections, ...headingSection]
        // headingSection.map((i) => {
        //     if (i.heading)
        //         headingList.push(i.heading)
        // })

        return allSections
    }

    // const convertToList =  (a) =>
    // {   if(a.length > 0)
    //     {
    //     let b= a.replace("{",'')
    //     b= b.replace("}",'')
    //     b=b.split(',')
    //     if(b.length>0)
    //     return b
    //     else
    //     return []
    //     }
    // }

    const unloadTest = (ReportData) => {
        dispatch(showLoader())
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setCharts(ReportData['chart_int_ids'] ? createArraObj(ReportData['chart_int_ids']) : [])
        setTable(ReportData['layout_info'] ? getTableData(ReportData['layout_info']) : {})
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
        setEmailList(ReportData.share ? ReportData.share.email_list : [])
        setSchedule(ReportData.share ? ReportData.share.frequency_unit : '')
        dispatch(hideLoader());
        // setViewId(ReportData['view_disp_id'] && ReportData['view_version'] ? ReportData['view_disp_id'] + '-' + ReportData['view_version'] : '')
    }

    const update_object = (arr, i) => {

        let objIndex = chart.findIndex((chart => chart.chart == i));
        if (arr.includes('excursion'))
            chart[objIndex].excursion = true
        else
            chart[objIndex].excursion = false
        if (arr.includes('violation'))
            chart[objIndex].violation = true
        else
            chart[objIndex].violation = false
        if (arr.includes('parameter'))
            chart[objIndex].parameter = true
        else
            chart[objIndex].parameter = false
        if (arr.includes('exclusion'))
            chart[objIndex].exclusion = true
        else
            chart[objIndex].exclusion = false

        let object = chart
        setCharts(object)

        // obj.forEach((item, i) => {
        //     let res=[]
        //         for(let key in item) {
        //           if(item[key]==true)
        //             res.push(key)
        //         }
        //     item['default']=res
        //      });

    }

    const prepareJson = () => {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        let time_today = h + ":" + m + ":" + s;

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let date_today = year + '-' + month + "-" + day

        let obj = {}
        let user_details = JSON.parse(localStorage.getItem('user_details'))
        let user = user_details["username"] ? user_details["username"] : ''

        obj['rep_disp_id'] = reportId
        obj['rep_name'] = reportName
        obj['rep_status'] = reportStatus
        obj['user'] = user
        obj['variant_name'] = user + '_variant'
        obj['chart_info'] = { charts: chart }


        let share_obj = {}
        share_obj['frequency_unit'] = schedule
        share_obj['email_list'] = emailList
        share_obj['scheduled_start'] = date_today + ' ' + time_today
        share_obj['scheduled_end'] = '2022-04-03 09:50:22'
        share_obj['frequency'] = '1'


        let layout_obj = {}
        layout_obj['titlepage'] = table[0] ? table[0] : {}
        layout_obj['sections'] = table.length > 0 ? table.filter((item, index) => index > 0) : []

        obj['layout_info'] = layout_obj
        obj['share'] = share_obj

        let req = {}
        req['data'] = obj
        req['saveType'] = 'save'

        saveReportGenerator(req).then((res) => {
            if (res.Status == 200) {
                setIsSave(true)
            }
            else {
                dispatch(showNotification('Not Saved'))
            }
        })
    }

    const search = (value) => {
        const tableData = reportList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    };

    const getReportData = async (rep_id) => {

        message.success(`${rep_id} selected`)
        dispatch(showLoader());
        let user_details = JSON.parse(localStorage.getItem('user_details'))
        let user = user_details["username"] ? user_details["username"] : ''
        let req = { username: user, report_id: rep_id };
        try {

            let response = await getReportGenerator(req)
            if (response.Status == 404) {
                dispatch(showNotification("error", 'No Data for this variant'))
                dispatch(hideLoader());
            }
            else {
                dispatch(sendReport(response))
                unloadTest(response)
                dispatch(hideLoader());
            }

        }
        catch (err) {
            dispatch(hideLoader());
            dispatch(showNotification('error', err));
        }
    }



    const handleEdit = (value, heading, k) => {
        let objIndex = table.findIndex((t => t.heading == heading));

        if (objIndex >= 0) {
            if (table[objIndex].content.length > 0) {
                let cntnt_Index = table[objIndex].content.findIndex((t => t.key == k));
                table[objIndex].content[cntnt_Index].value = value
            }
        }
    }



    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Report Generator</span>
                </div>

                <div className='sub-header-btns'>
                    <Button className='custom-primary-btn' onClick={() => { setIsVisible(true); }}>
                        Load
                    </Button>
                    <Button className='custom-primary-btn' onClick={() => prepareJson()}>
                        Save
                    </Button>
                    <Button className='custom-secondary-btn' onClick={() => dispatch(screenChange(false))}>
                        Generate
                    </Button>
                </div>
            </div>
            <div className='custom-content-layout'>
                <ReportDesignerForm />
                <div className="chart-schedule-card">
                    <Card className="card-chart" title="Chart">
                        {chart && chart.map((i) => {
                            return (
                                <Collapse key={i.chart} accordion style={{ width: '500px' }} bordered={false} expandIconPosition='right'>
                                    <Panel header={i.chart} key={i.chart} className="chart-panel" >
                                        <Checkbox.Group style={{ width: '100%' }} defaultValue={i.default} onChange={(checkedValue) => onChange(checkedValue, i.chart)}>
                                            <table className="table" >
                                                <tbody>
                                                    <tr style={{ backgroundColor: '#F1F7FF' }} className="tr">
                                                        <th className="th">
                                                            Select
                                                        </th>
                                                        <th className="th">
                                                            Chart Data
                                                        </th>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="excursion" checked={i.excursion} /></td>
                                                        <td className="td">Excursion/Shift/Trend</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td"><Checkbox value="violation" /></td>
                                                        <td className="td">Rule Violation</td>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="parameter" /></td>
                                                        <td className="td">Parameters</td>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="exclusion" /></td>
                                                        <td className="td">Exclusions</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Checkbox.Group>
                                    </Panel>
                                </Collapse>)
                        })}

                    </Card>
                    <Card title="Share" className="card-schedule">
                        <div className="schedule">
                            <div>
                                <Text>Schedule</Text><br /><br />
                                <Button onClick={() => { setVisible(true) }} >Click To Select Schedule</Button>
                            </div>
                            <div>
                                <Card title="Recipients" className="card-recipients">
                                    {emailList && emailList.map(function (item, i) {
                                        return <p>{item}</p>
                                    })}
                                </Card>
                            </div>
                        </div>

                    </Card>
                </div>
                <Card title="Table" className="table-card">
                    {table.length > 0 && table.map((i) =>

                        <Collapse key={i.heading} accordion className="chart-panel" expandIconPosition="right">
                            <Panel header={i.heading} key={i.heading} className="chart-panel">
                                {/* <span class="Legend-colorBox" style={{ backgroundColor: '#BAE7FF', marginRight: '10px', marginLeft: '1070px', fontSize: '12px' }}>
                                </span> */}
                                <div >
                                <i class="fa fa-circle" style={{ color: '#BAE7FF', marginRight: '10px', marginLeft: '1070px', fontSize: '18px' }}></i>
                                <span class="Legend-label" style={{ marginBottom: '10px', fontSize: '12px' }}>
                                    Edit
                                </span>
                                <i class="fa fa-circle" style={{ color: '#F5F5F5', marginLeft: '25px', fontSize: '18px' }}></i>
                                <span class="Legend-label" style={{ marginLeft: '10px', fontSize: '12px' }}>
                                    View Only
                                </span>
                                </div>
                                <table className="table">
                                    <tr className="tr" align= "right"  style={{backgroundColor:'#f1f7ff'}} >
                                        <td className="td">
                                            <b>Key</b>
                                        </td>
                                        <td className="td">
                                            <b>Value</b>
                                        </td>
                                    </tr>
                                    <tbody>
                                        {i['content'] && i['content'].map((item, j) =>
                                            // return Object.entries(item).map((k, value) => {

                                            <tr className="tr" style={{backgroundColor : item.editable==false || item.editable == undefined ? '#BAE7FF' : '#F5F5F5'}}>
                                                <td className="td" ><b>{item.key}</b></td>
                                                <td className="td">{item.editable == false || item.editable == undefined ? <Input.TextArea style={{width:'200px'}} defaultValue={item.value} onChange={(e) => handleEdit(e.target.value, i.heading, item.key)} /> : item.value} </td>
                                            </tr>
                                            // })

                                        )}
                                    </tbody>
                                </table>
                            </Panel>
                        </Collapse>
                    )}
                </Card>
                <Card title="Charts" style={{ marginTop: '10px' }}>
                </Card>
                <Card title="Data" style={{ marginTop: '10px' }}>
                    <Collapse accordion>
                        <Panel header="Excrusion Shift Trend" key="3">
                            <p></p>
                        </Panel>
                        <Panel header="Parameters" key="1">
                            <p></p>
                        </Panel>
                        <Panel header="Exclusion" key="2">
                            <p></p>
                        </Panel>
                    </Collapse>
                </Card>

                <Modal
                    title="Schedule"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={() => setVisible(false)}
                >
                    <Radio.Group onChange={radioSchedule} >
                        <Space direction="vertical">
                            <Radio value="Hourly">Hourly</Radio>
                            <Radio value="Monthly">Monthly</Radio>
                            <Radio value="Daily">Daily</Radio>
                        </Space>
                    </Radio.Group> <br /> <br />

                    <Text>Users</Text> <br/>
                    <Select
                        mode="tags"
                        style={{ width: '50%', marginTop: '10px' }}
                        placeholder="Select Users"
                        optionLabelProp="label"
                        value={emailList}
                        onChange={handleChange}

                    >
                        <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                            mihir.bagga@mareana.com
                        </Option>
                        <Option value="muskan.gupta@mareana.com" label="muskan.gupta@mareana.com">
                            muskan.gupta@mareana.com
                        </Option>
                        <Option value="binkita.tiwari@mareana.com" label="binkita.tiwari@mareana.com">
                            binkita.tiwari@mareana.com
                        </Option>
                        <Option value="someswara.rao@mareana.com" label="someswara.rao@mareana.com">
                            someswara.rao@mareana.com
                        </Option>
                        <Option value="ramaa.rao@mareana.com" label="ramaa.rao@mareana.com">
                            ramaa.rao@mareana.com
                        </Option>
                        <Option value="rahul.neogi@mareana.com" label="rahul.neogi@mareana.com">
                            rahul.neogi@mareana.com
                        </Option>
                        <Option value="vishal@mareana.com" label="vishal@mareana.com">
                            vishal@mareana.com
                        </Option>
                    </Select>
                </Modal>

                <Modal
                    title="Select Report"
                    visible={isvisible}
                    onCancel={() => setIsVisible(false)}
                    width={500}
                    style={{ marginRight: '800px' }}
                    footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={()=>setIsVisible(false)} key="1">OK</Button>,]}
                >
                    <Select className="filter-button" defaultValue={reportId} onChange={(e, value) => {
                        let view_value = value.value ? value.value : ''
                        setReportId(view_value)
                        getReportData(view_value)

                    }}
                        value={reportId}
                        showSearch
                        showArrow
                        style={{ backgroundColor: 'white', borderRadius: '4px' }}
                    >
                        {mapReportList.length >= 0 ? mapReportList.map((item) =>

                            <Option value={item.rep_disp_id} key={item.rep_disp_id}>{item.rep_disp_id}</Option>
                        ) : <></>}

                    </Select>
                    <Button onClick={() => setPopVisible(true)}><BlockOutlined twoToneColor="#093185" /></Button>
                </Modal>
                <Modal
                    title="Select Report"
                    visible={popvisible}
                    onCancel={() => setPopVisible(false)}
                    width={600}
                    title={<p>Select Report Variant  <Input.Search
                        className='table-search'
                        placeholder='Search by...'
                        enterButton
                        onSearch={search}
                        style={{ borderRadius: '4px' }}
                    /></p>}
                    centered
                    width={500}
                    footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() => { setIsVisible(false); setPopVisible(false) }} key="1">OK</Button>,]}
                >
                    <Table
                        // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        // rowHighlightTest={isStyledDifferently}
                        dataSource={filterTable === null ? reportList : filterTable}
                        columns={columns}
                        onRow={record => ({
                            onClick: e => {
                                record['color'] = '#D3D3D3'
                                setReportId(record.rep_disp_id)
                                getReportData(record.rep_disp_id, record.rep_status)
                                // onOk()
                            }
                        })}
                        scroll={{ y: 200 }}
                        size='small'
                        pagination={false}
                    />
                </Modal>
            </div>
            <SaveModal isSave={isSave} setIsSave={setIsSave} id={''} />
        </div>

    );
}

export default ReportGenerator;
