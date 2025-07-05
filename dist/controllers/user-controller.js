"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getUserRole = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json({ role: user.role });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserRole = getUserRole;
