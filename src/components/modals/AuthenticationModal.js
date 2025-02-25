import React, { useState } from "react";
import { Button, Modal } from "antd";
import StringConstants from "constants/StringConstants";
import LoginForm from "components/forms/LoginForm";
import SignUpForm from "components/forms/SignUpForm";
import useUserStore from "context/UserStore";

const AuthenticationModal = ({ isOpen, onClose, onAuthSuccess = () => {} }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, login, signUp } = useUserStore();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    await login(email, password);
    const updatedCurrentUser = useUserStore.getState().currentUser;
    if (updatedCurrentUser) {
      onAuthSuccess();
      onClose();
    }
  };

  const handleSignUp = async (values) => {
    const { name, email, password, role, address, taxId } = values;
    await signUp(name, email, password, role, address, taxId);
    const updatedCurrentUser = useUserStore.getState().currentUser;
    if (updatedCurrentUser) {
      onAuthSuccess();
      onClose();
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          {isLoginMode ? StringConstants.LOGIN : StringConstants.SIGN_UP}
        </span>
      }
      open={isOpen}
      footer={null}
      onCancel={!isLoading() ? onClose : null}
      closable={!isLoading()}
    >
      {isLoginMode ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <SignUpForm onSubmit={handleSignUp} />
      )}
      <div style={{ textAlign: "center" }}>
        <Button type="link" onClick={toggleMode}>
          {isLoginMode
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </Button>
      </div>
    </Modal>
  );
};

export default AuthenticationModal;
