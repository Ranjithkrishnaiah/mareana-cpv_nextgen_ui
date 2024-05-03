import React from 'react';
import { Form, Input, Popconfirm, Switch } from 'antd';
import {
    PlusSquareOutlined,
    UnlockOutlined,
    LockOutlined,
    DeleteTwoTone
} from '@ant-design/icons';
import './styles.scss';

function ReportDesignerDynamicRow(props) {
    const { fieldKey } = props;

    const isEditableHandler = (prev, current, name, fieldKey) => {
        let res = prev['response']
        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

        let res_curr = current['response']
        let dynamic_rows_curr = res_curr[fieldKey] ? res[fieldKey] : []
        let dynamic_rows_row_curr = dynamic_rows_curr['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
        let value_curr = dynamic_rows_row_curr[name] ? dynamic_rows_row[name] : []
        return value_curr ? value_curr : false
    }

    return (
        <Form.List name={[fieldKey, 'dymamic_rows']}>
            {(rows, { add, remove }) => (
                <>
                    {rows.map(({ key, name, ...restField1 }) => (
                        <tr
                            className="dynamicSections-spaceRows"
                            key={key} >
                            <td>
                                <Form.Item>
                                    <PlusSquareOutlined style={{ color: '#093185' }} onClick={() => add()} />
                                </Form.Item>
                            </td>
                            <td >
                                <Form.Item
                                    {...restField1}
                                    shouldUpdate={(prevValues, currentValues) => isEditableHandler(prevValues, currentValues, name, fieldKey)
                                    }
                                >
                                    {({ getFieldValue }) => {
                                        let res = getFieldValue('response')
                                        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
                                        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
                                        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

                                        return value['editable'] === true ? (
                                            <Form.Item name={[name, 'keyName']} >
                                                <Input.TextArea allowClear autoSize={true} placeholder="Enter Key" name={[name, 'keyName']} disabled  />
                                            </Form.Item>
                                        ) : (
                                            <Form.Item name={[name, 'keyName']} >
                                                <Input.TextArea bordered allowClear autoSize={true} placeholder="Enter Key" className="ant-input-textarea" bordered={true} disabled={props.show} />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                            </td>
                            <td >
                                <Form.Item
                                    {...restField1}
                                    shouldUpdate={(prevValues, currentValues) => isEditableHandler(prevValues, currentValues, name, fieldKey)
                                    }
                                >
                                    {({ getFieldValue }) => {
                                        let res = getFieldValue('response')
                                        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
                                        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
                                        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

                                        return value['editable'] === true ? (
                                            <Form.Item name={[name, 'value']} >
                                                <Input.TextArea bordered allowClear autoSize={true} placeholder="Enter Value" name={[name, 'value']} disabled />
                                            </Form.Item>
                                        ) : (
                                            <Form.Item name={[name, 'value']} >
                                                <Input.TextArea bordered allowClear autoSize={true} placeholder="Enter Value" bordered={true} disabled={props.show} className="ant-input-textarea" />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                            </td>
                            <td >
                                <Popconfirm title="Are you Sure you want to delete?" onConfirm={() => remove(name)} disabled={props.show} >
                                    <DeleteTwoTone twoToneColor="red" disabled={props.show} />
                                </Popconfirm>
                            </td>
                            <td >
                                <Form.Item {...restField1} name={[name, 'editable']} valuePropName="checked" defaultChecked>
                                    <Switch defaultChecked={false} size="small" disabled={props.show} />
                                </Form.Item>
                            </td>
                            <td >
                                <Form.Item
                                    {...restField1}
                                    shouldUpdate={(prevValues, currentValues) => isEditableHandler(prevValues, currentValues, name, fieldKey)
                                    }
                                >
                                    {({ getFieldValue }) => {
                                        let res = getFieldValue('response')
                                        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
                                        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
                                        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

                                        return value['editable'] === true ? (
                                            <LockOutlined style={{ fontSize: '16px' }} />
                                        ) : (
                                            <UnlockOutlined style={{ fontSize: '16px' }} />
                                        )
                                    }}
                                </Form.Item>
                            </td>
                        </tr>
                    ))}
                    <Form.Item>
                        <PlusSquareOutlined style={{ color: '#093185' }} onClick={() => add()} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default ReportDesignerDynamicRow;
