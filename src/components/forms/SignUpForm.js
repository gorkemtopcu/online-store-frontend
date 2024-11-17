import React from "react";
import { Form, Input, Button, Select } from "antd";
import StringConstants from "constants/StringConstants";
import Validators from "utils/Validators";
import UserRoles from "constants/UserRoles";
import useUserStore from "context/UserStore";
import LoadingButton from "components/buttons/LoadingButton";

const SignUpForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const { isLoading } = useUserStore();

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label={StringConstants.ROLE}
        name="role"
        rules={[{ required: true, message: "Please select your role" }]}
        style={{ marginBottom: "8px" }}
      >
        <Select>
          <Select.Option value={UserRoles.CUSTOMER}>Customer</Select.Option>
          <Select.Option value={UserRoles.ADMIN}>Admin</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={StringConstants.FULL_NAME}
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
        style={{ marginBottom: "8px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={StringConstants.EMAIL}
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
        style={{ marginBottom: "8px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={StringConstants.PASSWORD}
        name="password"
        rules={[
          { required: true, message: "Please enter your password" },
          { validator: Validators.validatePassword },
        ]}
        style={{ marginBottom: "8px" }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label={StringConstants.CONFIRM_PASSWORD}
        name="confirmPassword"
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              return Validators.validateConfirmPassword(
                getFieldValue("password"),
                value
              );
            },
          }),
        ]}
        style={{ marginBottom: "8px" }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ marginBottom: "8px" }}>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="primary" htmlType="submit" block>
            {StringConstants.SIGN_UP}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
