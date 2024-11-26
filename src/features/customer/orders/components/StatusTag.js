import React from "react";
import { Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import StringConstants from "constants/StringConstants";

const statusMapping = {
  DELIVERED: {
    color: "green",
    icon: <CheckCircleOutlined />,
    label: StringConstants.DELIVERED,
  },
  IN_TRANSIT: {
    color: "blue",
    icon: <SyncOutlined spin />,
    label: StringConstants.IN_TRANSIT,
  },
  PROCESSING: {
    color: "orange",
    icon: <ClockCircleOutlined />,
    label: StringConstants.PROCESSING,
  },
  CANCELLED: {
    color: "red",
    icon: <CloseCircleOutlined />,
    label: StringConstants.CANCELLED,
  },
};

const StatusTag = ({ status }) => {
  const { color, icon, label } = statusMapping[status] || {
    color: "default",
    icon: null,
    label: StringConstants.UNKNOWN,
  };

  return (
    <Tag color={color} icon={icon} style={{ fontSize: "14px", padding: "5px 10px" }}>
      {label}
    </Tag>
  );
};

export default StatusTag;
