"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseFunc = exports.errorResponseFunc = exports.responseMessage = exports.statusCode = void 0;
const statusCode_1 = __importDefault(require("./statusCode"));
exports.statusCode = statusCode_1.default;
const responseMessages_1 = __importDefault(require("./responseMessages"));
exports.responseMessage = responseMessages_1.default;
const responseFunction_1 = require("./responseFunction");
Object.defineProperty(exports, "errorResponseFunc", { enumerable: true, get: function () { return responseFunction_1.errorResponseFunc; } });
Object.defineProperty(exports, "successResponseFunc", { enumerable: true, get: function () { return responseFunction_1.successResponseFunc; } });
