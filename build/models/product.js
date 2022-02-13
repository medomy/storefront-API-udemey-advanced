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
exports.ProductStore = void 0;
const DB_1 = __importDefault(require("../DB"));
class ProductStore {
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield DB_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can not connect to DB ${err}`);
            }
        });
    }
    getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not find product ${id}. error is ${err}`);
            }
        });
    }
    createProdct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO products (title , price ,descripe, company) VALUES($1, $2, $3, $4) RETURNING *`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [p.title, p.price, p.descripe, p.company]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not add product ${p.title} , the error is ${err}`);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM products WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not delete product ${id} , the error is ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
