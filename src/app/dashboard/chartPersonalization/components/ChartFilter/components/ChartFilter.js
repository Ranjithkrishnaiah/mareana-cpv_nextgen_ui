import './styles.scss';

import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Switch,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  sendDateRange,
  sendSelectedSite,
  sendUnApprovedData,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { getSiteId } from '../../../../../../services/chartPersonalizationService';
import moment from 'moment';
import { showNotification } from '../../../../../../duck/actions/commonActions';

const { Text } = Typography;
const { Search } = Input;

function ChartFilter(props) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteList, setSiteList] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimeIso, setstartTimeIso] = useState('');
  const [endTimeIso, setendTimeIso] = useState('');
  const [isDisabled, setisDisabled] = useState(true);
  const [selectedPeriod, setselectedPeriod] = useState('');
  const [selectedPeriodDate, setselectedPeriodDate] = useState('');

  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [unapprovedData, setunapprovedData] = useState(false);

  const dispatch = useDispatch();

  const getChartObjData = useSelector(
    (state) =>
      state.chartDataReducer && state.chartDataReducer.selectedChartData
  );

  useEffect(() => {
    getSiteIdHandler();
  }, []);

  useEffect(() => {
    setSelectedSite(
      getChartObjData && getChartObjData.data_filter !== undefined
        ? getChartObjData.data_filter.site
        : ''
    );
    setSelectedDateRange(
      getChartObjData && getChartObjData.data_filter !== undefined
        ? getChartObjData.data_filter.date_range
        : ''
    );
    setunapprovedData(
      getChartObjData && getChartObjData.data_filter !== undefined
        ? getChartObjData.data_filter.unapproved_data
        : false
    );
    const splitDate =
      getChartObjData && getChartObjData.data_filter !== undefined
        ? getChartObjData.data_filter.date_range.split('/')
        : '';
    setStartTime(splitDate[0]);
    setEndTime(splitDate[1]);
  }, [getChartObjData]);

  const getSiteIdHandler = () => {
    let reqSite = { view_id: 'V1' };
    getSiteId(reqSite).then((res) => {
      if (res.Status === 200) {
        setSiteList(res.Data[0]);
      } else if (res.Status === 400) {
        dispatch(showNotification('error', 'Site Error - ' + res.Message));
      } else if (res === 'Internal Server Error') {
        dispatch(showNotification('error', 'Site Error - ' + res));
      }
    });
  };

  // const getDateRange = (indate) => {
  //   let startdate = '';
  //   let enddate = '';
  //   if (indate[0] === 'P') {
  //     enddate = moment()
  //       .format()
  //       .replace((microsecond = 0));
  //     startdate = enddate - isodate.parse_duration(period);
  //   } else {
  //     startdate = datetime.fromisoformat(
  //       incdate.split('/')[0].replace('Z', '')
  //     );
  //     enddate = datetime.fromisoformat(incdate.split('/')[1].replace('Z', ''));
  //   }
  // };

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onChangeCheckbox = (checked) => {
    const isChecked = checked;
    setunapprovedData(isChecked);
    setisDisabled(false);
  };

  const handleSelectChange = (value) => {
    if (value !== null) {
      setSelectedSite(value);
      setisDisabled(false);
    }
  };
  const onChangeStart = (date, dateString) => {
    console.log('setStartTime', date, dateString);
    console.log('forment', moment(date).toISOString());
    setStartTime(dateString);
    setstartTimeIso(moment(date).toISOString());
  };
  const onChangeEnd = (date, dateString) => {
    console.log('setEndTime', dateString);
    console.log('forment', moment(date).toISOString());
    setEndTime(dateString);
    setendTimeIso(moment(date).toISOString());
  };

  const handleDateClick = () => {
    showModal();
    setisDisabled(false);
  };

  const onClickTimeRange = () => {
    console.log(
      '`${startTime} / ${endTime}`',
      `${startTimeIso} / ${endTimeIso}`
    );
    setSelectedDateRange(`${startTimeIso}/${endTimeIso}`);
    setVisible(false);
  };

  const chartFilter = () => {
    dispatch(sendDateRange(selectedDateRange));
    dispatch(sendSelectedSite(selectedSite));
    dispatch(sendUnApprovedData(unapprovedData));
    props.applyDateFilter(selectedSite, selectedDateRange, unapprovedData);
  };
  const generateISO = (val) => {
    let endDate = new Date();
    let startdate = new Date();
    let durationInMinutes = val;
    startdate.setMinutes(endDate.getMinutes() - durationInMinutes);
    let isoVar = startdate.toISOString().replace(/[^\d]/g, '').slice(0, -9);
    let format = moment.duration(isoVar).toISOString();

    let dateFormate = moment(isoVar).format('YYYY-MM-DD');
    setselectedPeriodDate(dateFormate);
    setSelectedDateRange(dateFormate);
    setVisible(false);
  };

  const range = [
    { key: 'Last 5 minutes', value: 5 },
    { key: 'Last 10 minutes', value: 10 },
    { key: 'Last 15 minutes', value: 15 },
    { key: 'Last 20 minutes', value: 20 },
    { key: 'Last 25 minutes', value: 25 },
    { key: 'Last 30 minutes', value: 30 },
  ];
  const options = range.map((item, i) => (
    <Option key={i} value={item.value}>
      {item.key}
    </Option>
  ));

  const onChangeSelect = (value) => {
    if (value !== null) {
      setselectedPeriod(value);
      generateISO(value);
    }
  };

  return (
    <div>
      <Card title='Filters'>
        <div className='grid-2-columns'>
          <SelectField
            label='Site'
            onChangeSelect={(e) => handleSelectChange(e)}
            selectList={siteList}
            selectedValue={selectedSite}
          />

          <InputField
            label='Date Range'
            placeholder='Select Date Range'
            onChangeClick={(e) => handleDateClick(e)}
            value={selectedDateRange}
          />
        </div>
        <div className='show-data'>
          <p>Show Unapproved data</p>
          <Switch type='primary' size='small' onChange={onChangeCheckbox} />

          {/* <Checkbox onChange={onChangeCheckbox}>Unapproved data</Checkbox> */}
        </div>
        <Button
          type='primary'
          className='custom-secondary-btn'
          onClick={chartFilter}
          style={{ marginTop: '12px', float: 'right' }}
          disabled={isDisabled}
        >
          Apply
        </Button>
      </Card>

      <Modal
        visible={visible}
        title='Absolute Time Range'
        onOk={handleOk}
        width={700}
        onCancel={handleCancel}
        footer={[
          <p key='1' style={{ float: 'left' }}>
            Last 5 minutes United States EST
          </p>,
          <Button key='back'>UTC-05:00</Button>,
          <Button
            type='primary'
            className='custom-secondary-btn'
            key='submit'
            type='primary'
            loading={loading}
          >
            Change Time Settings
          </Button>,
        ]}
      >
        <div className='grid-2-columns'>
          <div>
            <Text>From</Text>
            <br />
            <DatePicker
              onChange={onChangeStart}
              style={{ marginTop: '10px', marginBottom: '10px' }}
            />
            <br />
            <Text style={{ marginTop: '10px' }}>To</Text>
            <br />
            <DatePicker onChange={onChangeEnd} style={{ marginTop: '8px' }} />
            <br />
            <Button
              type='primary'
              className='custom-secondary-btn'
              style={{ marginTop: '20px' }}
              onClick={onClickTimeRange}
            >
              Apply Time Range
            </Button>
            {/* <p style={{ marginTop: '10px' }}>
              <b>Recently Used time changes</b>
            </p>
            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p> */}
          </div>
          <div>
            {/* <Search placeholder='Search quick Ranges' style={{ width: 200 }} /> */}
            {/* <p style={{ marginTop: '10px' }}>Last 5 minutes</p> */}
            <div className='input_field_view'>
              <p>quick Ranges</p>
              <div className='input_view'>
                <Select
                  // placeholder={props.placeholder}
                  value={selectedPeriod}
                  onChange={(e) => onChangeSelect(e)}
                  style={{ width: '100%', margin: '0px' }}
                >
                  {options}
                </Select>
              </div>
            </div>
            {/* <Button
              type='link'
              onClick={() => generateISO(5)}
              style={{ marginTop: '10px' }}
            >
              Last 5 minutes
            </Button>
            <br />
            <Button
              type='link'
              onClick={() => generateISO(15)}
              style={{ marginTop: '10px' }}
            >
              Last 15 minutes
            </Button>
        
            <br />
            <Button
              type='link'
              onClick={() => generateISO(25)}
              style={{ marginTop: '10px' }}
            >
              Last 25 minutes
            </Button>
            <br />
            <Button
              type='link'
              onClick={() => generateISO(35)}
              style={{ marginTop: '10px' }}
            >
              Last 35 minutes
            </Button>
            <br />
            <Button
              type='link'
              onClick={() => generateISO(45)}
              style={{ marginTop: '10px' }}
            >
              Last 45 minutes
            </Button>
            <br />
            <Button
              type='link'
              onClick={() => generateISO(60)}
              style={{ marginTop: '10px' }}
            >
              Last 60 minutes
            </Button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChartFilter;
