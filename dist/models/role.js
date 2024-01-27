"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const userRole = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, "role not valid"]
    }
});
exports.Role = (0, mongoose_1.model)("role", userRole);
