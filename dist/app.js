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
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
exports.port = port;
// routers
const userRouter = express_1.default.Router();
const postRouter = express_1.default.Router();
app.use(express_1.default.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
// middleware
function logger(req, res, next) {
    console.log(req.method, req.hostname);
    next();
}
;
// //////
// here is error, now move to global error handler func at the bottom
app.get('/x', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            success: true,
            message: 'task successfully executed'
        });
    }
    catch (error) {
        next(error);
    }
    ;
}));
app.get('/', logger, (req, res) => {
    console.log(req.params);
    res.send('Hello Sheikh!');
});
userRouter.get('/create-user', (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
        message: 'user successfully created',
        data: req.body
    });
});
userRouter.post('/create-post', (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
        message: 'post successfully created',
        data: req.body
    });
});
app.post('/:hello', (req, res) => {
    console.log(req.body);
    res.send('got data');
});
// wrong endpoint error handler
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: 'api endpoint not found'
    });
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something is wrong!"
        });
    }
});
