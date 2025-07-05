"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const createToken = async (req, res, next) => {
    try {
        const userInfo = req.body;
        const token = jsonwebtoken_1.default.sign(userInfo, config_1.default.cookie.tokenSecret, {
            expiresIn: '1d',
        });
        res
            .cookie(config_1.default.cookie.tokenName, token, {
            httpOnly: true,
            secure: config_1.default.nodeEnv === 'production',
            sameSite: config_1.default.nodeEnv === 'production' ? 'none' : 'strict',
        })
            .send({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.createToken = createToken;
const removeToken = async (req, res, next) => {
    try {
        res
            .clearCookie(config_1.default.cookie.tokenName, {
            httpOnly: true,
            secure: config_1.default.nodeEnv === 'production',
            sameSite: config_1.default.nodeEnv === 'production' ? 'none' : 'strict',
            path: '/',
        })
            .send({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeToken = removeToken;
