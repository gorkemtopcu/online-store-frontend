import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

// todo improve dashboard
const Dashboard = () => {
  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2}>Welcome to the Admin Dashboard</Title>
        <Paragraph>
          This application allows you to manage the book store efficiently. As an admin, you can:
        </Paragraph>
        <ul>
          <li>
            <b>Manage Categories:</b> Create and edit book categories.
          </li>
          <li>
            <b>Manage Products:</b> Add, edit, and delete books in the inventory.
          </li>
          <li>
            <b>Track Orders:</b> View and manage customer orders.
          </li>
        </ul>
        <Paragraph>
          Use the navigation menu on the left to access the features of the application. If you have any questions or encounter issues, please contact the support team.
        </Paragraph>
        <Paragraph>
          <b>Tip:</b> Click on a section to expand and explore its features.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Dashboard;
