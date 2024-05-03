
import React, { useState, useRef,useEffect } from 'react';
import { Table, Popconfirm, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import './exclusion.scss';
import { useDispatch, useSelector } from 'react-redux';
import { generateChart } from '../../../../../../../../duck/actions/chartPersonalizationAction';

const ExclusionTable = ({ tempArrForData, exclusionTableData, setExclusionTableData, dataTable, tempArrForExclude, counterIdForExclusion, setDataTable }) => {
    const [selectedTitle, setSelectedTitle] = useState('');
    const tempArr = useRef([]);
    const dispatch = useDispatch()
    const chartPlotData1 = useSelector(
        (state) => state.chartDataReducer
    );
    const chartDesc = useSelector((state) => state.chartPersReducer.chartDesc);
    const columns = [];
    useEffect(() => {
        setSelectedTitle(chartDesc);
      }, [chartDesc]);
    const handleRowDelete = (record) => {
        const data = exclusionTableData.filter((ele) => ele.batch_num !== record.batch_num)
        const dataNew = tempArrForData.current.find((ele) => ele.batch_num === record.batch_num)
        const obj = [...dataTable]
        obj.push(dataNew)
        setDataTable([...obj])
        setExclusionTableData(data);
        tempArr.current = JSON.parse(JSON.stringify(data));
        tempArrForExclude.current = tempArrForExclude.current.filter((ele) => ele.batch_num !== record.batch_num)
        counterIdForExclusion.current = counterIdForExclusion.current - 1;
        let xaxis = [];
        let yaxis = [];
        let batch = [];
        const mergedObj = JSON.parse(JSON.stringify(tempArrForData.current));
        mergedObj.forEach((ele) => {
            batch.push(ele.batch_num)
            Object.entries(ele).map(([key, value]) => {
                if (chartPlotData1.chartType === 'Scatter Plot') {
                    if (key === chartPlotData1.chartxAxis) {
                        xaxis.push(value)
                    }
                } else {
                    if (key === chartPlotData1.chartyAxis) {
                        if (chartPlotData1.chartxAxis === 'Batch') {
                            xaxis.push(ele.batch_num)
                        } else {
                            const date = ele.recorded_date;
                            xaxis.push(date)
                        }
                    }
                }
                if (key === chartPlotData1.chartyAxis) {
                    yaxis.push(value)
                }
            })
        })
        const colorArr = [];
        tempArrForData.current.forEach((ele) => {
            colorArr.push('blue');
         })
        tempArr.current.forEach((ele) => {
        const findValue = tempArrForData.current.findIndex((element) => element.batch_num === ele.batch_num)
        colorArr[findValue] = 'red'
        })
        const chartLayout = {
            title: {
                text: selectedTitle !== undefined ? selectedTitle : '',
            },
            xaxis: {
                title: {
                    text: chartPlotData1.chartxAxis,
                },
            },
            yaxis: {
                title: {
                    text: chartPlotData1.chartyAxis,
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
        const chartData = {
            x: xaxis.length ? xaxis : [],
            y: yaxis.length ? yaxis : [],
            text: batch,
            type: 'scatter',
            mode: 'markers',
            marker: { color: colorArr }
        };


        const plotlyData = {
            data: chartData,
            layout: chartLayout,
        };
        dispatch(generateChart(plotlyData));
    }
    const newColumns = [
        {
            title: 'Id',
            key: 'exclusionId',
            dataIndex: 'exclusionId',
            width: 50,
            fixed: 'left'
        },
        {
            title: 'Description',
            key: 'exclusionDesc',
            dataIndex: 'exclusionDesc',
            width: 100,
            fixed: 'left',
            render: (text, record) => (
                <span>{record.exclusionDesc ? record.exclusionDesc : '-'}</span>
            )
        },
        {
            title: 'Batch',
            key: 'batch_num',
            dataIndex: 'batch_num',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'User',
            key: 'userId',
            dataIndex: 'userId',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'Time',
            key: 'timeStamp',
            dataIndex: 'timeStamp',
            width: 100,
            fixed: 'left'
        }
    ]
    newColumns.forEach((ele) => {
        columns.push(ele);
    })
    const uniqueArr = (value, index, self) => {
        return self.indexOf(value) === index;
    };
    const objkeys = dataTable !== undefined && dataTable.length > 0
        ? Object.keys(dataTable[0])
        : [];
    const filterColumn = objkeys.filter(uniqueArr);
    filterColumn.map((item, i) => {
        if (item !== 'recorded_date' && item !== 'batch_num') {
            columns.push({
                title: item.toUpperCase(),
                dataIndex: item,
                key: `${item}-${i}`,
                width: 100,
            });
        }
    });
    const deleteColumn = {
        title: '',
        key: 'action',
        width: 100,
        fixed: 'left',
        align: 'center',
        render: (text, record, index) => (
            <Popconfirm
                title='Sure to delete?'
                className='deleteTableAction'
                onConfirm={() => handleRowDelete(record)}
            >
                <DeleteOutlined />
            </Popconfirm>
        ),
    }
    if (columns) {
        columns.push(deleteColumn)
    }

    return (
        <div>
            <Table
                size='small'
                columns={columns}
                dataSource={exclusionTableData}
                pagination={false}
                rowKey={(record) => record.id}
            />
        </div>
    )
}

export default ExclusionTable;

