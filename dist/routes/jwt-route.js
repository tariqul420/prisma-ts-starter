"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtRoute = void 0;
const express_1 = require("express");
const jwt_controller_1 = require("../controllers/jwt-controller");
const router = (0, express_1.Router)();
exports.jwtRoute = router;
router.post('/create', jwt_controller_1.createToken);
router.get('/remove', jwt_controller_1.removeToken);
