// import { setWithExpiry, getWithExpiry } from './commonUtils';
let authStatus = false;
const Auth = {
    login: ({ accessToken, username, refreshToken }) => {
        authStatus = true;
        // set user token with expiry of 3 days
        // setWithExpiry("user_details", {accessToken, username, refreshToken}, 259200);
        localStorage.setItem('user_details', JSON.stringify({accessToken, username, refreshToken}));
        localStorage.setItem('user',username);
    },
    logout: (callback) => {
        authStatus = false;
        localStorage.clear();
        callback();
    },
    isAuthenticated: () => {
    // const user_details = getWithExpiry("user_details");
        const user_details = JSON.parse(localStorage.getItem('user_details'));
        if (user_details) {
            const jwt = user_details.accessToken;
            const jwtRefresh = user_details.refreshToken;
            if (!jwt) {
                authStatus = false;
                if (!jwtRefresh) {
                    authStatus = false;
                } else {
                    authStatus = true;
                }
            } else {
                authStatus = true;
            }
        }
        return authStatus;
    },
};

export default Auth;
