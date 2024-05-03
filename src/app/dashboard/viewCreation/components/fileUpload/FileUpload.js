// Ranjith K
// Mareana Software
// Version 1
// Last modified - 08 March, 2022
import React, { useEffect, useState } from 'react';

import './styles.scss';
import {
    DeleteOutlined,
    DownloadOutlined,
    InboxOutlined,
    PlusSquareOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    Button,
    Collapse,
    Modal,
    Popconfirm,
    Table,
    Tag,
    Upload,
    message,
    Tooltip,
} from 'antd';

import {
    adHocFileUpload,
    adHocFilesParameterTree,
    deleteAdHocFile,
    downloadAdhocFile,
} from '../../../../../duck/actions/fileUploadAction';
const { Panel } = Collapse;
const { Dragger } = Upload;

function FileUpload(props) {
    const {
        viewSummaryTable,
        setViewSummaryTable,
        parentBatches,
        setParentBatches,
        newBatchData,
        setNewBatchData,
        functionEditorViewState,
        setFunctionEditorViewState,
        filesListTree,
        setFilesListTree,
        count,
        setCount,
        getNewData
    } = props;

    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true);
    const [selectedAdHocFileList, setSelectedAdHocFileList] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState();

    const columns = [
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            render: (param) => (
                <Tooltip title={param}>
                    <Tag color='geekblue' className='parameter-tag'>
                        {param}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Batch',
            key: 'coverage_metric_percent',
            dataIndex: 'coverage_metric_percent',
        },
        {
            title: 'Coverage',
            key: 'coverage_metric',
            dataIndex: 'coverage_metric',
        },
        {
            title: '',
            key: 'add',
            dataIndex: 'add',
            render: (text, record, index) => (
                <>
                    <span
                        className='material-addIcon'
                        onClick={() => {
                            parameterPassHandler(record, index);
                        }}
                    >
                        <PlusSquareOutlined />
                    </span>
                </>
            ),
        },
    ];

    const parameterPassHandler = (record, index) => {
        let rowData = {};
        let batchData = {};
        let newBatchData = [];


        parentBatches.map((el, index) => {
            if (record.coverage_list.includes(el)) {
                batchData[el] = true;
                newBatchData[el] = true;
            } else {
                batchData[el] = false;
                newBatchData[el] = false; 
            }
        });

        batchData['id']= count;
        setCount(count+1);

        //check for duplicate records
        const indexDuplicate = viewSummaryTable.findIndex(
            (x) => x.param == record.param
        );
        if (indexDuplicate === -1) {
            rowData = Object.assign(record, batchData);
            rowData.sourceType = 'file'
            rowData.file_id = record.File_id
            rowData.parameters = [rowData];
            getNewData(rowData);
            let data = [...viewSummaryTable];
            data.push(rowData);
            setNewBatchData(newBatchData);
            setViewSummaryTable([...data]);
            setFunctionEditorViewState(true);
        } else {
            message.error('Function already exists');
        }
    };
    const genExtra = (File_id) => (
        <div
            className='fileUpload-panelHeader'
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <span className='fileUpload-download'>
                <a
                    href={
                        'https://bms-cpvdev.mareana.com/services/v1/download_file?file_id=' +
                        `${File_id}`
                    }
                >
                    <DownloadOutlined />
                </a>
                {/* <DownloadOutlined onClick={() => downloadFile(File_id)} /> */}
            </span>
            <span className='fileUpload-delete'>
                <Popconfirm
                    placement='right'
                    title={
                        <div className='fileUpload-deletePopover'>
                            <h4>Are you sure to delete this file?</h4>
                            <p>This action is not reversible</p>
                        </div>
                    }
                    onConfirm={() => confirm(File_id)}
                    okText='Yes'
                    cancelText='No'
                >
                    <DeleteOutlined />
                </Popconfirm>
            </span>
        </div>
    );

    function confirm(File_id) {
        let req = {
            fileid: parseInt(File_id),
            userid: 'demo',
        };
        deleteAdHocFile(req).then((res) => {
            if (res.data.statuscode === 202) {
                message.success('adhoc-file deleted successfully');
                const updatedFileList = filesListTree.filter(
                    (item) => item.File_id !== File_id
                );
                setFilesListTree(updatedFileList);
            }
            if (res.data.statuscode === 400) {
                message.error(res.data.message);
            }
            if (res.data.statuscode === 401) {
                message.error('UnAuthorized User');
            }
            if (res.data.statuscode === 403) {
                message.error(res.data.message);
            }
            if (res.data.statuscode === 404) {
                message.error(res.data.message);
            }
        });
    }

    const handleCancelUpload = () => {
        setUploadModalVisible(false);
    };

    const onClickUpload = () => {
        setUploadModalVisible(true);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const adHocFileUploadprops = {
        multiple: false,
        progress: {
            strokeColor: {
                '0%': '#52C41A',
                '100%': '#52C41A',
            },
            strokeWidth: 8,
            showInfo: true,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const onChange = (info) => {
        var today = new Date();
        today.setDate(today.getDate());
        const nextState = {};
        if (
            info.file.type !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            info.file.type !== 'application/vnd.ms-excel'
        ) {
            message.error(`${info.file.name} is not excel or csv file`);
        } else {
            if (info.file.status === 'uploading') {
                setSelectedAdHocFileList([info.file]);
                nextState.selectedAdHocFileList = [info.file];
            } else if (info.file.status === 'done') {
                setSelectedAdHocFileList([info.file]);
                nextState.selectedAdHocFileList = [info.file];
                var formData = new FormData();
                formData.append('created_on', today.toISOString().slice(0, 10));
                formData.append('file_name', info.file.originFileObj);
                formData.append('upload_reason', 'test_reason');
                formData.append('username', localStorage.getItem('username'));
                adHocFileUpload(formData).then((res) => {
                    if (res.Status === 202) {
                        message.success(res.Message);
                        setUploadBtnDisabled(false);
                        setSelectedFileId(res.File_id);
                    }
                    if (res.Status === 400) {
                        message.error(res.Message);
                        setUploadBtnDisabled(true);
                    }
                    if (res.Status === 401) {
                        message.error('UnAuthorized User');
                        setUploadBtnDisabled(true);
                    }
                });
            } else if (info.file.status === 'removed') {
                setSelectedAdHocFileList([]);
                setUploadBtnDisabled(true);
            }
        }
    };

    const handleSubmitUpload = () => {
        setSelectedAdHocFileList([]);
        setUploadModalVisible(false);
        setUploadBtnDisabled(true);
        let req = { file_id: selectedFileId, detailedCoverage: true };
        adHocFilesParameterTree(req).then((res) => {
            const date = new Date();
            res.timeStamp =  date.toISOString();
            setFilesListTree([...filesListTree, res]);
            if (res.Status === 404) {
                message.error(res.Message);
            }
            if (res.Status === 401) {
                message.error('UnAuthorized User');
            }
        });
    };
    return (
        <div className='materials-wrapper fileUpload-wrapper'>
            <div className='materials-uploadDownloadFiles'>
                <div className='materials-uploadFiles'>
                    <Button icon={<UploadOutlined />} onClick={onClickUpload}>
                        Upload
                    </Button>
                </div>
                <div className='materials-downloadFiles'>
                    <Button type='text' className='viewCreation-downloadBtn'>
                        <a
                            href={require('../../../../../assets/xlsx/template_view_file_upload.xlsx')}
                            download='template_view_file_upload.xlsx'
                        >
                            <DownloadOutlined /> Download Template
                        </a>
                    </Button>
                </div>
            </div>

            <Collapse
                accordion
                className='materials-accordion fileUpload-accordion'
                expandIconPosition='right'
            >
                {filesListTree.map((item, index) => {
                    item.Data.forEach((ele) => {
                        ele.file_id =  item.File_id
                    })
                    return (
                        <Panel
                            className='materials-panel fileUpload-panel'
                            header={
                                <span className='panelHeader_span'>
                                    {item.File_name.substr(
                                        0,
                                        item.File_name.lastIndexOf('.')
                                    )}
                                </span>
                            }
                            extra={genExtra(item.File_id)}
                            key={index}
                        >
                            <Table
                                className='viewSummary-table fileList-table borderless-table'
                                pagination={false}
                                columns={columns}
                                dataSource={item.Data}
                                rowKey={(record, index) => index}
                            />
                        </Panel>
                    );
                })}
            </Collapse>

            <Modal
                className='fileUploadModal'
                title='File Upload'
                maskClosable={false}
                visible={uploadModalVisible}
                onCancel={handleCancelUpload}
                footer={[
                    <Button key='cancel' onClick={handleCancelUpload}>
                        Cancel
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        onClick={handleSubmitUpload}
                        disabled={uploadBtnDisabled}
                    >
                        Upload
                    </Button>,
                ]}
            >
                <div className='fileUploadModal-draggerContainer'>
                    <Dragger
                        {...adHocFileUploadprops}
                        fileList={selectedAdHocFileList}
                        customRequest={dummyRequest}
                        onChange={onChange}
                    >
                        <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>
                            Click or drag file to this area to upload
                        </p>
                        <p className='ant-upload-hint'>
                            Support for a single upload. Strictly prohibit from
                            uploading company data or other band files
                        </p>
                    </Dragger>
                </div>
            </Modal>
        </div>
    );
}

export default FileUpload;
