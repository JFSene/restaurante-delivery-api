import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import foodtruck from '../controller/foodtruck';
import newItem from '../controller/registerItem';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/foodtruck', foodtruck({ config, db }));
  router.use('/products', newItem({ config, db }));

});

export default router;
