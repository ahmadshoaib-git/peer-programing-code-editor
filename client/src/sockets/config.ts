const ACTION_TYPE = {
  CONNECT: "connect",
  CONNECTION: "connection",
  CHANNEL_JOIN: "channel-join",
  JOIN: "join",
  FILE_LOCKED: "file_locked",
  DISCONNECT: "disconnect",
  USER_DISCONNECT: "user-disconnect",
};
const SOCKET_PORT = 8082;

const SOCKET_SERVER_URL = `http://localhost:${SOCKET_PORT}`;

export { ACTION_TYPE, SOCKET_SERVER_URL, SOCKET_PORT };
