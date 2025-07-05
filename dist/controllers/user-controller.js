"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUserRole = void 0;
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
const createUser = async (req, res, next) => {
    try {
        const userdata = req.body;
        // Validate required fields
        if (!userdata.email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email: userdata.email },
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }
        const newUser = await prisma_1.default.user.create({
            data: { ...req.body },
        });
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        const updatedData = req.body;
        const updatedUser = await prisma_1.default.user.update({
            where: { email },
            data: updatedData,
        });
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
