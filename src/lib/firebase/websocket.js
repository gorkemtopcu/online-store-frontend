import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client;

export const connectToWebSocket = (userId, onMessageReceived) => {
  const socketUrl = `${process.env.REACT_APP_BACKEND_URL}/ws`;
  client = new Client({
    brokerURL: socketUrl,
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification = JSON.parse(message.body);
        onMessageReceived(notification);
      });
    },
  });

  client.activate();
};

export const disconnectFromWebSocket = () => {
  if (client) {
    client.deactivate();
  }
};
