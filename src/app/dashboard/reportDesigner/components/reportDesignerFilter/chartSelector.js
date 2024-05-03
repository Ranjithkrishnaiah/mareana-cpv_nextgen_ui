import React, { useState } from 'react';
import {
    Card,
    Select,
    Typography,
} from 'antd';
import './styles.scss';


const { Option } = Select;
const { Text } = Typography;


function ChartSelector(props) {

    const { setSelectedChartList, selectedChartList, chartList} = props
    const chartsList =  chartList.length > 0 ? chartList : ['No charts for selected View']

    const handleChange = selectedItems => {
        setSelectedChartList(selectedItems);
    };


    return (
        <div>
            <Card className="chartid-main" title="Chart" >
                <Text>Chart ID</Text> <br/>
                <Select
                    mode="multiple"
                    showArrow
                    showSearch
                    bordered
                    dropdownStyle={{border:'10'}}
                    notFoundContent="No Result"
                    placeholder="Select Multiple Charts"
                    value={selectedChartList}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    disabled={props.show}
                    
                >
                    {chartsList.length > 0  ? chartsList.map(item => (
                        <Option value={item} key={item}>
                            {item}
                        </Option>
                    )):<Option >
                    
                </Option> }
                </Select>
            </Card>
        </div>
    );
}

export default ChartSelector;
