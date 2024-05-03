import { Col, Collapse, Form, Input, Row, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    ArrowLeftOutlined,
    EditOutlined,
    ArrowRightOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';
import panelLeftImg from '../../../../assets/images/panel-leftIcon.svg';
import panelRightImg from '../../../../assets/images/panel-rightIcon.svg';
import cropImg from '../../../../assets/images/cropImg.svg';
import undoImg from '../../../../assets/images/undoImg.svg';
import redoImg from '../../../../assets/images/redoImg.svg';
import contrastImg from '../../../../assets/images/contrastImg.svg';

import InputField from '../../../../components/InputField/InputField';

import Sider from 'antd/lib/layout/Sider';

const { Panel } = Collapse;
const { Option } = Select;

function paperBatchRecordsTemplate() {
    const [form] = Form.useForm();
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

    const toggleLeftCollapsed = () => {
        setLeftPanelCollapsed(!leftPanelCollapsed);
    };

    const toggleRightCollapsed = () => {
        setRightPanelCollapsed(!rightPanelCollapsed);
    };

    // useEffect(() => {
    //     form.setFieldsValue({
    //         pageId1: '1',
    //         pageId: '111',
    //     });
    // }, []);

    return (
        <div className='pbr-container pbrTemplate-container'>
            <div className='custom-wrapper pbr-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>
                            Paper Batch Records /
                        </span>
                        <span className='header-title'>Template001</span>
                    </div>
                </div>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <Button type='primary' className='defineTableBtn'>
                            <ArrowRightOutlined /> Define Table
                        </Button>
                        <EllipsisOutlined className='ellipseIconMenu' />
                    </div>
                </div>
            </div>

            <div className='pbrTemplateRowContainer'>
                <div className='pbrTemplateLeft'>
                    <div className='pbrPanel pbrRightPanel'>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={leftPanelCollapsed}
                        >
                            <span
                                className='trigger'
                                onClick={toggleLeftCollapsed}
                            >
                                <img src={panelLeftImg} className='panelImg' />
                            </span>
                            <Collapse
                                accordion
                                expandIconPosition='right'
                                defaultActiveKey={['1']}
                            >
                                <Panel header='Page Identifier' key='1'>
                                    <div className='pageIdentifierBlock'>
                                        <Form
                                            layout='vertical'
                                            form={form}
                                            className='formNewTemplate'
                                        >
                                            {/* <InputField
                                                label='Page ID 1'
                                                name='pageId1'
                                                placeholder='Enter Page ID'
                                            /> */}
                                            <Form.Item
                                                label='Page ID'
                                                name='pageId'
                                            >
                                                <Input placeholder='Enter Page ID' />
                                            </Form.Item>
                                            <Form.Item
                                                label='Key 1'
                                                name='key1'
                                            >
                                                <Input placeholder='Enter Key 1' />
                                            </Form.Item>
                                            <Form.Item
                                                label='Key 2'
                                                name='key2'
                                            >
                                                <Input placeholder='Enter Key 2' />
                                            </Form.Item>
                                            <Form.Item
                                                label='Condition'
                                                name='condition'
                                            >
                                                <div className='conditonBlock'>
                                                    <span>Key 1</span>
                                                    <span>
                                                        <Select defaultValue='AND'>
                                                            <Option value='AND'>
                                                                AND
                                                            </Option>
                                                            <Option value='OR'>
                                                                OR
                                                            </Option>
                                                            <Option value='NOT'>
                                                                NOT
                                                            </Option>
                                                        </Select>
                                                    </span>
                                                    <span>Key 2</span>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Panel>
                                <Panel header='Add Parameter' key='2'>
                                    <div className='addParameterBlock'>
                                        <div className='firstParameter-para'>
                                            <p>Add your first paramater</p>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Sider>
                    </div>
                </div>
                <div className='pbrTemplateCenter'>
                    <div className='pbrPanel pbrCenterPanel'>
                        <div className='pbrCenterPanel-header'>
                            <Row className='pbrCenterPanelRow'>
                                <Col
                                    span={12}
                                    className='pbrCenterPanelCol pbrCenterBlockLeft'
                                >
                                    <p className='pbrCenterPanelHeader-para'>
                                        Preview
                                        <span>loremipsum23.pdf</span>
                                    </p>
                                </Col>
                                <Col
                                    span={12}
                                    className='pbrCenterPanelCol pbrCenterBlockRight'
                                >
                                    <div className='drawSnippet'>
                                        <EditOutlined />
                                        Draw Snippet
                                    </div>
                                    <div className='cropSnippet'>
                                        <img
                                            src={cropImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='undoSnippet'>
                                        <img
                                            src={undoImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='redoSnippet'>
                                        <img
                                            src={redoImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='contrastSnippet'>
                                        <img
                                            src={contrastImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='pbrCenterPdfBlock'>
                            <h4>Pdf Content</h4>
                            <iframe
                                width='100%'
                                height='500'
                                src='http://www.africau.edu/images/default/sample.pdf'
                            />
                        </div>
                    </div>
                </div>
                <div className='pbrTemplateRight'>
                    <div className='pbrPanel pbrRightPanel'>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={rightPanelCollapsed}
                        >
                            <span
                                className='trigger'
                                onClick={toggleRightCollapsed}
                            >
                                <img src={panelRightImg} className='panelImg' />
                            </span>
                            <Collapse
                                accordion
                                expandIconPosition='right'
                                defaultActiveKey={['1']}
                            >
                                <Panel header='Snippet Attributes' key='1'>
                                    <div className='snippetsBlock'>
                                        <Form
                                            layout='vertical'
                                            form={form}
                                            className='formNewTemplate'
                                        >
                                            <Form.Item
                                                label='Snippet ID'
                                                name='snippetId'
                                            >
                                                <Input placeholder='Enter Snippet ID' />
                                            </Form.Item>
                                            <Form.Item
                                                label='Key 1'
                                                name='key1'
                                            >
                                                <Input placeholder='Enter Key 1' />
                                            </Form.Item>
                                            <div className='secondary-flexBox'>
                                                <Form.Item label='X1' name='x1'>
                                                    <Input placeholder='Enter Value' />
                                                </Form.Item>
                                                <Form.Item label='Y1' name='y1'>
                                                    <Input placeholder='Enter Value' />
                                                </Form.Item>
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <Form.Item label='X2' name='x2'>
                                                    <Input placeholder='Enter Value' />
                                                </Form.Item>
                                                <Form.Item label='Y2' name='y2'>
                                                    <Input placeholder='Enter Value' />
                                                </Form.Item>
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <Form.Item
                                                    label='Area'
                                                    name='area'
                                                >
                                                    <Input placeholder='Enter Value' />
                                                </Form.Item>
                                            </div>
                                        </Form>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Sider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default paperBatchRecordsTemplate;
