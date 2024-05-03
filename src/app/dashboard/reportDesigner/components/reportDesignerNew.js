/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router';
import {
  Form,
  Select,
  Button,
  Modal,
  Table,
  Input,
  message,
} from 'antd';
import ChartSelector from './reportDesignerFilter/chartSelector';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections'
import './stylesNew.scss';
import { getViews, getCharts, saveReportDesign, getReports } from '../../../../services/reportDesignerServices';
import SaveModal from '../../../../components/SaveModal/saveModal'
import { useDispatch } from 'react-redux';
import { sendReport, screenChange } from '../../../../duck/actions/reportDesignerAction';
import { showLoader, hideLoader, showNotification } from '../../../../duck/actions/commonActions';
import Signature from '../../../../components/ElectronicSignature/signature'
import queryString from "query-string";


//Columns For The view Selection modal
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

function ReportDesignerNew() {

  const { Option } = Select;
  const location = useLocation()

  const [loading, setLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [reportName, setReportName] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popvisible, setPopVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [viewId, setViewId] = useState('');
  const [reportId, setReportId] = useState('');
  const [viewVersion, setViewVersion] = useState('');
  const [viewIdVersion, setViewIdVersion] = useState('');
  const [selectedChartList, setSelectedChartList] = useState([]);
  const [status, setStatus] = useState('');
  const [viewList, setViewList] = useState('');
  const [chartList, setChartList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [formData, setFormData] = useState({});
  const [mainJson, setMainJson] = useState({});
  const [isPublish, setIsPublish] = useState(false);
  const [params, setParams] = useState(false)
  const [publishResponse, setPublishResponse] = useState({});
  const [approveReject, setApproveReject] = useState('')
  const [form] = Form.useForm();


  const dispatch = useDispatch();

  // const savedData = useSelector((state) => state.reportDesignerReducer);


  useEffect(() => {
    const params = queryString.parse(location.search);

    if (Object.keys(params).length > 0) {
      dispatch(showLoader())
      unloadUrl(params)
    }

    getViewsList();
    getReportList();
  }, []
  );

  useEffect(() => { form.resetFields() }, [formData]);

  const unloadUrl = async (params) => {
    try {
      dispatch(showLoader())
      setParams(true);
      let data = await getReportData(params.id, 'AWAP')
      setReportId(params.id)
      if (data) {
        unLoadJson(data)
        setTimeout(() => {
          setIsLoad(true);
          setVisible(false)
          setPopVisible(false);
          dispatch(hideLoader())
        }, 2000)
      }
      else {
        dispatch(hideLoader())
        dispatch(showNotification('error', "Error in loading data"))
      }
    }
    catch (err) {
      dispatch(showNotification('error', err))
    }
  }

  const checkChanges = (reportData, mainJson) => {

    let json_data = reportData
    let jayson = mainJson

    json_data = json_data[0] ? json_data[0] : []
    json_data = json_data['layout_info'] ? json_data['layout_info'] : {}

    if (Object.keys(json_data).length > 0 && Object.keys(jayson).length > 0) {
      return true
    }
    else if (Object.keys(json_data).length == 0 && Object.keys(jayson).length == 0) {
      return true
    }
    else if (Object.keys(json_data).length == 0 && Object.keys(jayson).length > 0) {
      return true
    }
    else
      return false
  };

  const mapViewList = viewList && viewList.length > 0 ? viewList : []
  const mapReportList = reportList && reportList.length > 0 ? reportList : []

  const OnNewClick = () => {
    setIsNew(true);
    setIsLoad(false);
    setFormData({})
    setSelectedChartList([])
    setReportName('')
    setViewVersion('')
    setReportId('')
    setViewId('')
    setViewIdVersion('')
    setStatus('NEW')
    setChartList([])
  }



  const onOk = async () => {
    const unloadResponse = await unLoadJson(reportData);
    if (unloadResponse) {
      dispatch(hideLoader());
      setIsLoad(true);
      setVisible(false)
      setPopVisible(false);
    }
    else {
      dispatch(hideLoader());
    }
  }


  // Get form values
  const handleValuesChange = (changedValues, values) => {
    setMainJson(convertToJson(values));
  };

  const handleClose = () => {
    setIsPublish(false)
  };

  const PublishResponse = (res) => {
    setPublishResponse(res)
    setStatus(res.rep_stauts)
  }
  //Get view table data
  const getViewsList = () => {
    let req = {};
    getViews(req).then((res) => {
      setViewList(res['Data']);
    });
  };

  const getReportList = () => {
    let req = { rep_status: 'all' };
    getReports(req).then((res) => {
      setReportList(res['Data']);
    });
  };

  // const setPublish = () => {
  //   setIsPublish(true)
  // };

  const getReportData = async (rep_id, rep_status) => {
    message.success(`${rep_id} selected`)
    let req = { rep_status: rep_status ? rep_status : 'DRFT' };
    if (rep_id)
      req['rep_disp_id'] = rep_id
    let data = await getReports(req)

    if (data['Data']) {
      setReportData(data['Data']);
      return data['Data']
    }
  };


  //Get charts based on viewId-version
  const getChartsList = (version) => {
    if (viewId.length > 0)
      setSelectedChartList([])
    message.success(`${version} selected`)
    let req = version;
    getCharts(req).then((res) => {

      if (res['status-code'] === 200)
        setChartList(res['data']);
      else
        setChartList([]);
    });
  };

  // Converting form json into layout info required by the report generator json
  const convertToJson = (json_data) => {
    let arr = {};
    let section_arr = [];
    json_data = json_data['response']
    json_data.map((item, index) => {
      let obj = {};
      obj['heading'] = item.sectionName;
      if (index == 0)
        obj['numbered'] = true;
      else
        obj['numbered'] = false;
      let content_arr = [];
      content_arr = item.dymamic_rows.map((i, index) => {
        // let objj = {};
        let key_obj = {}
        key_obj['value'] = i.value
        key_obj['editable'] = i.editable
        key_obj['id'] = index + 1
        key_obj['key'] = i.keyName

        return key_obj;
      });
      obj['content'] = content_arr;
      obj['id'] = index;

      if (index == 0)
        arr['titlepage'] = obj;
      else
        section_arr.push(obj);
    });
    arr['sections'] = section_arr;

    return arr;
  };


  // searching values in table
  const search = (value) => {
    const tableData = reportList;
    const filterTable = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };


  // Saving the json
  const PrepareJson = (formData, saveType) => {
    let check = checkChanges(reportData, formData)

    if (check) {
      let obj = {}
      obj['view_disp_id'] = viewId;
      obj['chart_int_ids'] = selectedChartList;
      obj['view_version'] = viewVersion;
      obj['rep_name'] = reportName;
      obj['rep_status'] = status;

      if (saveType == 'save_as') {
        obj['rep_disp_id'] = '';
        obj['saveType'] = saveType
      }
      if (saveType == 'save') {
        obj['rep_disp_id'] = reportId;
        obj['saveType'] = saveType
      }
      if (saveType == 'publish') {
        obj['rep_disp_id'] = reportId;
        obj['saveType'] = saveType
      }

      obj['layout_info'] = formData;
      let req = {}
      req['data'] = obj

      if (reportName.length > 0) {
        saveReportDesign(req).then((res) => {
          if (res && res['msg'] && res['msg'] == 'success') {
            setReportId(res['rep_disp_id'])
            req.data['rep_disp_id'] = res['rep_disp_id']
            setStatus(res['rep_stauts'])
            setIsSave(true)
          }
          else
            message.error('Not Saved')

        })
        
        dispatch(sendReport(req['data']))
      }
      else {
        message.error('Report Name Is Required')
      }
    }
    else {
      message.error('No Changes To Save')
      dispatch(sendReport(mainJson))
    }

  }

  // unloading the json into component readable form 
  // getting json from GET service distrupting json for each component (as required)
  const convertContent = (obj) => {

    let content_obj = obj
    let rows = []
    content_obj.map((i) => {
      let o = {}
      o['keyName'] = i.key
      o['value'] = i.value
      o['editable'] = i.editable

      rows.push(o)
    })

    return rows
  }

  const unLoadJson = async (json_data) => {
    try {
      json_data = json_data[0]

      let status = json_data['rep_status'] ? json_data['rep_status'] : ''
      setStatus(status)

      let ReportName = json_data['rep_name'] ? json_data['rep_name'] : ''
      setReportName(ReportName)

      let view = json_data['view_disp_id'] ? json_data['view_disp_id'] : ''
      setViewId(view)

      let chartList = json_data['chart_details'].length > 0 ? json_data['chart_details'] : []
      setSelectedChartList(chartList)

      let view_version = json_data['view_version'] ? json_data['view_version'].toString() : ''
      setViewVersion(view_version)
      getChartsList(view + '-' + view_version)
      setViewIdVersion(view + '-' + view_version)
      json_data = json_data['layout_info']
      if (json_data) {

        let res = []
        let layout_info = json_data ? json_data : {}
        let title_page = layout_info['titlepage'] ? layout_info['titlepage'] : {}

        let title_section = title_page['heading'] ? title_page['heading'] : {}
        let title_rows = title_page['content'] ? convertContent(title_page['content']) : {}
        let title_obj = {}
        title_obj['sectionName'] = title_section ? title_section : ''
        title_obj['dymamic_rows'] = title_rows ? title_rows : ''

        res.push(title_obj)

        let section_area = layout_info['sections'] ? layout_info['sections'] : ''

        if (section_area) {
          section_area.map((item) => {
            let section_obj = {}
            section_obj['sectionName'] = item['heading'] ? item['heading'] : ''
            section_obj['dymamic_rows'] = item['content'] ? convertContent(item['content']) : ''
            res.push(section_obj)
          })
          let form_res = {}
          form_res['response'] = res
          setFormData(form_res)
          form.setFieldsValue(form_res);
          return true
        }
        else {
          setFormData({})
          form.setFieldsValue({});
          return true
        }
      }
      else {
        setFormData({})
        form.setFieldsValue({});
        setViewId('')
        setSelectedChartList([])
        setViewIdVersion('')
        setChartList([])
        return false
      }
    }
    catch
    {
      dispatch(showNotification('error', 'Loading Data.....'));
    }
  }

  const isStyledDifferently = (rowObject, index) => {
    return rowObject.isActive ? true : false;
  }

  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Report Designer</span>
        </div>
        <div className='sub-header-btns'>
          {isLoad || params ? <> </> : (
            <Button
              className='custom-primary-btn'
              onClick={() => OnNewClick()}
            >
              New
            </Button>)}
          {!params ?
            <Button
              className='custom-primary-btn'
              onClick={() => { setVisible(true); setIsNew(false); }}
            >
              Load
            </Button> : <></>
          }
          {
            (isLoad || isNew) && !params ?
              <>
                <Button
                  className='custom-primary-btn'
                  onClick={() => {
                    PrepareJson(mainJson, 'save')
                  }}
                >

                  Save
                </Button>
                {isLoad ?
                  <Button
                    className='custom-primary-btn'
                    onClick={() => {
                      PrepareJson(mainJson, 'save_as')
                    }}
                  >

                    Save As
                  </Button> : <></>}
                <Button
                  className='custom-primary-btn'
                  onClick={() => dispatch(screenChange(true))}
                >
                  Test
                </Button>
                <Button
                  className="custom-secondary-btn"
                  onClick={() => setIsPublish(true)}
                >
                  Publish
                </Button> </>
              : <> </>
          }
          {
            params ? <div>
              <Button
                className='custom-primary-btn'
                onClick={() => { setIsPublish(true); setApproveReject('A') }}
              >
                Approve
              </Button>
              <Button
                className="custom-secondary-btn"
                onClick={() => { setIsPublish(true); setApproveReject('R') }}
              >
                Reject
              </Button> </div> : <></>
          }

        </div>
      </div>

      <div className='custom-content-layout'>
        <ReportDesignerForm
          setViewId={setViewId}
          viewList={viewList}
          setStatus={setStatus}
          status={status}
          isLoad={isLoad}
          reportName={reportName}
          setReportName={setReportName}
          viewVersion={viewVersion}
          setViewVersion={setViewVersion}
          reportId={reportId}
          viewIdVersion={viewIdVersion}
          setViewIdVersion={setViewIdVersion}
          getChartsList={getChartsList}
          mapViewList={mapViewList}
          show={params}
        />

        {(isLoad || isNew) && loading == false ?
          <div className="reportDesigner-grid-tables">
            <ChartSelector
              selectedChartList={selectedChartList}
              setSelectedChartList={setSelectedChartList}
              viewVersion={viewVersion}
              viewID={viewId}
              chartList={chartList}
              show={params}
            />
            <Form
              className="report-form"
              name="report-generator-form"
              form={form}
              onValuesChange={handleValuesChange}
              initialValues={formData}
            >
              <ReportDesignerDynamicSections formData={formData} show={params} />
            </Form>

          </div> :
          <></>
        }
        <Modal
          title="Select Report"
          visible={visible}
          onCancel={() => setVisible(false)}
          width={500}
          style={{ marginRight: '800px' }}
          footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() =>
            onOk()
          }>OK</Button>,]}

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
          title={<p>Select Report  <Input.Search
            className='table-search'
            placeholder='Search by...'
            enterButton
            onSearch={search}
            style={{ borderRadius: '4px' }}
          /></p>}
          centered
          width={500}
          footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() => {
            dispatch(showLoader());
            onOk()
          }}>OK</Button>,]}
        >
          <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
            rowHighlightTest={isStyledDifferently}
            dataSource={filterTable === null ? reportList : filterTable}
            columns={columns}
            onRow={record => ({
              onClick: e => {
                record['color'] = '#D3D3D3'
                setReportId(record.rep_disp_id)
                getReportData(record.rep_disp_id, record.rep_status)
                dispatch(showLoader())
                // onOk()
              }
            })}
            scroll={{ y: 200 }}
            size='small'
            pagination={false}
          />
        </Modal>
        <SaveModal isSave={isSave} setIsSave={setIsSave} id={reportId} />

      </div>
      <Signature isPublish={isPublish} handleClose={handleClose} screenName="Report Designer" PublishResponse={PublishResponse} appType="REPORT" dispId={reportId} version={0} status={approveReject} />
    </div>
  );
}

export default ReportDesignerNew;
