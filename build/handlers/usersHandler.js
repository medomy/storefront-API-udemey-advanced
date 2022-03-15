"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_authentication_1 = require("../models/user-authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
dotenv_1.default.config();
// token secret passed into the sign method of jwt to generate and return the user's token (used ternary operator as a null safety);
const token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "";
const store = new user_authentication_1.UserStore;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        //const token = jwt.sign({ user: user }, token_secret);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            fName: req.body.firstName,
            lName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        };
        const postedUser = yield store.create(newUser);
        const token = jsonwebtoken_1.default.sign({ user: postedUser }, token_secret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(req.params.id);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.id);
    try {
        const updatedUser = {
            fName: req.body.fName ? req.body.fName : user.fName,
            lName: req.body.lName ? req.body.lName : user.lName,
            userName: req.body.userName ? req.body.userName : user.userName,
            password: req.body.password ? req.body.password : user.password
        };
        const theUpdatedUser = yield store.update(req.params.id, updatedUser);
        const token = jsonwebtoken_1.default.sign({ user: theUpdatedUser }, token_secret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authenticatedUser = yield store.authinticate(req.body.userName, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, token_secret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// for cart table (many to many relation between users and products);
const postCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postedCart = yield store.addCartItem(req.body.quantity, req.params.id, req.body.productId);
        res.json(postedCart);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield store.getCartItem(req.params.id);
        res.json(cartItems);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const usersHandler = (app) => {
    app.get('/users', verifyAuth_1.default, index);
    app.get('/users/:id', verifyAuth_1.default, show);
    app.post('/users/authenticate', authenticate);
    app.post('/users', create);
    app.put('/users/:id', verifyAuth_1.default, update);
    app.delete('/users/:id', verifyAuth_1.default, destroy);
    app.post('/users/:id/cart', postCart);
    app.get('/users/:id/cart', getCart);
};
exports.default = usersHandler;
