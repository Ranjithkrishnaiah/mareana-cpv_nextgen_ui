import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from './app';
import configureStore, { history } from './duck/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'antd/dist/antd.min.css';
// import { PublicClientApplication } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';
// import { msalConfig } from './services/authProvider';

// const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
    <>
        {/* <React.StrictMode> */}
        {/* <MsalProvider instance={msalInstance}> */}
        <Provider store={configureStore()}>
            <ConnectedRouter history={history}>
                <Route>
                    <App />
                </Route>
            </ConnectedRouter>
        </Provider>
        {/* </MsalProvider> */}
        {/* </React.StrictMode> */}
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
