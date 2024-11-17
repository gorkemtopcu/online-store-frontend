import React from "react";
import { Button, Spin } from "antd";

const LoginButton = () => {
  return (
    <>
      <Button disabled type="primary" block>
        <Spin />
      </Button>
    </>
  );
};

export default LoginButton;
