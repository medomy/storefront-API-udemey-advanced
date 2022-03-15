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
const order_1 = require("../models/order");
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const store = new order_1.OrderStore;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = {
            products: req.body.products,
            userId: req.body.userId,
            status: req.body.status
        };
        const postOrder = yield store.create(newOrder);
        res.json(postOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield store.delete(req.params.id);
        res.json(deletedOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const ordersHandler = (app) => {
    app.get('/orders', verifyAuth_1.default, index);
    app.get('/orders/:id', verifyAuth_1.default, show);
    app.post('/orders', verifyAuth_1.default, create);
    app.delete('/orders/:id', verifyAuth_1.default, destroy);
};
exports.default = ordersHandler;
