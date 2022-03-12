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
exports.OrderStore = void 0;
const DB_1 = __importDefault(require("../DB"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield DB_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can not connect to DB ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM order WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not find order ${id}. error is ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO orders (user_id , products_ids_qtys ,status) VALUES($1, $2, $3) RETURNING *`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [o.userId, JSON.stringify(o.products), o.status]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not add order ${o.id} , the error is ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM orders WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not delete order ${id} , the error is ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
