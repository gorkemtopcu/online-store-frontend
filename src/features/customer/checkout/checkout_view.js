import React, { useState, useEffect } from 'react';
import Checkout from './components/checkout'; // Import Checkout
import PaymentForm from './components/payment_form'; // Import PaymentForm
import ProductService from 'api/ProductService';
import { Row, Col, Divider, Card } from 'antd'; // For layout
import HomeFooter from 'components/footers/home_footer';

const CheckoutView = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control showing PaymentForm
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch products and select a random number of products between 1 and the total items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll();
        if (response && response.data) {
          console.log("Fetched products:", response.data);

          // Select a random number of products between 1 and the total number of products
          const numProducts = Math.floor(Math.random() * response.data.length) + 1;
          const randomProducts = [];
          while (randomProducts.length < numProducts) {
            const randomIndex = Math.floor(Math.random() * response.data.length);
            if (!randomProducts.includes(response.data[randomIndex])) {
              randomProducts.push(response.data[randomIndex]);
            }
          }

          setSelectedProducts(randomProducts); // Set the random products to the state
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Log selected products and payment form state to ensure proper updates
  useEffect(() => {
    console.log("Selected Products:", selectedProducts);
    console.log("Show Payment Form:", showPaymentForm);
  }, [selectedProducts, showPaymentForm]);

  // Proceed to payment method when the button is clicked
  const proceedToPayment = () => {
    console.log("Proceed to Payment button clicked!"); // Debugging log
    setShowPaymentForm(true); // Toggle showPaymentForm to true
  };

  return (
    <div>
       <Row gutter={10} justify="center" align="middle">
        {/* Checkout Section */}
        <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <Checkout
              products={selectedProducts}
              onProceedToPayment={proceedToPayment}
            />
          </div>
        </Col>

        {/* Payment Form Section */}
        <Col span={12} style={{ display: 'flex', justifyContent: 'left' }}>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <PaymentForm product={selectedProducts} />
          </div>
        </Col>
      </Row>

      <Divider />
      <HomeFooter />
    </div>
  );
};

export default CheckoutView;
