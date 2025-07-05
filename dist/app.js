"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_route_1 = require("./routes/user-route");
// Express app initialization
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(config_1.default.cors));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/user', user_route_1.userRoute);
// Global error handler (should be after routes)
app.use(error_middleware_1.errorHandler);
exports.default = app;
