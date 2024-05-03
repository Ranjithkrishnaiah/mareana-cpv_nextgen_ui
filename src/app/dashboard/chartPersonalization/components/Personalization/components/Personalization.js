import './Personalization.scss';

import { Card, Collapse } from 'antd';
import React, { useState, useEffect } from 'react';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import Alerts from './alerts/index';
import ControLimits from './controlLimts';
import Display from './display';
import { ControlOutlined, StarOutlined, PlusSquareOutlined, BellOutlined } from '@ant-design/icons';
const { Panel } = Collapse;



const Personalization = ({ controlSource, setControlSource, specificationSource, setSpecificationSource, warningSource, setWarningSource, figure, setFigure, legend, setLegend, axes, setAxes, setselectedLayout, selectedLayout }) => {
  const [count, setCount] = useState(1);
  const [alertCount, setAlertCount] = useState([1]);

  const handleClick = () => {
    setCount(count + 1);
    setAlertCount([...alertCount, count + 1]);
  }

  const deleteAlert = (value) => {
    let data = [...alertCount];
    let index = data.findIndex(el => el == value);
    data.splice(index, 1)
    setAlertCount(data);
  }

  const limits = 'Limits'

  return (
    <>
      <Card className='Configuration-card' title='Configuration'>
        <Collapse
          expandIconPosition='right'
          ghost
        >
          <Panel header={<div><BellOutlined />&nbsp;  Alerts</div>} key='1'>
            <PlusSquareOutlined style={{ fontSize: '16px', marginLeft: '10px', color: '#093185' }} onClick={() => handleClick()} /> <u>Add Multiple Sections</u>
            {alertCount.map((item) => (
              <Alerts deleteAlert={deleteAlert} data={item} />
            ))
            }
          </Panel>
          {/* Limits */}
          <Panel header={<div><StarOutlined /> &nbsp;Limits</div>} key='3'>
            <ControLimits controlSource={controlSource} setControlSource={setControlSource} specificationSource={specificationSource} setSpecificationSource={setSpecificationSource} warningSource={warningSource} setWarningSource={setWarningSource} />
          </Panel>
          {/* Display */}
          <Panel header={<div><ControlOutlined /> &nbsp;Display</div>} key='2'>
            <Display figure={figure} setFigure={setFigure} legend={legend} setLegend={setLegend} axes={axes} setAxes={setAxes} setselectedLayout={setselectedLayout} selectedLayout={selectedLayout} />
          </Panel>
        </Collapse>
      </Card>
    </>
  );
}

export default Personalization;
