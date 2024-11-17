import React, { useState } from "react";
import { Button, Modal } from "antd";
import StringConstants from "constants/StringConstants";
import LoginForm from "components/forms/LoginForm";
import SignUpForm from "components/forms/SignUpForm";
import useUserStore from "context/UserStore";

const AuthenticationModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, currentUser, login, signUp } = useUserStore();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    await login(email, password);
    // for immediate access to zustand states use this syntax
    const updatedCurrentUser = useUserStore.getState().currentUser;
    console.log("User logged in successfully. User: ", updatedCurrentUser);
    if (updatedCurrentUser) onClose();
  };

  const handleSignUp = async (values) => {
    const { name, email, password, role } = values;
    await signUp(name, email, password, role);
    if (currentUser) onClose();
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
      onCancel={!isLoading ? onClose : null}
      closable={!isLoading}
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
