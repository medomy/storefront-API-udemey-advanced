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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const DB_1 = __importDefault(require("../DB"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = (_a = process.env.BCRYPT_PASSWORD) === null || _a === void 0 ? void 0 : _a.toString();
const salt = process.env.SALT_ROUNDS;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield DB_1.default.connect();
                const sql = 'SELECT * FROM users';
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
                const sql = `SELECT * FROM users WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not find user ${id}. error is ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (fname , lname ,username, password) VALUES($1, $2, $3, $4) RETURNING *`;
                const connection = yield DB_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt ? salt : "10"));
                const result = yield connection.query(sql, [u.fName, u.lName, u.userName, hash]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not add user ${u.userName} , the error is ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM users WHERE id=($1)`;
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not delete user ${id} , the error is ${err}`);
            }
        });
    }
    update(id, u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE users SET fname=($1) , lname=($2) , username=($3), password=($4) WHERE id=($5) RETURNING *; `;
                const connection = yield DB_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt ? salt : "10"));
                const result = yield connection.query(sql, [u.fName, u.lName, u.userName, hash, id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can not update user ${id} , the error is ${err}`);
            }
        });
    }
    authinticate(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE username=($1)';
                const connection = yield DB_1.default.connect();
                console.log("connecting");
                const result = yield connection.query(sql, [userName]);
                console.log(result.rows);
                connection.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    console.log(user);
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                    else {
                        throw new Error("password is incorrect");
                    }
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error(`can not authenticate ${err}`);
            }
        });
    }
    // for the cart items table (users is the prmary entity for it)
    addCartItem(qty, userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO cart_items(quantity, user_id , product_id) VALUES($1, $2, $3) RETURNING *;';
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [qty, userId, productId]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`can't add cart items ,${err}`);
            }
        });
    }
    getCartItem(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM cart_items WHERE user_id=($1);';
                const connection = yield DB_1.default.connect();
                const result = yield connection.query(sql, [userId]);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can not get cart items for user ${userId} , ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
