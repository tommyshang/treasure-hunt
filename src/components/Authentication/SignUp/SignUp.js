import React from 'react';

import { Col, message, Row } from 'antd';
import { Form, Input, Button } from 'antd';
import Logo from 'assets/logos/th_logo.svg';

import SplitLayout from '../SplitLayout/SplitLayout';
import SignUpPhoto from 'assets/images/signup_img.jpg';
import { Link, useHistory } from 'react-router-dom';
import { useSignup } from 'hooks';

const SignUp = () => {

  const { isSigningup, signup } = useSignup();
  const history = useHistory();

  const onFinish = async (userData) => {
    const response = await signup(userData);

    if (response === 201) {
      message.success('Successfully signed up, please login');
      history.replace('/login');
    } else if (response === 409) {
      message.error(`Username ${userData.username} already taken`);
    } else {
      message.error('Failed to create new account, please try again');
    }

  };

  const onFinishFailed = () => {
    console.log('failed');
  };

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div id="signup-view">
      <img id="logo" src={Logo} onClick={goToHome} />
      <SplitLayout src={SignUpPhoto} content="right">
        <Row className="su_form-container" justify="center" align="middle">
          <div className="su_form">
            <div className="su_form-header"> Sign Up </div>

            <Form
              name="signup-form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                className="su_form-item"
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Username is required',
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                className="su_form-item"
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'The inputted value is not a valid email',
                  },
                  {
                    required: true,
                    message: 'Email is required',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="su_form-item"
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="su_form-item"
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Passwords do not match')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Row>
                <Col span={11}>
                  <Form.Item
                    className="su_form-item"
                    label="First Name"
                    name="first_name"
                    rules={[
                      { required: true, message: 'First Name is required' },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                  <Form.Item
                    className="su_form-item"
                    label="Last Name"
                    name="last_name"
                    rules={[
                      { required: true, message: 'Last Name is required' },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                className="su_form-item"
                label="Address Line"
                name="address_line_1"
                rules={[{ required: true, message: 'Address is required' }]}
              >
                <Input placeholder="Address Line" />
              </Form.Item>

              <Row>
                <Col span={10}>
                  <Form.Item
                    className="su_form-item"
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'City is required' }]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
                <Col span={4} offset={2}>
                  <Form.Item
                    className="su_form-item"
                    label="State"
                    name="state"
                    rules={[{ required: true, message: 'State is required' }]}
                  >
                    <Input placeholder="State" />
                  </Form.Item>
                </Col>
                <Col span={6} offset={2}>
                  <Form.Item
                    className="su_form-item"
                    label="Zip Code"
                    name="zipcode"
                    rules={[
                      { required: true, message: 'Zip Code is required' },
                    ]}
                  >
                    <Input placeholder="Zip Code" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  disabled={isSigningup}
                  id="signup-button"
                  block
                  htmlType="submit"
                >
                  {`${isSigningup ? 'Signing' : 'Sign'} up`}
                </Button>
              </Form.Item>

              <div>
                <span>Already have an Account? </span>
                <Link to="/login" replace>
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </Row>
      </SplitLayout>
    </div>
  );
};

export default SignUp;
