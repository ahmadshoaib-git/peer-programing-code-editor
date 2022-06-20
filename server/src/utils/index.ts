import { HttpError } from "http-errors";
const PORT = 8081;
const DATASOURCEFILE = "data.json";
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
const createError = (status: any, message: string) => {
  console.log(status, message);
  let err = new HttpError();
  err.status = status;
  console.log(err);
  return err;
};

export { PORT, DATASOURCEFILE, getErrorMessage, createError };
