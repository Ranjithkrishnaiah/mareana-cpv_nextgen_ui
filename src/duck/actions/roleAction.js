import { getAccessRoles } from './userAuthentication';

export const rolesData = data => ({
    type: 'ROLES',
    payload: data
});

export const getRoles = (dispatch, appName) => {
    let req = 'CPV';
    return getAccessRoles(req).then(
        res => {
            dispatch(
                rolesData({
                    data: res.data
                })
            );
            return {
                status: 'success'
            };
        },
        err => {
            return {
                status: 'error',
                message: err
            };
        }
    );
};
