import React from "react";
import { Card, Typography, Form, Input, Button } from "antd";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const handleSubmit = (values) => {
    console.log("Contact Form Submitted: ", values);
    alert("Your message has been submitted. We'll get back to you soon!");
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2}>Contact Us</Title>
        <Paragraph>
          We would love to hear from you! If you have any questions, concerns, or feedback, please feel free to reach out to us.
        </Paragraph>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Your Email" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Your Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;
