import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import { newUserRouter } from '../src/routes/new';
import { indexUserRouter } from '../src/routes/index';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('auth connected to db');
  }
);

const app = express();

app.use(json());

app.use(newUserRouter);
app.use(indexUserRouter);

app.listen(3000, () => {
  console.log('auth listening 3000');
});
