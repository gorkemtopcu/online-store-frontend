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
            title="Change Stock"
            open={visible}
            onOk={onSave}
            onCancel={onCancel}
        >
            <Input
                value={editedFields.stock}
                onChange={(e) => onFieldChange('quantityInStock', e.target.value)}
                placeholder="Stock"
                style={{ marginBottom: 8 }}
                type="number"
            />
        </Modal>
    );
};

export default EditProductModal;
