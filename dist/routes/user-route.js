"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
exports.userRoute = router;
// user routers
router.post('/create', user_controller_1.createUser);
router.get('/role/:email', user_controller_1.getUserRole);
router.put('/update/:email', user_controller_1.updateUser);
