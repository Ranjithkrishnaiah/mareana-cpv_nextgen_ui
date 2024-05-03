import './dashboard.scss';

import React, { lazy, useEffect } from 'react';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';

import Auth from '../../utils/auth';
import BreadCrumbWrapper from '../../components/BreadCrumbWrapper';
import HeaderBar from '../../components/Header';
import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import Uploader from './dataLoad/index';
import Pbr from './paperBatchRecords';
import PaperBatchRecords from './paperBatchRecords';
import PaperBatchRecordsTemplate from './paperBatchRecordsTemplate';

// DASHBOARD ROUTE COMPONENTS
const Home = lazy(() => import('./home'));
const ManualDataUpload = lazy(() => import('./manualDataUpload'));
const ChartPersonalization = lazy(() => import('./chartPersonalization'));
const SystemErrorReport = lazy(() => import('./systemErrorReport'));
const ViewCreation = lazy(() => import('./viewCreation'));

const DataLoad = lazy(() => import('./dataLoad'));
const ReportDesigner = lazy(() => import('./reportDesigner'));
const AuditTrial = lazy(() => import('./auditTrial'));
const ReportGenerator = lazy(() => import('./reportGenerator'));
const Workflow = lazy(() => import('./wokflow'));
const Genealogy = lazy(() => import('./genealogy'));
const { Content } = Layout;

const Dashboard = () => {
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        if (!Auth.isAuthenticated()) {
            history.push('/user/login');
        }
    }, [history]);
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderBar />
                <Layout>
                    <Sidebar />
                    <Content>
                        {/* <BreadCrumbWrapper /> */}
                        <SuspenseWrapper>
                            <Switch>
                                <Route key='home' path={`${match.url}/home`}>
                                    <Home />
                                </Route>
                                <Route
                                    key='manual_data_upload'
                                    path={`${match.url}/manual_data_upload`}
                                >
                                    <ManualDataUpload />
                                </Route>
                                <Route
                                    key='view_creation'
                                    path={`${match.url}/view_creation`}
                                >
                                    <ViewCreation />
                                </Route>
                                <Route
                                    key='chart_personalization'
                                    path={`${match.url}/chart_personalization`}
                                >
                                    <ChartPersonalization />
                                </Route>
                                <Route
                                    key='system_error_report'
                                    path={`${match.url}/system_error_report`}
                                >
                                    <SystemErrorReport />
                                </Route>
                                <Route
                                    key='data_load'
                                    path={`${match.url}/data_load`}
                                >
                                    <DataLoad />
                                </Route>
                                <Route
                                    key='report_designer'
                                    path={`${match.url}/report_designer`}
                                >
                                    <ReportDesigner />
                                </Route>
                                <Route
                                    key='audit_trail_report'
                                    path={`${match.url}/audit_trail_report`}
                                >
                                    <AuditTrial />
                                </Route>
                                <Route
                                    key='report_generator'
                                    path={`${match.url}/report_generator`}
                                >
                                    <ReportGenerator />
                                </Route>
                                <Route
                                    key='genealogy'
                                    path={`${match.url}/genealogy`}
                                >
                                    <Genealogy />
                                </Route>
                                <Route
                                    key='workflow'
                                    path={`${match.url}/workflow`}
                                >
                                    <Workflow />
                                </Route>
                                <Route
                                    key='paper_batch_records'
                                    path={`${match.url}/paper_batch_records`}
                                >
                                    <PaperBatchRecords />
                                </Route>
                                <Route
                                    key='paper_batch_records_template'
                                    path={`${match.url}/pbr_template`}
                                >
                                    <PaperBatchRecordsTemplate />
                                </Route>

                                <Route key='redirect'>
                                    <Redirect to={`${match.url}/dashboard`} />
                                </Route>
                            </Switch>
                        </SuspenseWrapper>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Dashboard;
