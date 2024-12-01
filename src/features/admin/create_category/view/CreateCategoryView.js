// Create category view

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import CategoryService from 'services/CategoryService';
import StringConstants from 'constants/StringConstants';
import ProductHeader from 'components/headers/ProductHeader';
import CategoryNameInput from '../components/CategoryNameInput';
import CategoryDescriptionInput from '../components/CategoryDescriptionInput';

const CreateCategoryPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
  
    const onFinish = async (values) => {
      setLoading(true);
  
      try {
        // Call the CategoryService to add the category
        await CategoryService.addCategory(values);
        message.success("Category created successfully!");
  
        // Reset form fields after success
        form.resetFields();
      } catch (error) {
        message.error("Error creating category. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div
        style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <ProductHeader title={StringConstants.CREATE_CATEGORY} />
          <Form
            form={form}
            name="create_product"
            onFinish={onFinish}
            layout="vertical"
          >
            <CategoryNameInput />
            <CategoryDescriptionInput />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
              >
                {StringConstants.SUBMIT}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}

export default CreateCategoryPage;