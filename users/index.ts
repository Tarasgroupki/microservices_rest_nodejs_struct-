import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './routes/';
import config from './config/config.json';
// const config = require('./config');

const app = express();

/* ---------  Init func ---------- */

(async () => {
  // Connect ot MongoDB
  await mongoose.connect(config.mongodb.uri, config.mongodb.options);

  app.use(morgan('combined'));

  app.use('/', router);

  console.log('Server run on', config.server);
  app.listen(config.server);
})()
  .then(() => {
    console.log('Successful run');
  })
  .catch(err => {
    throw err;
  });
