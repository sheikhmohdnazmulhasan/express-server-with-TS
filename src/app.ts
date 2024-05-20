import express, { NextFunction, Request, Response } from 'express';

const app = express()
const port = 3000;

app.use(express.json());


// middleware

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.hostname);
    next()
};

// //////


app.get('/', logger, (req: Request, res: Response) => {
    console.log(req.params);
    res.send('Hello Sheikh!');
});

app.post('/:hello', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('got data')
})

export { app, port };