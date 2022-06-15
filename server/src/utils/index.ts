const PORT = 8081;
const DATASOURCEFILE = "data.json";
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export { PORT, DATASOURCEFILE, getErrorMessage };
