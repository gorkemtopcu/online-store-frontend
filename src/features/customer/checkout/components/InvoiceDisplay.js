import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Typography, Alert } from "antd";
import axios from "axios";

const { Title } = Typography;

const InvoiceDisplay = () => {
  const { orderId } = useParams();
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        console.log("Fetching invoice for orderId:", orderId);
        const response = await axios.get(
          `http://localhost:8081/api/invoices/${orderId}`,
          { responseType: "blob" } 
        );

        // Blob'dan URL oluştur
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        setInvoiceUrl(url);
        console.log("Invoice URL created:", url);
      } catch (err) {
        console.error("Error fetching invoice:", err);
        setError("An error occurred while fetching the invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <Typography.Text>Loading your invoice...</Typography.Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Title level={3}>Invoice for Order ID: {orderId}</Title>
      {invoiceUrl ? (
        <iframe
          src={invoiceUrl}
          width="80%"
          height="600px"
          style={{ border: "none" }}
          title="Invoice"
        />
      ) : (
        <Alert message="Invoice could not be loaded" type="error" />
      )}
    </div>
  );
};

export default InvoiceDisplay;
