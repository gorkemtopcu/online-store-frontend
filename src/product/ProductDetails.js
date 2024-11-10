import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { productMockService } from 'services/product_mock_service';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productsData = productMockService.generateProducts(1); // Generate 1 mock product
        setProduct(productsData[0]); // Set the first product as product state
    }, []);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-details" style={{ padding: '20px' }}>
            <Card style={{ maxWidth: 1000, margin: '0 auto' }}>
                <Row gutter={[16, 16]}>

                    {/* Left column for image */}
                    <Col xs={24} md={10}>
                        <img
                            alt={product.name}
                            src={product.image}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                objectFit: 'cover',
                            }}
                        />
                    </Col>

                    {/* Right column for product details */}
                    <Col xs={24} md={14}>
                        <h1 className="text-2xl font-bold text-center">{product.name}</h1>
                        <p className="text-center">{product.brand}<br /><br /></p>
                        <p><strong>Description:</strong> {product.description}</p>
                        
                        
                        <p><strong>Popularity:</strong> {product.popularity}/100</p>
                        <p><strong>Warranty Status:</strong> {product.warrantyStatus} <br /><br /></p>
                        <p><strong>Stock:</strong> {product.stock} available</p>
                        
                        <p className="text-xl"><strong>${product.price}</strong> </p>

                        <div className="flex space-x-4 mt-4">
                            <Button type="primary">Add to Cart</Button>
                            <Button type="default">Add to Wishlist</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductDetails;
