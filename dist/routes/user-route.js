"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
// user routers
router.post('/create', user_controller_1.createUser);
router.get('/role/:email', user_controller_1.getUserRole);
router.put('/update/:email', user_controller_1.updateUser);
exports.default = router;
