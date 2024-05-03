import React from 'react';
import { Form, Input, Space, Popconfirm } from 'antd';
import { PlusSquareTwoTone, DeleteTwoTone ,PlusSquareOutlined} from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';

function ReportDesignerDynamicSections(props) {

    const { formData } = props;

    return (
        <div className="reportDesigner-dynamicSections bg-white">
            <h6 className="dynamicSections-noteHeadline">Note</h6>
            <ul className="dynamicSections-ul">
                <li>
                    To Create multiple sections, Please click on Add Multiple Sections
                </li>
                <li style={{ marginTop: '10px' }}>To Create multiple rows, Please click on plus icon in the row</li>
            </ul>

            <div className="dynamicSections-container">
                <div className="dynamicSections-section">
                    <div className="dynamicSections-block">
                        <Form.List name={["response"]}>
                            {(fields, { add, remove }) => (

                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div>
                                            <Form.Item {...restField} name={[name, 'sectionName']}>
                                                <Input placeholder="Section" style={{ marginLeft: '400px' }} className="input-section" disabled={props.show}/>
                                                </Form.Item>
                                                    <span class="Legend-colorBox" style={{ backgroundColor: '#BAE7FF',marginRight:'10px' , marginLeft:'720px',fontSize:'12px' }}>
                                                    </span>
                                                    <span class="Legend-label" style={{marginBottom:'10px',fontSize:'12px'}}>
                                                        Edit
                                                    </span>
                                                    <span class="Legend-colorBox" style={{ backgroundColor: '#F5F5F5' ,marginLeft:'20px',fontSize:'12px'}}>
                                                    </span>
                                                    <span class="Legend-label" style={{marginLeft:'10px',fontSize:'12px'}}>
                                                        View Only
                                                    </span>                                            
                                            
                                            <Space
                                                className="dynamicSections-spaceSection"
                                                key={key}
                                                style={{ display: 'flex', justifyContent: 'center' }}
                                                align="baseline"
                                            >
                                                <table className="dynamicSections-table" style={{ width: '800px' }}>
                                                    <thead className="dynamicSections-thead">
                                                        <tr>
                                                        <th></th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                            <th>Action</th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="dynamicSections-tbody">
                                                        <tr><td></td></tr>
                                                        <ReportDesignerDynamicRow fieldKey={name} show={props.show}/>
                                                    </tbody>
                                                </table>
                                                <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                                    <DeleteTwoTone twoToneColor="red" style={{marginBottom:'100px'}} />
                                                </Popconfirm>
                                            </Space>
                                        </div>
                                    ))}
                                    <Form.Item >
                                        <p disabled={props.show}>
                                            <PlusSquareOutlined  style={{ fontSize: '16px', marginLeft: '10px' ,color:'#093185'}} onClick={() => add()} /> <u disabled={props.show}>Add Multiple Sections</u>
                                        </p>

                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportDesignerDynamicSections;
