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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupFunc = void 0;
const client_1 = require("@prisma/client");
const hashUtils_1 = require("../../utils/hashUtils");
const prisma = new client_1.PrismaClient();
const signupFunc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phone, email, password } = req.body;
        const strongPass = yield (0, hashUtils_1.hashPassword)(password);
        if (!firstName || !email || !password) {
            res
                .status(400)
                .json({ message: 'First name, email, and password are required.' });
            return;
        }
        const newUser = yield prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: strongPass,
                phone,
            },
        });
        console.log('Added New User ==>', newUser);
        res.status(201).json({
            success: true,
        });
    }
    catch (e) {
        console.error('Error during signup:', e);
    }
});
exports.signupFunc = signupFunc;
