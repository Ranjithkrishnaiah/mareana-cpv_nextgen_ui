import React, { Component } from 'react';
import { Typography, Button, Checkbox, Input } from 'antd';
import './style.scss';
import CustomField from './customFields';
import { saveRecord } from '../../../../duck/actions/filterAction';

class PublishScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenChange: true,
            isDisplayed: true,
            screenNameKey: 'screenName',
            screenName: '',
            selectedStatus: '',
            statusList: [],
            screenWidth: '',
            editType: '',
            fixedLeftColumn: '',
            commentSection: '',
            screenId: 1,
            tableColumns: this.props.tableColumns,
        };
    }
    toggleScreen = () => {
        this.setState((state) => ({ isDisplayed: !state.isDisplayed }));
    };

    saveData = async () => {
        let req = {
            appId: 'BMS',
            columnValues: [
                ///pass the new updated value of column in which new value is changed
                {
                    columnName: 'key',
                    columnvalue: this.state.screenNameKey,
                    dataType: 'string',
                },
                {
                    columnName: 'screen_id',
                    columnvalue: this.state.screenId,
                    dataType: 'int',
                },
                {
                    columnName: 'value',
                    columnvalue: this.state.screenName,
                    dataType: 'text',
                },
            ],
            // ids: [ //unique value
            //     {
            //         columnName: "screen_id",
            //         columnvalue: this.state.screenId,
            //         dataType: "int"
            //     }
            // ],
            operation: 'INSERT',
            resultsetId: 'screen_details_data',
        };

        let res = await saveRecord(req);

        console.log(res);
    };
    render() {
        return (
            <div>
                {this.state.screenChange ? (
                    <div>
                        <div className='event-cards custom-data-configure'>
                            <div>
                                <div>
                                    <Typography variant='h6'>
                                        Customize Publish Screen
                                    </Typography>
                                </div>

                                <div>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => window.location.reload()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={this.saveData}
                                    >
                                        Save
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={(e) =>
                                            this.setState({
                                                screenChange: false,
                                            })
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <Typography
                                        style={{
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        Screen ID : 1{' '}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        style={{
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        Version : 1.1
                                    </Typography>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <Input
                                        id='re_ps'
                                        label='Screen Name'
                                        margin='dense'
                                        variant='filled'
                                        value={this.state.screenName}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            this.setState({
                                                screenName: value,
                                            });
                                        }}
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='re_mooe'
                                        label='Status'
                                        margin='dense'
                                        value={this.state.selectedStatus}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            this.setState({
                                                selectedStatus: value,
                                            });
                                        }}
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='re_co'
                                        label='Screen Width'
                                        margin='dense'
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Input
                                        id='re_ps'
                                        margin='dense'
                                        label='Edit Type'
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='re_mooe'
                                        label='Fixed Left Columns'
                                        margin='dense'
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='re_co'
                                        label='Fixed Left Columns'
                                        margin='dense'
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Input
                                        id='re_ps'
                                        margin='dense'
                                        label='Comment section name'
                                        variant='filled'
                                        style={{
                                            paddingRight: '2px',
                                            width: '250px',
                                        }}
                                    />
                                </div>
                            </div>

                            <Typography
                                variant='h6'
                                style={{ marginTop: '30px' }}
                            >
                                Make Appropriate Selections
                            </Typography>
                            <Checkbox />

                            <Checkbox />
                            <Checkbox />

                            <br />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />

                            <br />

                            <Checkbox />

                            <Checkbox />
                            <Checkbox />
                        </div>
                    </div>
                ) : (
                    <CustomField
                        tableColumns={this.state.tableColumns}
                        screenChange={this.state.screenChange}
                    />
                )}
            </div>
        );
    }
}
export default PublishScreen;
