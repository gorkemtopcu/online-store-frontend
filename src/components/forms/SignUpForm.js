import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
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
      {/* Role Field (Full Width) */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={StringConstants.ROLE}
            name="role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select>
              <Select.Option value={UserRoles.CUSTOMER}>Customer</Select.Option>
              <Select.Option value={UserRoles.PRODUCT_MANAGER}>
                Product Manager
              </Select.Option>
              <Select.Option value={UserRoles.SALES_MANAGER}>
                Sales Manager
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Other Fields in Grid Format */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={StringConstants.FULL_NAME}
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={StringConstants.EMAIL}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={StringConstants.PASSWORD}
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { validator: Validators.validatePassword },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={12}>
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
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={StringConstants.ADDRESS}
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={StringConstants.TAX_ID}
            name="taxId"
            rules={[{ required: true, message: "Please enter your tax ID" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row>
        <Col span={24}>
          <Form.Item>
            {isLoading() ? (
              <LoadingButton />
            ) : (
              <Button type="primary" htmlType="submit" block>
                {StringConstants.SIGN_UP}
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUpForm;
