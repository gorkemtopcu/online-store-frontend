import React from 'react';

const ProductHeader = ({ title }) => {
    return (
        <header style={{ paddingBottom: '20px' }}>
            <h1>{title}</h1>
        </header>
    );
};

export default ProductHeader;
