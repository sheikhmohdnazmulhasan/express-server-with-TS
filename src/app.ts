import express, { NextFunction, Request, Response } from 'express';

const app = express()
const port = 3000;

// routers
const userRouter = express.Router();
const postRouter = express.Router();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// middleware
function logger(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.hostname);
    next()
};

// //////

// here is error, now move to global error handler func at the bottom
app.get('/x', async (req: Request, res: Response, next: NextFunction) => {

    try {

        res.status(200).json({
            success: true,
            message: 'task successfully executed'
        });

    } catch (error) {
        next(error)
    };

});

app.get('/', logger, (req: Request, res: Response) => {
    console.log(req.params);
    res.send('Hello Sheikh!');
});

userRouter.get('/create-user', (req: Request, res: Response) => {
    console.log(req.body);

    res.json({
        success: true,
        message: 'user successfully created',
        data: req.body
    });

});

userRouter.post('/create-post', (req: Request, res: Response) => {
    console.log(req.body);

    res.json({
        success: true,
        message: 'post successfully created',
        data: req.body
    });
})

app.post('/:hello', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('got data')
});

// wrong endpoint error handler
app.all("*", (req: Request, res: Response) => {

    res.status(404).json({
        success: false,
        message: 'api endpoint not found'
    });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    if (error) {
        console.log(error);

        res.status(400).json({
            success: false,
            message: "something is wrong!"
        });
    }
});

export { app, port };