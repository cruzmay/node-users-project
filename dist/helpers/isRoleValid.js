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
exports.isRoleValid = void 0;
const role_1 = require("../models/role");
const isRoleValid = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const rolExist = yield role_1.Role.findOne({ role });
    if (!rolExist) {
        throw new Error(`${role} rol is not registered in the DB`);
    }
});
exports.isRoleValid = isRoleValid;
