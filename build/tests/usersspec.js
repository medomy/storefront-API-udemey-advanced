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
const user_authentication_1 = require("../models/user-authentication");
const store = new user_authentication_1.UserStore();
describe('user model', () => {
    // getAll tests
    it('index should be there', () => {
        expect(store.index).toBeDefined;
    });
    it('index should return array of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield store.index();
        console.log(users);
        expect(users).toBeInstanceOf(Array);
    }));
    // show tests
    it('first user should be known', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.show(1);
        expect(user).toEqual({ id: 1, fName: "Mohammed", lName: "Salah", userName: "momo", password: "$2b$10$hZRrNrP8zYMp7.hNim4snuA9nmNptsvFWAhIeYMgh.0/QfSoAJ4H." });
    }));
    // create tests
    it('post should be there', () => {
        expect(store.create).toBeDefined;
    });
    it('post func should create a user and return it', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield store.create({ userName: "ay", fName: "mo", lName: "sa", password: "ayhaga" });
        expect(user).toBe(user);
    }));
    // delete tests
    it('delete should be there', () => {
        expect(store.delete).toBeDefined;
    });
    it('delete should delete my selected user', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield store.delete(2);
        expect(deletedUser).toBe(deletedUser);
    }));
});
