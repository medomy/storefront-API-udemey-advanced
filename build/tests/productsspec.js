"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
describe('product model', () => {
    it('should have a getAll method', () => {
        expect(store.getAllProduct).toBeDefined();
    });
});
