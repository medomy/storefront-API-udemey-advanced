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
const product_1 = require("../models/product");
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const store = new product_1.ProductStore;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.getAllProduct();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            title: req.body.title,
            price: req.body.price,
            descripe: req.body.descripe,
            company: req.body.company
        };
        const postProduct = yield store.createProdct(newProduct);
        console.log("from products posting");
        res.json(postProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.getOneProduct(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield store.deleteProduct(req.params.id);
        res.json(deletedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const originalProduct = yield store.getOneProduct(req.params.id);
    try {
        const updatedProduct = {
            title: req.body.title ? req.body.title : originalProduct.title,
            price: req.body.price ? req.body.price : originalProduct.price,
            descripe: req.body.descripe ? req.body.descripe : originalProduct.descripe,
            company: req.body.company ? req.body.company : originalProduct.company
        };
        const theUpdatedProduct = yield store.updateProduct(req.params.id, updatedProduct);
        res.json(theUpdatedProduct);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
});
const productsHandler = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuth_1.default, create);
    app.put('/products/:id', verifyAuth_1.default, update);
    app.delete('/products/:id', destroy);
};
exports.default = productsHandler;
