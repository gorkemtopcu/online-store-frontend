import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import StringConstants from 'constants/StringConstants';
import LoginForm from 'components/forms/LoginForm';
import SignUpForm from 'components/forms/SignUpForm';

const AuthenticationModal = ({ isOpen, onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleLoginSubmit = (values) => {
        console.log('Login form values:', values);
        onClose();
    };

    const handleSignUpSubmit = (values) => {
        console.log('Sign Up form values:', values);
        onClose();
    };

    return (
        <Modal
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>{isLoginMode ? StringConstants.LOGIN : StringConstants.SIGN_UP}</span>}
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            {isLoginMode ? (
                <LoginForm onSubmit={handleLoginSubmit} />
            ) : (
                <SignUpForm onSubmit={handleSignUpSubmit} />
            )}
            <div style={{ textAlign: 'center'}}>
                <Button type="link" onClick={toggleMode}>
                    {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </Button>
            </div>
        </Modal>
    );
};

export default AuthenticationModal;
