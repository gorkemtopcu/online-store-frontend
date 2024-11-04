import React, { useState } from 'react';
import { Button } from 'antd';
import AuthenticationModal from 'components/modals/AuthenticationModal';
import StringConstants from 'constants/StringConstants';

const LoginButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                style={{
                    marginRight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {StringConstants.LOGIN}
            </Button>
            {isModalVisible && (
                <AuthenticationModal
                    isOpen={isModalVisible}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default LoginButton;
