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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDelete = exports.usersPost = exports.usersPut = exports.usersGet = void 0;
const User_1 = require("../models/User");
const helpers_1 = require("../helpers");
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, from } = req.query;
    const query = { active: true };
    const [count, users] = yield Promise.all([
        User_1.User.countDocuments(query),
        User_1.User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);
    res.json({ count, users });
});
exports.usersGet = usersGet;
const usersPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id, password, google } = _a, rest = __rest(_a, ["_id", "password", "google"]);
    if (password) {
        (0, helpers_1.updatePassword)(rest, password);
    }
    const usuario = yield User_1.User.findByIdAndUpdate(id, rest);
    res.json(usuario);
});
exports.usersPut = usersPut;
const usersPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role, password } = req.body;
    const user = new User_1.User({ name, email, role, password });
    (0, helpers_1.updatePassword)(user, password);
    yield user.save();
    res.status(201).json(user);
});
exports.usersPost = usersPost;
const usersDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.User.findByIdAndUpdate(id, {
        active: false,
    });
    res.json(user);
});
exports.usersDelete = usersDelete;
