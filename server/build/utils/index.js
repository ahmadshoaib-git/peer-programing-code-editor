"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.DATASOURCEFILE = exports.PORT = void 0;
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
