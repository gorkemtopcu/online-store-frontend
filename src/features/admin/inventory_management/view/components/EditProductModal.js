import React from 'react';
import { Modal, Input } from 'antd';

const EditProductModal = ({ 
    visible, 
    onCancel, 
    onSave, 
    editedFields, 
    onFieldChange 
}) => {
    return (
        <Modal
            title="Edit Product"
            open={visible}
            onOk={onSave}
            onCancel={onCancel}
        >
            <Input
                value={editedFields.name}
                onChange={(e) => onFieldChange('name', e.target.value)}
                placeholder="Product Name"
                style={{ marginBottom: 8 }}
            />
            <Input
                value={editedFields.brand}
                onChange={(e) => onFieldChange('brand', e.target.value)}
                placeholder="Brand"
                style={{ marginBottom: 8 }}
            />
            <Input
                value={editedFields.description}
                onChange={(e) => onFieldChange('description', e.target.value)}
                placeholder="Description"
                style={{ marginBottom: 8 }}
            />
            <Input
                value={editedFields.price}
                onChange={(e) => onFieldChange('price', e.target.value)}
                placeholder="Price"
                style={{ marginBottom: 8 }}
                type="number"
            />
            <Input
                value={editedFields.stock}
                onChange={(e) => onFieldChange('stock', e.target.value)}
                placeholder="Stock"
                style={{ marginBottom: 8 }}
                type="number"
            />
        </Modal>
    );
};

export default EditProductModal;
