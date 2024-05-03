import React, { Component } from 'react';
import './style.scss';
import {
    Transfer,
    Button,
    Input,
    Checkbox,
    Typography
} from 'antd';
import { withRouter } from 'react-router-dom';


const { Text } = Typography;
class CustomField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeScreen: this.props.changeScreen,
            targetKeys: this.props.tableColumns,
            mockData: this.props.tableColumns,

            screenChange: this.props.screenChange,
            addColumn: false
        };
    }
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    render() {


        return (

            <div>
                <div className="event-cards custom-data-configure">

                    <div item xs={12} container spacing={3}>
                        <div item xs={8}>
                            <Text variant="h6" >Customize Fileds</Text>
                        </div>

                        <div item xs={1}>
                            <Button variant="outlined" color="primary" onClick={() => window.location.reload()}>Cancel</Button>
                        </div>
                        <div item xs={1}>
                            <Button variant="outlined" color="primary" onClick={e => this.setState({ changeScreen: true })}>Back</Button>
                        </div>
                        <div item xs={1}>
                            <Button variant="outlined" color="primary">Save</Button>
                        </div>
                        <div item xs={1}>
                            <Button variant="outlined" color="primary">Publish</Button>
                        </div>
                    </div>
                    <div item xs={12} container spacing={2}>
                        <div item xs={6}>
                            <div className="event-cards custom-data-configure">
                                <div item xs={12} container spacing={2}>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        titles={['Available Columns', 'Selected Columns']}
                                        filterOption={this.filterOption}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.handleChange}
                                        onSearch={this.handleSearch}
                                        render={item => item.title}
                                        listStyle={{
                                            width: 265,
                                            height: 526,
                                            marginTop: 30,
                                            marginBottom: 30
                                        }}
                                    />
                                </div>
                                <Button variant="contained" color="primary" style={{ marginLeft: 350 }} onClick={e => this.setState({
                                    addColumn: true
                                })}>Add New Column</Button>
                            </div>
                        </div>
                        <div item xs={6}>
                            {this.state.addColumn ?
                                <div>
                                    <Text variant="h6">Add New Column</Text><br />
                                    <div className="event-cards custom-data-configure">
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Screen Name"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px' }}
                                                />
                                            </div>
                                            <div item xs={3}>
                                                <Input
                                                    id="re_mooe"
                                                    label="Status"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px', marginLeft: '100px' }}
                                                />
                                            </div>
                                        </div>
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Screen Name"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px' }}
                                                />
                                            </div>
                                            <div item xs={3}>
                                                <Input
                                                    id="re_mooe"
                                                    label="Status"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px', marginLeft: '100px' }}
                                                />
                                            </div>
                                        </div>
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Screen Name"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px' }}
                                                />
                                            </div>
                                            <div item xs={3}>
                                                <Input
                                                    id="re_mooe"
                                                    label="Status"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px', marginLeft: '100px' }}
                                                />
                                            </div>
                                        </div>
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Screen Name"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px' }}
                                                />
                                            </div>
                                            <div item xs={3}>
                                                <Input
                                                    id="re_mooe"
                                                    label="Status"
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '200px', marginLeft: '100px' }}
                                                />
                                            </div>
                                        </div>
                                        <Text variant="h6" style={{ marginTop: '30px' }}>Make Appropriate Selections</Text>
                                        <Checkbox />
                                        <Checkbox />
                                                
                                        <br />
                                        <Checkbox />
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Look Up Query"
                                                    fullWidth
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '350px' }}
                                                />
                                            </div>
                                        </div>
                                        <div item xs={12} container spacing={2}>

                                            <div item xs={3}>
                                                <Input
                                                    id="re_ps"
                                                    label="Column Info"
                                                    fullWidth
                                                    margin="dense"
                                                    variant="filled"
                                                    style={{ paddingRight: '2px', width: '350px' }}
                                                />
                                            </div>
                                        </div>

                                    </div></div> : <></>}
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default withRouter(CustomField);







