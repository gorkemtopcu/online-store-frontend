import React, { useState } from "react";
import { Button, Spin } from "antd";
import StringConstants from "constants/StringConstants";
import useUserStore from "context/UserStore";
import LoadingSpinner from "components/spinner/LoadingSpinner";

const LogoutButton = () => {
  const { logout } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); 
    try {
      await logout(); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Button
          type="primary"
          onClick={handleLogout}
          style={{
            marginRight: "24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {StringConstants.LOG_OUT}
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
