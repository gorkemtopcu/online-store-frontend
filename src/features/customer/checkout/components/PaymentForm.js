import React, { useState } from "react";
import { Form, Input, Button, Radio, Modal } from "antd";
import axios from "axios";
import OrderService from "services/OrderService";

const PaymentForm = ({ form, product, onProceedToPayment }) => {
  const [orderId, setOrderId] = useState(null); // Stores the order ID after payment
  const [invoiceUrl, setInvoiceUrl] = useState(null); // Stores the URL of the generated invoice
  const [isModalVisible, setIsModalVisible] = useState(false); // Manages the modal visibility

  const handlePayment = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Payment form is valid:", values);

        // Step 1: Create the order
        const isOrderCreated = await OrderService.completePurchase(
          "user123", // Example user ID
          100, // Total amount
          { address: "Main Street", city: "Istanbul" }, // Example address details
          { cardType: "Visa" }, // Example payment details
          [{ id: 1, name: "Product A", price: 50 }], // Example selected products
          () => console.log("Cart cleared") // Callback to clear the cart
        );

        if (isOrderCreated) {
          console.log("Order created successfully.");

          // Example order ID (replace with the real orderId from your backend)
          const mockOrderId = "ORD123456";
          setOrderId(mockOrderId);

          // Step 2: Generate the invoice
          try {
            await axios.get(`/api/invoice/generate`, {
              params: { invoiceId: mockOrderId },
            });

            console.log("Invoice generated successfully.");
            setInvoiceUrl(`/api/invoice/download?invoiceId=${mockOrderId}`);
            setIsModalVisible(true); // Open the modal to show the invoice
          } catch (invoiceError) {
            console.error("Error generating invoice:", invoiceError);
            alert("Invoice generation failed.");
          }

          onProceedToPayment(); // Proceed to the next step
        } else {
          alert("Order creation failed. Please try again.");
        }
      })
      .catch((errorInfo) => {
        console.error("Payment form validation failed:", errorInfo);
      });
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="paymentForm"
        onFinish={handlePayment}
      >
        <Form.Item
          name="cardType"
          label="Card Type"
          rules={[{ required: true, message: "Please select your card type" }]}
        >
          <Radio.Group>
            <Radio value="Visa">Visa</Radio>
            <Radio value="MasterCard">MasterCard</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="cardholderName"
          label="Cardholder Name"
          rules={[
            { required: true, message: "Please enter the cardholder's name" },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Cardholder name must contain only letters",
            },
          ]}
        >
          <Input placeholder="Enter cardholder's name" />
        </Form.Item>

        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[
            { required: true, message: "Please enter your card number" },
            { len: 16, message: "Card number must be exactly 16 digits" },
          ]}
        >
          <Input placeholder="Enter your card number" maxLength={16} />
        </Form.Item>

        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[
            { required: true, message: "Please enter the expiry date" },
            {
              pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
              message: "Expiry date must be in MM/YY format",
            },
          ]}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>

        <Form.Item
          name="cvv"
          label="CVV"
          rules={[
            { required: true, message: "Please enter the CVV" },
            { len: 3, message: "CVV must be exactly 3 digits" },
            { pattern: /^\d{3}$/, message: "CVV must be 3 digits" },
          ]}
        >
          <Input placeholder="Enter CVV" maxLength={3} />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Complete Purchase
          </Button>
        </Form.Item>
      </Form>

      {/* Invoice Modal */}
      <Modal
        title="Invoice Preview"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {invoiceUrl ? (
          <iframe
            src={invoiceUrl}
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        ) : (
          <p>Loading invoice...</p>
        )}
      </Modal>
    </div>
  );
};

export default PaymentForm;
