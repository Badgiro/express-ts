import { Board, CreateBoardsRequest } from '../../types/boards';
import { IdParams } from '../../types';
import { Request, Response } from 'express';

export const validationBoardInput = (
  req: Request<IdParams, Board, CreateBoardsRequest>,
  res: Response,
  next: () => void,
) => {
  const name = req.body.name;
  if (
    typeof req.body !== 'object' ||
    name.trim().length === 0 ||
    typeof name !== 'string' ||
    !name
  ) {
    res.status(400).send({ error: 'validation Error' });
    return;
  }
  next();
};
