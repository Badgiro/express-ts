import express, { Response, Request } from 'express';
import { GetBoardsResponse } from '../types/boards';
import { Board } from '../types/boards';
import { CreateBoardsRequest } from '../types/boards';
import { IdParams } from '../types';
import {
  createBoard,
  deleteBoard,
  getManyBoards,
  getOneBoard,
  updateBoard,
} from '../database/boards-repository';
import { randomUUID } from 'crypto';
import { validationBoardInput } from './validation/validation-board-input';

export const boardsRouter = express.Router();

boardsRouter.get(
  '/',
  async (req: Request<{}, {}>, res: Response<GetBoardsResponse>) => {
    const boards = await getManyBoards();
    res.send(boards);
  },
);
boardsRouter.get(
  '/:id',
  async (req: Request<IdParams>, res: Response<Board | string | null>) => {
    const board = await getOneBoard(req.params.id);
    if (!board) {
      res.status(404).send('Board not  found');
    }

    res.send(board);
  },
);
boardsRouter.post(
  '/',
  validationBoardInput,
  async (
    req: Request<{}, Board, CreateBoardsRequest>,
    res: Response<Board>,
  ) => {
    const board: Board = {
      name: req.body.name,
      id: randomUUID(),
    };
    await createBoard(board);
    res.send(board);
  },
);
boardsRouter.put(
  '/:id',
  validationBoardInput,
  async (
    req: Request<IdParams, Board, CreateBoardsRequest>,
    res: Response<Board>,
  ) => {
    const board = {
      id: req.params.id,
      name: req.body.name,
    };
    await updateBoard(board);
    res.send(board);
  },
);
boardsRouter.delete(
  '/:id',
  async (req: Request<IdParams>, res: Response<void>) => {
    await deleteBoard(req.params.id);
    res.sendStatus(204);
  },
);
