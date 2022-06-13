const PORT = process.env.PORT || 8081;
const SOCKET_PORT = process.env.PORT || 8082;
const DATASOURCEFILE = "data.json";
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export { PORT, SOCKET_PORT, DATASOURCEFILE, getErrorMessage };
