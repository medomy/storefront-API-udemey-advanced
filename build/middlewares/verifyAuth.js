"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const myTokenSecret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "";
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization ? req.headers.authorization : "";
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, myTokenSecret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json(error);
        return;
    }
};
exports.default = verifyAuthToken;
