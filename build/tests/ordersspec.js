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
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe('order model', () => {
    // getAll tests
    it('index should be there', () => {
        expect(store.index).toBeDefined;
    });
    it('index should return array of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield store.index();
        expect(orders).toBeInstanceOf(Array);
    }));
    // show tests
    it('first order should be known', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield store.show(1);
        expect(order).toBe(order);
    }));
    // create tests
    it('post should be there', () => {
        expect(store.create).toBeDefined;
    });
    it('post func should create an order and return it', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield store.create({ userId: 1, status: "done", products: [] });
        expect(order).toBe(order);
    }));
    // delete tests
    it('delete should be there', () => {
        expect(store.delete).toBeDefined;
    });
    it('delete should delete my selected product', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield store.index();
        console.log(orders);
        const deletedOrder = yield store.delete(1);
        expect(deletedOrder).toBe(deletedOrder);
    }));
});
