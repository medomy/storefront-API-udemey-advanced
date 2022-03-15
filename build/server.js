"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
const usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
const dashboardHandler_1 = __importDefault(require("./handlers/dashboardHandler"));
const ordersHandler_1 = __importDefault(require("./handlers/ordersHandler"));
const app = (0, express_1.default)();
const port = 3000;
const address = `http://localhost:${port}`;
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use([(0, cors_1.default)(corsOptions), body_parser_1.default.json()]);
app.get('/', (req, res) => {
    res.send('halloha there into my first ever api');
});
// applying handlers
(0, productsHandler_1.default)(app);
(0, usersHandler_1.default)(app);
(0, dashboardHandler_1.default)(app);
(0, ordersHandler_1.default)(app);
app.listen(port, () => {
    console.log(`server opened at ${address}`);
});
exports.default = app;
