import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import useCartStore from 'context/CartStore';

const { Title, Paragraph } = Typography;
const BankingView = ({ onVerificationComplete }) => {

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
    }, []);

    const { getTotalPrice } = useCartStore();
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const orderTotal = getTotalPrice().toFixed(2);

    const handleSubmit = (values) => {
        console.log('Received values:', code);
        if (code === '123456') {
            console.log('Verification successful');
            setIsVerified(true);
            setTimeout(() => {
                onVerificationComplete(true); // Notify parent of success
            }, 1000);
        } else {
            alert('Invalid code. try again.');
            onVerificationComplete(false); // Notify parent of failure
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <Card style={{ backgroundColor: '#97e6ff' }}>
                <Title level={2}>Blue Bank</Title>
                <Paragraph style={{ textAlign: 'left' }}><strong>Company Name:&emsp;</strong> KitApp</Paragraph>
                <Paragraph style={{ textAlign: 'left' }}><strong>Order Total: &emsp;&emsp;&emsp;</strong> {orderTotal}</Paragraph>
                <Paragraph style={{ textAlign: 'left' }}><strong>Order Time: &emsp;&emsp;&emsp;</strong> {currentTime}</Paragraph>
                
                {!isVerified ? (
                    <Form>
                        <Typography>Enter the 3D Secure code sent to your phone: <br></br><br></br></Typography>
                        <Form.Item 
                            name="code"
                            rules={[
                                { required: true, message: "Please enter 6-digit code." },
                                { pattern: /^\d{6}$/, message: "Code must be 6-digits." },
                              ]}
                        >
                            <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ alignContent: 'center', maxWidth: '100px' }}
                            />
                        </Form.Item>                     
                        <Form.Item>
                            <Button type="primary" onClick={handleSubmit} style={{ backgroundColor: 'green', borderColor: 'green' }}>
                                Verify
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Alert
                        message="Verification Successful!"
                        description="Your payment has been verified."
                        type="success"
                        showIcon
                    />
                )}
            </Card>
        </div>
    );
};

export default BankingView;
