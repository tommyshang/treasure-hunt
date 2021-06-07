import React from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import Logo from 'assets/logos/th_logo.svg';
import SplitLayout from '../SplitLayout/SplitLayout.js';
import LoginPhoto from 'assets/images/login_img.jpg';
import { useLogin } from 'hooks';

const Login = () => {
  const { isLoggingIn, login } = useLogin();
  const history = useHistory();

  const onFinish = async (userData) => {
    const name = await login({
      username: userData.username,
      password: userData.password,
    });

    if (name === undefined) {
      message.error('Login unsuccessful');
    } else {
      message.success(`Welcome back ${name}`);
      history.goBack();
    }
  };

  const onFinishFailed = () => {
    console.log('failed');
  };

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div id="login-view">
      <img id="logo" src={Logo} onClick={goToHome} />
      <SplitLayout src={LoginPhoto} content="left">
        <Row className="lv_form-container" justify="center" align="middle">
          <div className="lv_form">
            <div className="lv_form-header"> LOGIN </div>

            <Form
              name="login-form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                className="lv_form-item"
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                className="lv_form-item"
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={isLoggingIn}
                  id="login-button"
                  block
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>

              <div>
                <span>Not registered yet? </span>
                <Link to="/signup" replace>
                  Create an Account
                </Link>
              </div>
            </Form>
          </div>
        </Row>
      </SplitLayout>
    </div>
  );
};

export default Login;
