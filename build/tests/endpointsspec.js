"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
describe('endpoints test', () => {
    // products endpoints
    it('GET /products is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/products")
            .expect(200);
    });
    it('GET /products is expected to return json', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/products")
            .expect('Content-Type', /json/);
    });
    it('GET /products/1 should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/products/1")
            .expect(200);
    });
    it('POST /products should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .post("/products")
            .send({ title: "y", price: 55, company: "x", describe: "z" })
            .expect(200);
    });
    it('PUT /products/1 should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .put("/products/1")
            .expect(200);
    });
    it('DELETE /products/2 should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .delete("/products/2")
            .expect(200);
    });
    //Users Endpoints
    it('GET /users is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/users")
            .expect(200);
    });
    it('GET /users is expected to return json', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/users")
            .expect('Content-Type', /json/);
    });
    it('GET /users/1 is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/users/1")
            .expect(200);
    });
    it('POST /users should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .post("/users")
            .send({ userName: "momo", fName: "m", lName: "s", password: "ayhaga" })
            .expect(200);
    });
    it('PUT /users/1 is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .put("/users/1")
            .expect(200);
    });
    it('DELETE /users/2 should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .delete("/users/2")
            .expect(200);
    });
    //orders Endpoints
    it('GET /orders is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/orders")
            .expect(200);
    });
    it('GET /orders is expected to return json', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/orders")
            .expect('Content-Type', /json/);
    });
    it('GET /orders/1 is expected to be fine', () => {
        (0, supertest_1.default)(server_1.default)
            .get("/orders/1")
            .expect(200);
    });
    it('POST /orders should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .post("/orders")
            .send({ userId: 1, products: [], status: "done" })
            .expect(200);
    });
    it('DELETE /orders/1 should be ok', () => {
        (0, supertest_1.default)(server_1.default)
            .delete("/orders/1")
            .expect(200);
    });
});
