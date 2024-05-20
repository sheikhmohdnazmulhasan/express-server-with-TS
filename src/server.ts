import { Server } from 'http';
import { app, port } from './app';


let server: Server;

async function bootstrap() {

    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
};



bootstrap();