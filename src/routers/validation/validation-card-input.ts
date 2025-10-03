import { Card, CreateCardRequest, IdParams } from '../../types';
import { Request, Response } from 'express';

export const validationCardInput = (
  req: Request<IdParams, Card, CreateCardRequest>,
  res: Response,
  next: () => void,
) => {
  const text = req.body.text;
  if (
    typeof req.body !== 'object' ||
    text.trim().length === 0 ||
    typeof text !== 'string' ||
    !text
  ) {
    res.status(400).send({ error: 'validation Error' });
    return;
  }
  next();
};
