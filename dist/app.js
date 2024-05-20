"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
exports.port = port;
app.use(express_1.default.json());
// middleware
function logger(req, res, next) {
    console.log(req.method, req.hostname);
    next();
}
;
// //////
app.get('/', logger, (req, res) => {
    console.log(req.params);
    res.send('Hello Sheikh!');
});
app.post('/:hello', (req, res) => {
    console.log(req.body);
    res.send('got data');
});
