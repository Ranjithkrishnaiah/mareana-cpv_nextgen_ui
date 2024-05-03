import './styles.scss';

import { Button, Card } from 'antd';
/* eslint-env browser, node */
import React, { useEffect, useState } from 'react';
import {
  generateChart,
  sendChartMapping,
  sendChartType,
  sendChartxAxis,
  sendChartyAxis,
  sendData,
  sendLayout,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { WarningTwoTone } from '@ant-design/icons';
import chartTypeJson from '../chartType.json';

const ChartType = (props) => {
  const [isScatter, setisScattetruer] = useState(true);
  const [chartTypeList, setchartTypeList] = useState(
    chartTypeJson.map((item) => item.chart_type)
  );
  const [selectedChartType, setselectedChartType] = useState('');
  const [selectedXAxis, setselectedXAxis] = useState('');
  const [selectedYAxis, setselectedYAxis] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [xAxisList, setxAxisList] = useState([]);
  const [yAxisList, setyAxisList] = useState([]);
  const [chartBatchData, setChartBatchData] = useState({});
  const [batchData, setbatchData] = useState([]);
  const [isDisabled, setisDisabled] = useState(true);
  const [axisDataArray, setaxisDataArray] = useState([]);
  const [processControl, setProcessControl,] = useState(['Batch', 'Date'])
  const [isDisableXAxis, setisDisableXAxis] = useState(false);
  const [isDisabledYAxis, setisDisabledYAxis] = useState(false);
  const [showWarn, setshowWarn] = useState(false);

  const dispatch = useDispatch();
  const getChartObjData = useSelector(
    (state) =>
      state.chartDataReducer && state.chartDataReducer.selectedChartData
  );

  const batchCoverage = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage
  );
 

  const chartDesc = useSelector((state) => state.chartPersReducer.chartDesc);

  useEffect(() => {
    setselectedChartType(getChartObjData?.chart_type);
    setselectedXAxis(getChartObjData?.chart_mapping?.x?.function_name);
    setselectedYAxis(getChartObjData?.chart_mapping?.y?.function_name);
  }, [getChartObjData]);


  //useEffect to clear the loaded chart data
  useEffect(() => {
    setselectedChartType('');
    setselectedXAxis('');
    setselectedYAxis('');
    props.setselectedLayout({})
  }, [props.resetBatchData])

  useEffect(() => {
    const xAxis = [];
    const yAxis = [];
    const batch = [];
    const temp = [];
    const ph = [];
    const axisArray = [];
    let tempArr = [];
    setxAxisList([])
    setyAxisList([]);
    let chartCoverage = batchCoverage;
    if (chartCoverage && chartCoverage.coverage) {
      chartCoverage && chartCoverage.coverage.forEach((ele) => {
        tempArr.push(ele.function_name)
      })
    }
    setxAxisList(tempArr);
    setyAxisList(tempArr);
    const fetchXYAxis =
      batchCoverage &&
      batchCoverage.coverage !== undefined &&
      Object.entries(batchCoverage.functions).map(([key, value]) => {
        let axisObj = {};

        axisObj['key'] = key;
        axisObj['value'] = value;

        axisArray.push(axisObj);
        xAxis.push(key);
        yAxis.push(key);
      });

    const filterChartBatch =
      batchCoverage &&
      batchCoverage.data !== undefined &&
      batchCoverage.data.map((item) => {
        batch.push(item.batch_num),
          temp.push(item.Temperature),
          ph.push(item.pH);
      });

    const data = {
      batch: batch,
      ph: ph,
      Temperature: temp,
    };
    setbatchData(data);
    setChartBatchData(batchCoverage);
    setaxisDataArray(axisArray);
  }, [batchCoverage]);

  useEffect(() => {
    setSelectedTitle(chartDesc);
  }, [chartDesc]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const chartLayout = {
    title: {
      text: selectedTitle !== undefined ? selectedTitle : '',
    },
    xaxis: {
      title: {
        text: selectedXAxis,
      },
    },
    yaxis: {
      title: {
        text: selectedYAxis,
      },
    },
    height: 250,
    width: 450,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 5,
    },
  };

  const selectChartType = (value, field) => {
    setisDisabled(false);
    if (value !== null) {
      if (field === 'charttype') {
        setselectedXAxis('');
        setselectedYAxis('');
        setselectedChartType(value);
        if (value === 'Scatter Plot') {
          setisScattetruer(true);
        } else if (value === 'Process Control') {
          setisScattetruer(true);
        }
      } else if (field === 'xaxis') {
        setselectedXAxis(value);
      } else if (field === 'yaxis') {
        setselectedYAxis(value);
      }
    }
  };

  const createChart = () => {
    let xaxisValues = [];
    let yaxisValues = [];
     let xaxis = [];
    let yaxis = [];
    let batch = [];
    Object.entries(batchCoverage.functions).map(([key,val]) => {
      val.forEach(element => {
        Object.entries(element).map(([key,value]) => { 
          const x = [];
          if (key === selectedXAxis) {
            x.push(element);
            x.forEach((item) => {
              xaxisValues.push(item)
            })
          }
        } )
        Object.entries(element).map(([key,value]) => { 
          const y = [];
          if (key === selectedYAxis) {
            y.push(element);
            y.forEach((item) => {
              yaxisValues.push(item)
            })
          }
        } )
      });
    })
    let mergedObj;
    if(xaxisValues.length >= yaxisValues.length) {
       mergedObj = xaxisValues.map((subject) => {
        let otherObj = yaxisValues.find((ele) =>ele.batch_num === subject.batch_num)
        return {...subject, ...otherObj}
      })
    } else {
      mergedObj = yaxisValues.map((subject) => {
        let otherObj = xaxisValues.find((ele) =>ele.batch_num === subject.batch_num)
        return {...subject, ...otherObj}
      })
    }
    if (mergedObj.length) {
      mergedObj.forEach((ele) => {
        ele.recorded_date = new Date(ele.recorded_date).toLocaleDateString();
        batch.push(ele.batch_num)
         Object.entries(ele).map(([key,value]) => {
          if (selectedChartType === 'Scatter Plot') {
            if (key === selectedXAxis) {
              xaxis.push(value)
             } 
          } else {
            if (key === selectedYAxis) {
              if (selectedXAxis === 'Batch') {
                xaxis.push(ele.batch_num)
              } else {
                const date = ele.recorded_date;
                xaxis.push(date)
              }
            }
          }
           if(key === selectedYAxis) {
             yaxis.push(value)
           }
         }) 
      })
      props.setDataTable(mergedObj);
      props.tempArrForData.current = JSON.parse(JSON.stringify(mergedObj));
    }
    const chartData = {
      x: xaxis.length ? xaxis : [],
      y: yaxis.length ?  yaxis : [],
      text: batch,
      type: 'scatter',
      mode: 'markers',
    };
    const chartMapping = {
      x: {
        function_id: '1',
        function_name: selectedXAxis,
      },
      y: {
        function_id: '2',
        function_name: selectedYAxis,
      },
    };
    const plotlyData = {
      data: chartData,
      layout: chartLayout,
    };

    dispatch(sendData(chartData));
    dispatch(sendLayout(chartLayout));
    dispatch(generateChart(plotlyData));
    dispatch(sendChartType(selectedChartType));
    dispatch(sendChartxAxis(selectedXAxis));
    dispatch(sendChartyAxis(selectedYAxis));
    dispatch(sendChartMapping(chartMapping));
  };
  return (
    <div>
      <Card title='Chart'>
        <div className='grid-2-columns'>
          <SelectField
            label='Chart Type'
            onChangeSelect={(e) => selectChartType(e, 'charttype')}
            selectList={chartTypeList}
            selectedValue={selectedChartType}
            placeholder="Select"
          />
        </div>

        {isScatter ? (
          <div className='grid-2-columns' style={{ marginTop: '10px' }}>
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='X-Axis'
              placeholder='X-Axis'
              onChangeSelect={(e) => selectChartType(e, 'xaxis')}
              selectList={selectedChartType === 'Scatter Plot' ? xAxisList : processControl}
              selectedValue={selectedXAxis}
            />
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='Y-Axis'
              placeholder='Y-Axis'
              onChangeSelect={(e) => selectChartType(e, 'yaxis')}
              selectList={yAxisList}
              selectedValue={selectedYAxis}
            />
          </div>
        ) : (
          <div className='grid-2-columns' style={{ marginTop: '10px' }}>
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='X-Axis'
              placeholder='X-Axis '
              onChangeSelect={(e) => selectChartType(e, 'xaxis')}
              selectList={processControl}
              selectedValue={selectedXAxis}
            />
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='Y-Axis'
              placeholder='Y-Axis '
              onChangeSelect={(e) => selectChartType(e, 'yaxis')}
              selectList={yAxisList}
              selectedValue={selectedYAxis}
            />
          </div>
        )}
        <Button
          type='primary'
          className='custom-secondary-btn'
          onClick={createChart}
          style={{ marginTop: '12px', float: 'right' }}
          disabled={isDisabled}
        >
          Apply
        </Button>
      </Card>
    </div>
  );
};

export default ChartType;
