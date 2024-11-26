import React from "react";
import { Row, Col, Typography } from "antd";
import StringConstants from "constants/StringConstants";

const { Text } = Typography;

const ExpandedOrderDetails = ({ order }) => {
  const payment = order.payment || {};
  const address = order.address || {};

  return (
    <div style={{ marginTop: "20px", background: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      <Row gutter={[16, 16]}>
        {/* Seller Info */}
        <Col span={12}>
          <Text strong style={{ color: "#0d47a1" }}>
            {StringConstants.SELLER}: {order.seller?.sellerName || "Unknown Seller"}
          </Text>
          <br />
          <Text strong>{StringConstants.SELLER_ADDRESS}: {order.seller?.sellerAddress}</Text>
          <br />
          <Text>
            {address.firstName} {address.lastName}
          </Text>
          <br />
          <Text>
            {address.address}, {address.city}, {address.state} - {address.zip}, {address.country}
          </Text>
        </Col>

        {/* Payment Info */}
        <Col span={12}>
          <Text strong style={{ color: "#0d47a1" }}>
            {StringConstants.PAYMENT_INFORMATION}
          </Text>
          <br />
          <Text>
            {StringConstants.LAST_DIGITS}: {payment.cardNumber ? payment.cardNumber.slice(-4) : "N/A"}
          </Text>
          <br />
          <Text>
            {StringConstants.PAYMENT_METHOD}: {payment.cardType || "N/A"}
          </Text>
          <br />
          <Text>{payment.cardholderName || "Unknown Cardholder"}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default ExpandedOrderDetails;
