"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.getErrorMessage = exports.DATASOURCEFILE = exports.PORT = void 0;
const http_errors_1 = require("http-errors");
const PORT = 8081;
exports.PORT = PORT;
const DATASOURCEFILE = "data.json";
exports.DATASOURCEFILE = DATASOURCEFILE;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
const createError = (status, message) => {
    console.log(status, message);
    let err = new http_errors_1.HttpError();
    err.status = status;
    console.log(err);
    return err;
};
exports.createError = createError;
