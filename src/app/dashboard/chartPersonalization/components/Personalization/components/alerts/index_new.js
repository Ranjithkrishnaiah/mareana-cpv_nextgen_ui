import '../Personalization.scss';
import './style.scss';
import { Card, Collapse, Form, Button, Input, Space, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { PlusSquareTwoTone, DeleteTwoTone, PlusSquareOutlined } from '@ant-design/icons';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';

const handleValuesChange = (changedValues, values) => {

};
const Alerts = (props) => {
  return (
    <div className="reportDesigner-dynamicSections bg-white">
      <div className="dynamicSections-container">
        <div className="dynamicSections-section">
          <div className="dynamicSections-block">
            <Form name='alert_form' onValuesChange= {handleValuesChange}>
              <Form.List name={["response"]}>
                {(fields, { add, remove }) => (

                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div>
                        <Space
                          className="dynamicSections-spaceSection"
                          key={key}
                          style={{ display: 'flex', justifyContent: 'center' }}
                          align="baseline"
                        >
                          <Card title='Alert Name1'>
                            Hello
                          </Card>
                          <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)}>
                            <DeleteTwoTone twoToneColor="red" style={{ marginBottom: '100px' }} />
                          </Popconfirm>
                        </Space>
                      </div>
                    ))}
                    <Form.Item>
                      <PlusSquareOutlined style={{ fontSize: '16px', marginLeft: '10px', color: '#093185' }} onClick={() => add()} /> <u>Add Multiple Sections</u>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );



}

export default Alerts;