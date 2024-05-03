import React from 'react';
import { Form, Input, Button } from 'antd';
import { userLogin } from '../../../api/login';
import Auth from '../../../utils/auth';
import { useDispatch } from 'react-redux';
import {
    showNotification,
    showLoader,
    hideLoader,
} from '../../../duck/actions/commonActions';
import './login.scss';
import { useHistory } from 'react-router-dom';
import Icon from '../../../assets/mareana_logo.png';

// const layout = {
// 	labelCol: {
// 		span: 4,
// 	},
// 	wrapperCol: {
// 		span: 8,
// 	},
// };
// const tailLayout = {
// 	wrapperCol: {
// 		offset: 8,
// 		span: 16,
// 	},
// };

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onFinish = async (values) => {
        try {
            dispatch(showLoader());
            const response = await userLogin(values);
            Auth.login({ ...response, username: values.username });
            history.push('/dashboard/view_creation');
            dispatch(hideLoader());
        } catch (err) {
            dispatch(hideLoader());
            dispatch(showNotification('error', err.message));
        }
    };

    return (
        <div className='page-login bg-img'>
            <div className='page-login-header'>
                <span className='brand-name'>
                    Continuous Process Verification
                </span>
                <a
                    href='https://www.mareana.com'
                    target='_blank'
                    rel='noreferrer'
                >
                    <img src={Icon} alt={'logo'} className='logo' />
                </a>
            </div>

            <div className='main-body '>
                <div className='body'>
                    <div className='card card-white card-changes'>
                        <div className='card-content card-container-change'>
                            <Form
                                // {...layout}
                                name='basic'
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Username'
                                    name='username'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your username!',
                                        },
                                    ]}
                                >
                                    <Input id='username' />
                                </Form.Item>

                                <Form.Item
                                    label='Password'
                                    name='password'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password id='password' />
                                </Form.Item>

                                <Form.Item
                                //  {...tailLayout}
                                >
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        id='login-btn'
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
