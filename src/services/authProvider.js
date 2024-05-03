// import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// // Msal Configurations
// const msalConfig = {
//   auth: {
//     authority: 'https://login.microsoftonline.com/common',
//     clientId: '016b5077-e449-47f3-991d-098c6ded6ede',
//     redirectUri: 'http://localhost:3000/'
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: false
//   }
// };
 
// // Authentication Parameters
// const authenticationParameters = {
//   scopes: [
//     'user.read'
//   ]
// }
 
// // Options
// const options = {
//   loginType: LoginType.Popup,
//   tokenRefreshUri: window.location.origin + '/auth.html'
// }
 
// export const authProvider = new MsalAuthProvider(msalConfig, authenticationParameters, options)


export const msalConfig = {
  auth: {
      authority: 'https://login.microsoftonline.com/mareana.com',
      clientId: '016b5077-e449-47f3-991d-098c6ded6ede',
      redirectUri: 'https://bms-cpvdev.mareana.com/#/user/login'
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
};