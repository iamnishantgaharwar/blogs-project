"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user Routes
const express_1 = require("express");
const userIndex_1 = require("../../controller/userController/userIndex");
const router = (0, express_1.Router)();
router.post('/signup', userIndex_1.signupFunc);
router.post('/signin', userIndex_1.signInFunc);
exports.default = router;
