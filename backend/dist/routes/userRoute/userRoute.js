"use strict";
// user Routes
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controller/userController/userController");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.signupFunc);
exports.default = router;
