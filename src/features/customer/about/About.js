import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={2}>About Us</Title>
        <Paragraph>
          Welcome to <b>KitApp</b>, your one-stop online book store. We are passionate about connecting readers with their favorite books, whether they are timeless classics, bestsellers, or hidden gems.
        </Paragraph>
        <Paragraph>
          Our mission is to inspire the love for reading by providing a wide selection of books at competitive prices. From fiction to non-fiction, academic resources to leisure reads, we strive to cater to all types of readers.
        </Paragraph>
        <Paragraph>
          At <b>KitApp</b>, we believe every book has a story waiting to be explored. Let us be part of your reading journey.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;
