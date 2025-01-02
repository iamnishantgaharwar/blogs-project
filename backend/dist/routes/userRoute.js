"use strict";
// user Routes
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    res.send('Signup successful');
});
exports.default = router;
