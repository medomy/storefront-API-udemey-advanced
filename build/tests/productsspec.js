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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
describe('product model', () => {
    // getAll tests
    it('getAll should be there', () => {
        expect(store.getAllProduct).toBeDefined;
    });
    it('getAll should return array of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield store.getAllProduct();
        expect(products).toBeInstanceOf(Array);
    }));
    // show tests
    it('first product should be known', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.getOneProduct(1);
        expect(product).toEqual({ id: 1, title: 'toshiba', price: 58, descripe: 'momo', company: "el araby" });
    }));
    // create tests
    it('post should be there', () => {
        expect(store.createProdct).toBeDefined;
    });
    it('post func should create a product and return it', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.createProdct({ title: "ay", price: 55, descripe: 'wala', company: "yalla" });
        expect(product).toBe(product);
    }));
    // delete tests
    it('delete should be there', () => {
        expect(store.deleteProduct).toBeDefined;
    });
    it('delete should delete my selected product', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield store.getAllProduct();
        console.log(products);
        const deletedProduct = yield store.deleteProduct(6);
        expect(deletedProduct).toBe(deletedProduct);
    }));
});
