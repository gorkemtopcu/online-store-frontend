const { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, CloseCircleOutlined } = require("@ant-design/icons");
const { Tag } = require("antd");
const { default: StringConstants } = require("constants/StringConstants");
const { default: React } = require("react");


const StatusTag = ({ status }) => {
    const renderStatusTag = (status) => {
        switch (status) {
          case "DELIVERED":
            return (
              <Tag color="green" icon={<CheckCircleOutlined />} style={{ fontSize: "14px", padding: "5px 10px" }}>
                {StringConstants.DELIVERED}
              </Tag>
            );
          case "IN_TRANSIT":
            return (
              <Tag color="blue" icon={<SyncOutlined spin />} style={{ fontSize: "14px", padding: "5px 10px" }}>
                {StringConstants.IN_TRANSIT}
              </Tag>
            );
          case "PROCESSING":
            return (
              <Tag color="orange" icon={<ClockCircleOutlined />} style={{ fontSize: "14px", padding: "5px 10px" }}>
                {StringConstants.PROCESSING}
              </Tag>
        );
          case "CANCELLED":
            return (
              <Tag color="red" icon={<CloseCircleOutlined />} style={{ fontSize: "14px", padding: "5px 10px" }}>
                {StringConstants.CANCELLED}
              </Tag>
            );
          default:
            return (
              <Tag color="default" style={{ fontSize: "14px", padding: "5px 10px" }}>
                {StringConstants.UNKNOWN}
              </Tag>
            );
        }
      };

    return renderStatusTag(status);
}

export default StatusTag;