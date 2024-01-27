"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = void 0;
const bcrypt_1 = require("bcrypt");
const updatePassword = (item, password) => {
    const salt = (0, bcrypt_1.genSaltSync)();
    item.password = (0, bcrypt_1.hashSync)(password, salt);
};
exports.updatePassword = updatePassword;
