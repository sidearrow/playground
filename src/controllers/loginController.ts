import express from 'express';
import { check } from 'express-validator';
import validationResultChckerMiddleware from '../middlewares/validationResultChckerMIddleware';

const middleware: express.Handler = (req, res, next) => {
  next();
};

const controller: express.Handler = (req, res) => {
  res.send(req.params);
};

export default [
  middleware,
  check('loginId').isLength({ min: 5 }),
  validationResultChckerMiddleware,
  controller,
];
