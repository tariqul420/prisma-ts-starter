"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ error: 'Unauthorized access' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.cookie.tokenSecret || '');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Unauthorized access' });
    }
};
exports.verifyToken = verifyToken;
const verifyAdmin = async (req, res, next) => {
    const email = req.user?.email;
    if (!email) {
        res.status(401).send({ error: 'Unauthorized access' });
        return;
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user || user.role !== 'ADMIN') {
            res
                .status(403)
                .send({ message: 'Forbidden access. Only admins have access!' });
            return;
        }
        next();
    }
    catch (err) {
        const error = err;
        res.status(500).send({ error: 'Server error', details: error.message });
    }
};
exports.verifyAdmin = verifyAdmin;
