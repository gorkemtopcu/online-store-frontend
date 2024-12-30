import React from "react";
import { Button } from "antd";

const RefundActions = ({ record, handleUpdateStatus }) => {
  return (
    <span>
      <Button
        style={{ marginRight: 8 }}
        color="primary"
        variant="solid"
        onClick={() => handleUpdateStatus(record, 'APPROVED')}
        disabled={record.status !== 'PENDING'}
      >
        Approve
      </Button>
      <Button
        color="danger"
        variant="solid"
        onClick={() => handleUpdateStatus(record, 'REJECTED')}
        disabled={record.status !== 'PENDING'}
      >
        Reject
      </Button>
    </span>
  );
};

export default RefundActions;