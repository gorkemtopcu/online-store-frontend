import React from 'react';
import { Form, Input, Button } from 'antd';
import StringConstants from 'constants/StringConstants';
import Validators from 'utils/Validators';

const SignUpForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    return (
         <Form layout="vertical" form={form} onFinish={onSubmit}>
            <Form.Item
                label={StringConstants.EMAIL}
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label={StringConstants.PASSWORD}
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password' },
                    { validator: Validators.validatePassword },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label={StringConstants.CONFIRM_PASSWORD}
                name="confirmPassword"
                rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            return Validators.validateConfirmPassword(getFieldValue('password'), value);
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block >
                    {StringConstants.SIGN_UP}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignUpForm;
