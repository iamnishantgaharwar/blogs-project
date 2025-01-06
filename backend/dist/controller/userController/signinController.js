"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInFunc = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseFunction_1 = require("../../utils/responseFunction");
const responseMessages_1 = __importDefault(require("../../utils/responseMessages"));
const statusCode_1 = __importDefault(require("../../utils/statusCode"));
const prisma = new client_1.PrismaClient();
const signInFunc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Input validation
        if (!email || !password) {
            res.send((0, responseFunction_1.errorResponseFunc)(responseMessages_1.default.incompleteFields, null, statusCode_1.default.badRequest, 'Validation Error'));
            return;
        }
        // Find user by email
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.send((0, responseFunction_1.errorResponseFunc)(responseMessages_1.default.notExist, 'User not found', statusCode_1.default.notFound, 'User Not Found'));
            return;
        }
        // Compare password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.send((0, responseFunction_1.errorResponseFunc)(responseMessages_1.default.incorrectPassword, 'Incorrect password', statusCode_1.default.unauthorized, 'Unauthorized'));
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, // Ensure you have a valid JWT_SECRET environment variable
        { expiresIn: '1h' } // Token expires in 1 hour
        );
        // Send success response with token
        res.send((0, responseFunction_1.successResponseFunc)(responseMessages_1.default.success, statusCode_1.default.success, 'Success', { token }, 'User logged in successfully'));
    }
    catch (e) {
        console.error('Error during signin:', e);
        res.send((0, responseFunction_1.errorResponseFunc)(responseMessages_1.default.internalServerError, e.message, statusCode_1.default.internalServerError, 'Internal Server Error'));
    }
});
exports.signInFunc = signInFunc;
