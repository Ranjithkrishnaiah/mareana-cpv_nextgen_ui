import React, { Component } from 'react';
import './style.scss';
import { API_CPV_URL } from '../../../../constants/apiBaseUrl';
import { dataLoadUpload } from '../../../../duck/actions/fileUploadAction';
import PublishScreen from './publishScreen';
import { Upload, message, Spin, Typography, Button } from 'antd';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            selectedIssueType: '',
            showLoader: false,
            changeScreen: true,
            feedback: '',
            toastMessage: '',
            toastOpen: false,
            selectedFile: null,
            selectedFileList: [],
            downloadData: [],
            initialColumns: [],
            checkedColumns: [],
            visibleMenuSettings: false,
            tableColumns: [],
        };
    }

    onDrop = (files) => {
        var formData = new FormData();
        formData.append('file', files[0]);
        this.setState({ showLoader: true });
        fetch(API_CPV_URL + '/uploadFile', {
            method: 'POST',
            body: formData,
        }).then((res) => {
            if (res.ok) {
                this.setState({
                    toastMessage: 'File uploaded successfully.',
                    toastOpen: true,
                    showLoader: false,
                });
            }
        });
    };

    componentDidMount = () => {};

    // handleClose = () => {
    //     this.setState({ toastOpen: false });
    //     if (this.props.hasOwnProperty('changePage')) {
    //         this.props.changePage();
    //     }
    // };

    onChange = (info) => {
        console.log('info', info);
        const nextState = {};
        if (
            info.file.type !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            info.file.type !== 'application/vnd.ms-excel'
        ) {
            message.error(`${info.file.name} is not excel or csv file`);
        } else {
            if (info.file.status === 'uploading') {
                nextState.selectedFileList = [info.file];
            } else if (info.file.status === 'done') {
                message.error(`${info.file.name} Uploaded`);
                nextState.selectedFileList = [info.file];
                var formData = new FormData();
                formData.append('file', info.file.originFileObj);
                formData.append('sourcename', 'source');
                formData.append('username', localStorage.getItem('username'));
                console.log('filenameeeeeeeeeeeeee2', formData, info.file);
                dataLoadUpload(formData).then((res) => {
                    console.log('response', res);
                    let column_response;
                    if (res['0']) {
                        column_response = res['0'];

                        console.log(column_response);

                        let column_arr = Object.keys(column_response).map(
                            (item, index) => {
                                let obj = {};
                                obj['key'] = index;
                                obj['title'] = item;
                                obj['description'] = item;

                                return obj;
                            }
                        );

                        console.log(column_arr);

                        this.setState({
                            tableColumns: column_arr,
                            toastOpen: false,
                            showLoader: false,
                            onChangeRes: res.message,
                            onChangeStatus: res.statuscode,
                            toastVariant: 'success',
                            uploadFilesResponse: res,
                            nextStepDisabled: false,
                            primaryFileId: res.file_pointer,
                            changeScreen: false,
                        });
                    }
                    if (
                        Object.keys(res).length === 0 &&
                        res.constructor === Object
                    ) {
                        this.setState({
                            toastOpen: true,
                            toastVariant: 'error',
                            toastMessage: 'Empty File',
                        });
                    }
                });
            } else if (info.file.status === 'removed') {
                console.log('remove');
                nextState.selectedFileList = [];
            }
        }

        this.setState(() => nextState);
    };

    onChangeOutput = (e, table) => {
        var checkedColumns = this.state.checkedColumns;
        if (e.target.checked) {
            checkedColumns = checkedColumns.filter((id) => {
                return id !== e.target.id;
            });
        } else if (!e.target.checked) {
            checkedColumns.push(e.target.id);
        }

        var filtered = this.state.initialColumns;
        for (var i = 0; i < checkedColumns.length; i++)
            filtered = filtered.filter((el) => {
                return el.dataIndex !== checkedColumns[i];
            });
        this.setState({ columns: filtered, checkedColumns });
    };

    render() {
        const { toastOpen, toastMessage, showLoader } = this.state;
        const uploadFileProps = {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
        };
        return (
            <div className='bg-white'>
                {showLoader && <Spin />}

                <div className='custom-overview'></div>
                <div className='div-card custom-data-configure'>
                    <Typography variant='h5'>Data Load</Typography>
                    {this.state.changeScreen ? (
                        <div>
                            <div className='plan-sections download-template'>
                                <div className='fileuploader-input'>
                                    <div className='fileuploader-input-inner'>
                                        <i className='material-icons button-icons upload-icon'>
                                            cloud_upload
                                        </i>
                                        <h5 className='fileuploader-input-caption'>
                                            <span>Choose file to upload</span>
                                        </h5>
                                        <Upload
                                            {...uploadFileProps}
                                            maxCount={1}
                                            fileList={
                                                this.state.selectedFileList
                                            }
                                            customRequest={dummyRequest}
                                            onChange={this.onChange}
                                        >
                                            <Button
                                                variant='contained'
                                                color='primary'
                                            >
                                                Select files
                                            </Button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <PublishScreen
                            screen={this.state.changeScreen}
                            tableColumns={this.state.tableColumns}
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default Uploader;
