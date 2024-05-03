// # Binkita Tiwari
// # Mareana Software
// # Version 1
// # Last modified - 8 Mar 2022
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../duck/actions/commonActions';
import { getCountData, getTableData } from '../../../../services/workFlowServices';
import { Card, Empty, Tabs } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, } from '@ant-design/icons';
import DashCard from '../../../../components/CardComponent/customCard';
import illustrations from '../../../../assets/images/Banner illustration.svg';
import WorkflowTable from './workflowTable/workflowTable';
import './styles.scss';


const { TabPane } = Tabs;
const Workflow = () => {
    const [itemCount, setItemCount] = useState();
    const [cardTitle, setCardTitle] = useState('');
    const [indexCount, setIndexCount] = useState(0);
    const [resultDate, setResultDate] = useState('');
    const [tilesData, setTilesData] = useState([]);
    const [activeDiv, setActiveDiv] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [activeTab, setActiveTab] = useState("1");
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getTilesData();
        updateDate();
    }, []);

    useEffect(() => {
        if (cardTitle != '') {
            cardTableData();
        }
    }, [cardTitle, activeTab])

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year
        setResultDate(resultDate);
    }

    const cardTableData = async () => {
        let req;
        if (itemCount != 0) {
            if (activeTab === "1") {
                req = `/${applicationType}/awaiting_approval`
            } else {
                req = `/${applicationType}/recently_approved`
            }
            try {
                dispatch(showLoader());
                const tableResponse = await getTableData(req);
                if (tableResponse['status-code'] === 200) {
                    setColumns(tableResponse.Data.config);
                    setDataSource(tableResponse.Data.data);
                    dispatch(hideLoader());
                }
                else if (tableResponse['status-code'] === 404) {
                    setColumns(tableResponse.Data.config);
                    setDataSource(tableResponse.Data.data);
                    dispatch(hideLoader());
                    dispatch(showNotification('error', tableResponse.Message));
                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showNotification('error', error.Message));
            }
        }

    }
    const getTilesData = async () => {
        let req = {};
        try {
            dispatch(showLoader());
            const tilesResponse = await getCountData(req);
            setTilesData(tilesResponse['Data']);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    }

    const tilesClicked = (item, index) => {
        setItemCount(item.item_count);
        setIndexCount(index);
        setCardTitle(item.text);
        setActiveDiv(item.text);
        setApplicationType(item.application_type);
    }

    const changeTab = activeKey => {
        setActiveTab(activeKey);
    };

    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Workflow</span>

                </div>
            </div>
            <div className='custom-content-layout'>
                <Card className='workflow_head'>
                    <div>
                        <p className='dash-username'>Hello {(localStorage.getItem('user'))}!</p>
                        <p className='dash-text'>Today is a great day to approve some records! Let's take look.</p>
                    </div>
                    <img src={illustrations} className='illustration' />
                    <span className='resultdate'>{resultDate}</span>

                </Card>
                <div className='workflow_items' style={{ width: '305px' }}>
                    {
                        <div className='approve-wrapper'>
                            {tilesData.map((item, index) => {
                                return (

                                    <div onClick={() => tilesClicked(item, index)} style={{ cursor: 'pointer' }}>
                                        <DashCard count={item.item_count} desc={item.text} active={activeDiv} />
                                    </div>


                                )
                            })}
                        </div>
                    }
                    {itemCount > 0 ? (
                        // <Card title={<div className='table-head'>{cardTitle}<DownloadOutlined style={{ color: '#093185', marginLeft: '25px', fontSize: '20px' }} /></div>} className='table-cards'>
                        //     <Tabs className='workflow-tabs' activeKey={activeTab} onChange={changeTab}>
                        //         <TabPane tab="Awaiting Approval" key="1">
                        //             <WorkflowTable columns={columns} dataSource={dataSource} activeTab={activeTab} />
                        //         </TabPane>
                        //         <TabPane tab="Recently Approved" key="2">
                        //             <WorkflowTable columns={columns} dataSource={dataSource} activeTab={activeTab} />
                        //         </TabPane>
                        //     </Tabs>
                        // </Card>
                        <div className='approval-table-block'>
                            <div className={`card-arrow arrow-step-${indexCount}`}>
                                {' '}
                            </div>
                            <Card
                                className='table-cards '
                                title={
                                    <div className='table-head'>
                                        {cardTitle}
                                        <DownloadOutlined
                                            style={{
                                                color: '#093185',
                                                marginLeft: '25px',
                                                fontSize: '20px',
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <Tabs
                                    className='workflow-tabs'
                                    activeKey={activeTab}
                                    onChange={changeTab}
                                >
                                    <TabPane tab='Awaiting Approval' key='1'>
                                        <WorkflowTable
                                            columns={columns}
                                            dataSource={dataSource}
                                            activeTab={activeTab}
                                        />
                                    </TabPane>
                                    <TabPane tab='Recently Approved' key='2'>
                                        <WorkflowTable
                                            columns={columns}
                                            dataSource={dataSource}
                                            activeTab={activeTab}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    ) :
                        (
                            <Empty
                                className='empty-workflow'
                                description={
                                    <span>
                                        Please select one to view its approvals
                                    </span>
                                } />
                        )}

                </div>

            </div>

        </div>
    )
}

export default Workflow;