import React, { useEffect, useState } from "react";
import { connectToWebSocket, disconnectFromWebSocket } from "../../../lib/firebase/websocket";
import { List, Typography } from "antd";

const NotificationView = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    connectToWebSocket(userId, handleNewNotification);

    return () => {
      disconnectFromWebSocket();
    };
  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3}>Live Notifications</Typography.Title>
      <List
        bordered
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item>
            <List.Item.Meta
              title={notification.title}
              description={notification.message}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationView;
