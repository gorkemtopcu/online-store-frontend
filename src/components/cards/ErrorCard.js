import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "antd";

const ErrorCard = ({ title, subtitle, onRetry = null }) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #f0f0f0",
      }}
      title={title}
    >
      <p style={{ fontSize: "16px", color: "#666" }}>{subtitle}</p>
      {onRetry && (
        <Button
          type="primary"
          onClick={onRetry}
          style={{ marginTop: "20px", width: "100%" }}
        >
          Retry
        </Button>
      )}
    </Card>
  );
};

ErrorCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorCard;
