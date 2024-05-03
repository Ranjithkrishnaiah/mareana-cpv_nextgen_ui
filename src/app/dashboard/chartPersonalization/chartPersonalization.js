/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Binkita
 */

import './ChartStyle.scss';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import {
  getChartList,
  getChartObj,
  putChartObj,
  viewBatchData,
} from '../../../services/chartPersonalizationService';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../duck/actions/commonActions';
import {
  resetChart,
  sendBatchCoverage,
  sendChartData,
  sendChartDesc,
  sendChartMapping,
  sendChartName,
  sendChartType,
  sendChartVersion,
  sendData,
  sendDateRange,
  sendLayout,
  sendSelectedSite,
  sendUnApprovedData,
  sendViewId,
  sendViewName,
} from '../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import ChartDataTable from './components/ChartDataTable/index';
import ChartDetails from './components/ChartDetails';
import ChartFilter from './components/ChartFilter/index';
import ChartTable from '../../../components/ChartTable';
import ChartType from './components/ChartType/index';
import ChartView from './components/ChartView/index';
import LoadModal from '../../../components/LoadModal';
import Personalization from './components/Personalization/components/Personalization';
import ViewTable from '../../../components/ViewTable';
import { getViewTable } from '../../../services/commonService';

function ChartPersonalization() {
  const [visible, setVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isView, setIsView] = useState(false);
  const [displayId, setDispalyId] = useState({viewId:'', version:''});
  const [isNew, setIsNew] = useState(false);
  const [isNewBtnDisabled, setisNewBtnDisabled] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showChartType, setShowChartType] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [chartResObj, setchartResObj] = useState([]);
  const [showBatch, setshowBatch] = useState(false);
  const [viewTableData, setviewTableData] = useState([]);
  const [batchData, setbatchData] = useState({});
  const [resChartId, setresChartId] = useState('');
  const [resChartVersion, setresChartVersion] = useState('');
  const [resChartStatus, setresChartStatus] = useState('');
  const [chartTypeList, setchartTypeList] = useState([]);
  const [exclusionTableData, setExclusionTableData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const tempArrForExclude = useRef([]);
  const tempArrForData = useRef([]);
  const counterIdForExclusion = useRef(0);
  const [isChart, setIsChart] = useState(false);
  const [isLandingDisabled, setisLandingDisabled] = useState(false);
  const [isFieldEmpty, setisFieldEmpty] = useState(false);
  const [isSaveAsBtnDisabled, setisSaveAsBtnDisabled] = useState(true);
  const [isSaveBtnDisabled, setisSaveBtnDisabled] = useState(false);
  const [selectedLayout, setselectedLayout] = useState({});
  //control limits table data
  const [controlSource, setControlSource] = useState([]);
  const [specificationSource, setSpecificationSource] = useState([]);
  const [warningSource, setWarningSource] = useState([]);
  //display layout data
  const figureObj = {
    lines: false,
    lineWidth: '',
    stairCases: false,
    areaFill: '',
    areaGradient: '',
    points: false,
    alertTreshold: false,
    panelOptions: {
      title: '',
      desc: '',
      transparentBackground: ''
    }
  }
  const legendObj = {
    options: {
      show: false,
      atTable: false,
      toRight: false,
    },
    values: {
      min: false,
      max: false,
      avg: false,
      current: false,
      total: false,
      decimal: false,
    },
    hideSeries: {
      withOnlyNull: false,
      withOnlyZero: false
    }
  }
  const axesObj = {
    leftX: {
      show: false,
      unit: '',
      scale: '',
      ymin: '',
      ymax: '',
      decimal: '',
      label: '',
    },
    rightX: {
      show: false,
      unit: '',
      scale: '',
      ymin: '',
      ymax: '',
      decimal: '',
      label: '',
    },
    xaxis: {
      show: false,
      unit: ''
    }
  }
  const [figure, setFigure] = useState(figureObj)
  const [legend, setLegend] = useState(legendObj)
  const [axes, setAxes] = useState(axesObj)
  const chartPersReducer = useSelector((state) => state.chartPersReducer);
  const chartDataReducer = useSelector((state) => state.chartDataReducer);
  const chartViewReducer = useSelector((state) => state.chartViewReducer);
  console.log(chartViewReducer, 'chartView')
  const dispatch = useDispatch();

  useEffect(() => {
    getViewTableData();
    getChartListSer();
  }, []);

  const destroyState = () => {
    dispatch(resetChart({}));
    getViewTableData();
    getChartListSer();
    setresChartId('');
    setresChartVersion('');
    setresChartStatus('');
    setresChartId('');
    setresChartStatus('');
    setresChartVersion('');
  };

  const callbackViewType = (param) => {
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
    setisNewBtnDisabled(false);
    setshowBatch(true);
    setisLandingDisabled(true);
    let paramSplit = param ? param.split('-') : '';
    viewParamData(paramSplit[0], paramSplit[1], '', '', '');
  };

  const handleSaveAs = () => {
    let putChartSaveAs = {
      data: [
        {
          chart_id: chartDataReducer.chartId,
          chart_name: chartDataReducer.chartName,
          chart_description: chartDataReducer.chartDesc,
          chart_version: chartDataReducer.chartVersion,
          chart_status: chartDataReducer.chartStatus
            ? chartDataReducer.chartStatus
            : 'DRFT',
          view_id: chartViewReducer.viewId,
          view_name: chartViewReducer.viewName,
          view_version: chartViewReducer.viewVersion,
          view_status: chartViewReducer.viewStatus,
          data_filter: {
            date_range: chartPersReducer.dateRange,
            unapproved_data: chartPersReducer.unApprovedData,
            site: chartPersReducer.site,
          },
          chart_type: chartDataReducer.chartType,
          chart_mapping: chartDataReducer.chartMapping,
          data: chartDataReducer.data,
          layout: chartDataReducer.layout,
          exclusions: [],
          violations: [],
          limits: {},
          alerts: [],
        },
      ],
      savetype: 'saveas',
    };

    if (chartDataReducer.chartName === '') {
      setisFieldEmpty(true);
    } else {
      putChartObjData(putChartSaveAs);
    }
  };

  const handleSave = () => {
    let putChart = {
      data: [
        {
          chart_id: '',
          chart_name: chartDataReducer.chartName,
          chart_description: chartDataReducer.chartDesc,
          chart_version: '',
          chart_status: 'NEW',
          view_id: chartViewReducer.viewId,
          view_name: chartViewReducer.viewName,
          view_version: chartViewReducer.viewVersion,
          view_status: chartViewReducer.viewStatus,
          data_filter: {
            date_range: chartPersReducer.dateRange,
            unapproved_data: chartPersReducer.unApprovedData,
            site: chartPersReducer.site,
          },
          chart_type: chartDataReducer.chartType,
          chart_mapping: chartDataReducer.chartMapping,
          data: chartDataReducer.data,
          layout: chartDataReducer.layout,
          exclusions: exclusionTableData,
          violations: [],
          limits: {
            controlSource: controlSource,
            specificationSource: specificationSource,
            warningSource: warningSource
          },
          alerts: [],
        },
      ],
      savetype: 'save',
    };
    if (chartDataReducer.chartName === '') {
      setisFieldEmpty(true);
    } else {
      putChartObjData(putChart);
      setisSaveBtnDisabled(true);
      setisSaveAsBtnDisabled(false);
    }
  };

  const handleCloseViewModal = () => {
    setIsView(false);
  };

  const handleOkViewModal = (viewId, viewVersion) => {
    let viewDisId = viewId !== '' ? viewId : '';
    let viewVersId = viewVersion !== '' ? viewVersion : '';
    viewParamData(viewDisId, viewVersId, '', '', '');
    setIsView(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
    setshowBatch(true);
    setisLandingDisabled(true);
    setisSaveAsBtnDisabled(true);
    setisSaveBtnDisabled(false);
  };

  const handleCloseChartModal = () => {
    setIsLoad(false);
    setIsChart(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const handleOkChartModal = (chart_id, chart_ver) => {
    setIsLoad(false);
    setIsChart(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
    let reqChartObj = { chartId: chart_id, version: chart_ver };
    getChrtObjData(reqChartObj);
  };

  const handleCloseLoadModal = () => {
    setIsLoad(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const handleOkLoadModal = (chart_id, chart_ver) => {
    setIsLoad(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
    setisSaveAsBtnDisabled(false);

    let reqChartObj = { chartId: chart_id, version: chart_ver };
    getChrtObjData(reqChartObj);
    setisNewBtnDisabled(true);
    setisSaveBtnDisabled(true);
  };

  const callbackIsLoad = () => {
    setIsView(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const openLoadModal = () => {
    setIsChart(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const callFilterAPI = (site, dateRange, isUnApproved) => {
    console.log(chartViewReducer, 'chartview')
    let viewDisplayId = chartViewReducer.viewId;
    let viewVersionId = chartViewReducer.viewVersion;
    viewParamData(viewDisplayId, viewVersionId, site, dateRange, isUnApproved);
  };

  const callBackChartName = () => {
    setisFieldEmpty(false);
  };

  const getChartListSer = async () => {
    let reqChartList = { chart_status: 'ALL' };
    try {
      dispatch(showLoader());
      const chartListRes = await getChartList(reqChartList);
      if (chartListRes.statuscode === 200) {
        setchartTypeList(chartListRes.data);
        dispatch(hideLoader());
      }
    } catch (err) {
      dispatch(hideLoader());
      dispatch(showNotification('error', err));
    }
  };

  const getViewTableData = async () => {
    let reqView = { vew_status: 'APRD' };
    let antdDataTable = [];

    try {
      dispatch(showLoader());
      const viewRes = await getViewTable(reqView);
      viewRes.Data.forEach((item, key) => {
        let antdObj = {};
        antdObj['key'] = key;
        antdObj['created_by'] = item.created_by;
        antdObj['created_on'] = item.created_on;
        antdObj['product_num'] = item.product_num;
        antdObj['view_disp_id'] = item.view_disp_id;
        antdObj['view_info'] = item.view_info;
        antdObj['view_name'] = item.view_name;
        antdObj['view_status'] = item.view_status;
        antdObj['view_version'] = item.view_version;
        antdObj['view'] = item.view;
        antdDataTable.push(antdObj);
      });

      setviewTableData(antdDataTable);

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.message));
    }
  };

  const getChrtObjData = async (reqChartObj) => {
    try {
      dispatch(showLoader());
      const chartRes = await getChartObj(reqChartObj);
      if (chartRes.statuscode === 200) {
        let chartResData = chartRes && chartRes.data ? chartRes.data : {};
        
        setchartResObj(chartResData);
        dispatch(sendChartData(chartResData && chartResData));

        dispatch(sendChartVersion(chartResData && chartResData.chart_version));
        dispatch(sendChartName(chartResData && chartResData.chart_name));
        dispatch(sendChartDesc(chartResData && chartResData.chart_description));
        dispatch(sendData(chartResData && chartResData.data));
        dispatch(sendLayout(chartResData && chartResData.layout));
        dispatch(
          sendSelectedSite(
            chartResData && chartResData?.data_filter?.date_range
          )
        );
        dispatch(
          sendDateRange(chartResData && chartResData?.data_filter?.site)
        );
        dispatch(
          sendUnApprovedData(
            chartResData && chartResData?.data_filter?.unapproved_data
          )
        );
        dispatch(sendViewId(chartResData && chartResData.view_id));
        dispatch(sendViewName(chartResData && chartResData.view_name));
        dispatch(sendChartType(chartResData && chartResData.chart_type));
        dispatch(sendChartMapping(chartResData && chartResData.chart_mapping));
        setshowBatch(true);
        viewParamData(
          chartResData && chartResData.view_id,
          chartResData && chartResData.view_version,
          chartResData && chartResData?.data_filter?.site,
          chartResData && chartResData?.data_filter?.date_range,
          chartResData && chartResData?.data_filter?.unapproved_data
        );
        dispatch(hideLoader());
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', 'Chart Data Error - ', error));
    }
  };

  const putChartObjData = async (reqChart) => {
    try {
      dispatch(showLoader());
      const putChart = await putChartObj(reqChart);
      if (putChart.statuscode === 200) {
        setVisible(true);

        setresChartId(putChart.chart_id);
        setresChartVersion(putChart.chart_version);
        setresChartStatus(putChart.chart_status);
      } else if (putChart.statuscode === 400) {
        dispatch(
          showNotification('error', 'Save Data Error -', putChart.message)
        );
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.message));
    }
  };

  async function viewParamData(
    viewDisId,
    viewVer,
    site,
    dateRange,
    isUnApproved
  ) {
    let reqViewParam = {
      view_disp_id: viewDisId ? viewDisId : '',
      view_version: viewVer ? Number(viewVer) : undefined,
      // site: site ? [site] : undefined,
      date: dateRange ? dateRange : undefined,
      unapproved_data: true,
    };
    try {
      dispatch(showLoader());
      const viewData = await viewBatchData(reqViewParam);

      if (viewData.statuscode === 200) {
        let batchRes = viewData && viewData.data ? viewData.data : {};
        setbatchData(batchRes);
        setDataTable([]);
        setExclusionTableData([]);
        setshowBatch(true);
        dispatch(sendBatchCoverage(batchRes));
      } else if (viewData.statuscode === 400) {
        dispatch(
          showNotification('error', 'Parameter Data Error -', viewData.message)
        );
      }

      dispatch(hideLoader());
    } catch (error) {
      setbatchData({});
      dispatch(hideLoader());
      dispatch(
        showNotification('error', 'Parameter Data Error -', error?.message)
      );
    }
  }

  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Chart Personalization</span>
        </div>

        <div className='sub-header-btns'>
          {isNewBtnDisabled && (
            <Button
              className='custom-primary-btn  '
              onClick={() => {
                destroyState();
                setIsNew(true);
                setShowChart(true);
                setShowChartType(true);
                setShowFilter(true);
                setShowCustomization(true);
                setshowBatch(true);
                setisLandingDisabled(true);
                setisSaveAsBtnDisabled(true);
                setisSaveBtnDisabled(false);
                setisNewBtnDisabled(false);
              }}
              type='primary'
            >
              New
            </Button>
          )}
          <Button
            className='custom-primary-btn  '
            onClick={() => {
              setIsLoad(true);
            }}
            type='primary'
          >
            Load
          </Button>
          {isLandingDisabled && (
            <>
              <Button
                className='custom-primary-btn'
                onClick={() => {
                  handleSave();
                  setisNewBtnDisabled(true);
                }}
                type='primary'
                disabled={isSaveBtnDisabled}
              >
                Save
              </Button>

              <Button
                className='custom-primary-btn'
                onClick={() => {
                  handleSaveAs();
                  setisNewBtnDisabled(true);
                }}
                type='primary'
                disabled={isSaveAsBtnDisabled}
              >
                Save As
              </Button>
              <Button className='custom-secondary-btn' type='primary'>
                Publish
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='custom-content-layout'>
        <div className='chart-block'>
          <div className='chart-left-panel'>
            <div style={{ marginBottom: '24px' }}>
              <ChartView
                // callbackViewType={callbackViewType}
                callbackViewTable={callbackIsLoad}
                callbackViewData={callbackViewType}
                viewTableData={viewTableData}
                batchCoverageData={batchData}
                showBatch={showBatch}
              />
            </div>
            {showFilter && (
              <div style={{ marginBottom: '24px' }}>
                <ChartFilter applyDateFilter={callFilterAPI} />
              </div>
            )}
            {showChartType && (
              <div>
                <ChartType tempArrForData={tempArrForData} setDataTable={setDataTable} resetBatchData={batchData} setselectedLayout={setselectedLayout} />
              </div>
            )}
          </div>
          {showChart && (
            <div className='chart-center-panel'>
              <ChartDetails
                tempArrForData={tempArrForData}
                counterIdForExclusion={counterIdForExclusion}
                tempArrForExclude={tempArrForExclude}
                resChartId={resChartId}
                resChartVersion={resChartVersion}
                resChartStatus={resChartStatus}
                isFieldEmpty={isFieldEmpty}
                isChartNameEmpty={callBackChartName}
                setExclusionTableData={setExclusionTableData}
                exclusionTableData={exclusionTableData}
                selectedLayout={selectedLayout} 
                setselectedLayout={setselectedLayout}
                dataTable={dataTable}
                setDataTable={setDataTable}
              />
              <ChartDataTable tempArrForData={tempArrForData} setDataTable={setDataTable} counterIdForExclusion={counterIdForExclusion} tempArrForExclude={tempArrForExclude} dataTable={dataTable} setDataTable={setDataTable} setExclusionTableData={setExclusionTableData} exclusionTableData={exclusionTableData} />
            </div>
          )}
          {showCustomization && (
            <div className='chart-right-panel'>
              <Personalization selectedLayout={selectedLayout} setselectedLayout={setselectedLayout} figure={figure} setFigure={setFigure} legend={legend} setLegend={setLegend} axes={axes} setAxes={setAxes} controlSource={controlSource} setControlSource={setControlSource} specificationSource={specificationSource} setSpecificationSource={setSpecificationSource} warningSource={warningSource} setWarningSource={setWarningSource} />
            </div>
          )}
        </div>

        <ViewTable
          isModal={isView}
          data={viewTableData}
          handleCloseModal={handleCloseViewModal}
          handleOkModal={handleOkViewModal}
        />

        <ChartTable
          isModal={isChart}
          data={chartTypeList}
          handleCloseModal={handleCloseChartModal}
          handleOkModal={handleOkChartModal}
        />

        <LoadModal
          isModal={isLoad}
          data={chartTypeList}
          callbackLoadModal={openLoadModal}
          handleCloseModal={handleCloseLoadModal}
          handleOkModal={handleOkLoadModal}
        />
        <div className='modalPopup'>
          <Modal
            visible={visible}
            width={500}
            mask={true}
            centered={true}
            footer={null}
          >
            <div className='save-wrapper'>
              <center>
                <p style={{ textAlign: 'left' }}>Congratulations</p>
                <CheckCircleOutlined
                  className='circleIcon'
                  style={{ color: 'green' }}
                />
                <br />
                <p>
                  Chart ID : {resChartId ? resChartId : ''} <br />
                  <br />
                  Your Changes Have Been Successfully Saved
                </p>
              </center>

              <Button
                style={{ float: 'right' }}
                onClick={() => {
                  setVisible(false);
                }}
                className='custom-primary-btn'
              >
                OK
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ChartPersonalization;
