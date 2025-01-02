"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use('/api', userRoute_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
