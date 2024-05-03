import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import SuspenseWrapper from '../../components/SuspenseWrapper';

const Login = lazy(() => import('./login'));

const User = () => {
    const match = useRouteMatch();
    return (
        <SuspenseWrapper>
            <Switch>
                <Route path={`${match.url}/login`}>
                    <Login />
                </Route>
            </Switch>
        </SuspenseWrapper>
    );
};

export default User;
