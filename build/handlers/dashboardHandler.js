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
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.Dashboard;
const userswithcart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userswithcarts = yield dashboard.usersCarts();
        res.json(userswithcart);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
});
const dashboardHandler = (app) => {
    app.get('/userswithcarts', userswithcart);
};
exports.default = dashboardHandler;
