const ACTION_TYPE = {
  CONNECTION: "connection",
  CHANNEL_JOIN: "channel-join",
  JOIN: "join",
  FILE_LOCKED: "file_locked",
  DISCONNECT: "disconnect",
};

const SOCKET_SERVER_URL = "http://localhost:3000";

const SOCKET_PORT = 8082;

export { ACTION_TYPE, SOCKET_SERVER_URL, SOCKET_PORT };
