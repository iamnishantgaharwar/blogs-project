"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseFunc = exports.successResponseFunc = void 0;
// Success response structure
const successResponseFunc = (message, code, type, data, details) => {
    return {
        status: 'success',
        message: message,
        code: code,
        type: type,
        data: data,
        details: details,
    };
};
exports.successResponseFunc = successResponseFunc;
// Error response structure
const errorResponseFunc = (message, details, code, type) => {
    return {
        status: 'error',
        message: message,
        details: details,
        code: code,
        type: type,
    };
};
exports.errorResponseFunc = errorResponseFunc;
