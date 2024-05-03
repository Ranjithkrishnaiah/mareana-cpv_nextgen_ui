export const API_AUTOCOMPLETE_URL = 'http://swagger.mareana.com/v1.0';

//cpv python
export const API_PLOT_URL = `${process.env.REACT_APP_PYTHON_API_URL + '/v1/cpvpython/'}`;

//platform auth & platform resultset
export const API_AUTHENTICATION_URL = `${process.env.REACT_APP_PLATFORM_API_URL + '/prismmicro-authentication'}`;
export const API_RESULTSET_URL = `${process.env.REACT_APP_PLATFORM_API_URL + '/prismmicro-resultset'}`;


//java service - report designer
export const API_CPV_URL = `${process.env.REACT_APP_JAVA_API_URL + '/api'}`;

// java service - mdh genealogy
export const API_APPLICATION_MDH = `${process.env.REACT_APP_MDH_API_URL}`;

//MVA Analysis Jupyter
export const MVA_ANALYSIS_JUPYTER = `${process.env.REACT_APP_JUPYTER_APP_URL + ' /notebooks/MVA_Demo.ipynb'}`;

//MVA Analysis Jupyter
export const RCA_ANALYSIS_JUPYTER = `${process.env.REACT_APP_JUPYTER_APP_URL + '/notebooks/RCA_Demo.ipynb'}`;

//data science studio jupyter
export const JUPYTER_NOTEBOOK = `${process.env.REACT_APP_JUPYTER_APP_URL + '/notebooks'}`;

//grafana dashboard
export const GRAFANA_DASHBOARD = `${process.env.REACT_APP_GRAFANA_APP_URL + '/grafana/'}`;

//Real Time MVA
export const REAL_TIME_MVA = `${process.env.REACT_APP_JAVA_API_URL + '/grafana/d/fW71CAI7z/?kiosk'}`;

//job-screen hue
export const HUE_JOB_DASHBOARD = `${process.env.REACT_APP_HUE_JOB_URL + '/oozie/editor/workflow/list/'}`;

//UI Components
export const UI_COMPONENTS_APP = `${process.env.REACT_APP_UI_COMPONENTS_APP_URL}`;

//BMS PBR URL
export const BMS_PBR_URL = `${process.env.REACT_APP_BMS_PBR_URL + '/bms_poc_snippets/'}`;

//BMS APP URL
export const BMS_APP_URL = `${process.env.REACT_APP_UI_URL}`;

//BMS APP PYTHON SERVICE V1
export const BMS_APP_PYTHON_SERVICE = `${process.env.REACT_APP_PYTHON_SERVICES + '/v1'}`;
export const BMS_APP_PYTHON_SERVICE_DNS = `${process.env.REACT_APP_PYTHON_SERVICES_DNS + '/v1'}`;
export const BMS_APP_PYTHON_SERVICE_IP = `${process.env.REACT_APP_PYTHON_SERVICES_IP + '/v1'}`;

//BMS APP GOOGLE ANALYTICS TRACS ID
export const GOOGLE_ANALYTICS_ID = `${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`;

console.log('process env', process.env);



// export const API_PLOT_URL = "https://apigateway.mareana.com/cpv-python/";
// export const API_AUTHENTICATION_URL = "https://apigateway.mareana.com/prismmicro-authentication";
// export const API_RESULTSET_URL = "https://apigateway.mareana.com/prismmicro-resultset";
// export const API_CPV_URL = "https://cpvdev.mareana.com/api";
// export const API_APPLICATION_MDH = "https://cpvdev-service.mareana.com";
// export const GRAFANA_DASHBOARD = "https://cpv-dashboard.mareana.com";
// export const HUE_JOB_DASHBOARD = "https://hue.mareana.com/oozie/editor/workflow/list/";
// export const MVA_ANALYSIS_JUPYTER = "https://cpvdev.mareana.com/jupyter/notebooks/MVA_Demo.ipynb";
// export const RCA_ANALYSIS_JUPYTER = "https://cpvdev.mareana.com/jupyter/notebooks/RCA_Demo.ipynb";
// export const JUPYTER_NOTEBOOK = "https://cpvdev.mareana.com/jupyter/";
// export const REAL_TIME_MVA = "https://cpvdev.mareana.com/grafana/d/fW71CAI7z/?kiosk";
// export const UI_COMPONENTS_APP = "https://uicomponent.mareana.com"
