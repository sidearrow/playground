import express from 'express';
import { validationResult } from 'express-validator';

const validationResultChckerMiddleware: express.Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  }
};

export default validationResultChckerMiddleware;
