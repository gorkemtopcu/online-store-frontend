import React from 'react';
import { Form, Input, Button } from 'antd';
import StringConstants from 'constants/StringConstants';

const LoginForm = ({ onSubmit }) => {
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
                <Input />
            </Form.Item>
            <Form.Item
                label={StringConstants.PASSWORD}
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {StringConstants.LOGIN}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
