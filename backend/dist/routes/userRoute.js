"use strict";
// user Routes
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constant_1 = require("../utils/constant");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    res.send(constant_1.SUCCESS);
});
exports.default = router;
