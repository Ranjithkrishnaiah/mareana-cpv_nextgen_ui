import React, { lazy, useEffect } from 'react';
import {
    Route,
    useRouteMatch,
    Switch,
    Redirect,
    useHistory,
} from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar';
import HeaderBar from '../../components/Header';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import BreadCrumbWrapper from '../../components/BreadCrumbWrapper';
import './dashboard.scss';
import Auth from '../../utils/auth';

// DASHBOARD ROUTE COMPONENTS
const Home = lazy(() => import('./home'));
const ManualDataUpload = lazy(() => import('./manualDataUpload'));
const ChartPersonalization = lazy(() => import('./chartPersonalization'));

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
                <Sidebar />
                <Layout>
                    <HeaderBar />
                    <Content>
                        <BreadCrumbWrapper />
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
                                    key='chart_personalization'
                                    path={`${match.url}/chart_personalization`}
                                >
                                    <ChartPersonalization />
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
