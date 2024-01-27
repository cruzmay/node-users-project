"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get("/", controller_1.usersGet);
router.put("/:id", [
    (0, express_validator_1.check)("id", "is not a valid ID").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.userExist),
    (0, express_validator_1.check)("email").custom(helpers_1.emailExist),
    middlewares_1.validateFields
], controller_1.usersPut);
router.post("/", [
    (0, express_validator_1.check)("name", "name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "not valid email").isEmail(),
    (0, express_validator_1.check)("email").custom(helpers_1.emailExist),
    (0, express_validator_1.check)("password", "should be 6 characters length minimum").isLength({ min: 6 }),
    (0, express_validator_1.check)("role").custom(helpers_1.isRoleValid),
    middlewares_1.validateFields
], controller_1.usersPost);
router.delete("/:id", [
    (0, express_validator_1.check)("id", "is not a valid ID").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.userExist),
    middlewares_1.validateFields
], controller_1.usersDelete);
