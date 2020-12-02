import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { newRoomRouter } from './routes/new';
import { indexRoomRouter } from './routes/index';
import { NotFoundError, currentUser, errorHandler } from '@megamindgame/common';

const app = express();
app.set('port', 3000);

const http = require('http').Server(app);

const io = require('socket.io')(http);

app.set('trust proxy', true);
app.set('port', 3000);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(newRoomRouter);
app.use(indexRoomRouter);
app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

io.on('connection', (socket: any) => {
  console.log('connection');
});

// http.listen(3000, () => {
//   console.log('server listening on 3000');
// });

export { http, app };
// import socketio from 'socket.io'
// import path from 'path'

// import express, { Request, Response } from 'express';
// import * as socketio from "socket.io";
// import * as path from "path";
// import 'express-async-errors';
// import { json } from 'body-parser';
// import cookieSession from 'cookie-session';

// import { errorHandler, NotFoundError, currentUser } from '@megamindgame/common';

// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// app.set('trust proxy', true);
// app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );

// app.use(currentUser);

// app.use(newRoomRouter);
// app.use(indexRoomRouter);

// app.all('*', (req: Request, res: Response) => {
//   throw new NotFoundError();
// });

// app.use(errorHandler);

// export { app, io };
