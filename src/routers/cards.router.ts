import express, { Response, Request } from 'express';
import { GetCardsResponse } from '../types';
import { Card } from '../types';
import { CreateCardRequest } from '../types';
import { IdParams } from '../types';
import {
  createCard,
  deleteCard,
  getManyCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository';
import { randomUUID } from 'crypto';
import { validationCardInput } from './validation/validation-card-input';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  async (req: Request<{}, {}>, res: Response<GetCardsResponse>) => {
    const cards = await getManyCards();
    res.send(cards);
  },
);
cardsRouter.get(
  '/:id',
  async (req: Request<IdParams>, res: Response<Card | string | null>) => {
    const card = await getOneCard(req.params.id);
    if (!card) {
      res.status(404).send('Card not  found');
    }

    res.send(card);
  },
);
cardsRouter.post(
  '/',
  validationCardInput,
  async (req: Request<{}, Card, CreateCardRequest>, res: Response<Card>) => {
    const card: Card = {
      text: req.body.text,
      id: randomUUID(),
    };
    await createCard(card);
    res.send(card);
  },
);
cardsRouter.put(
  '/:id',
  validationCardInput,
  async (
    req: Request<IdParams, Card, CreateCardRequest>,
    res: Response<Card>,
  ) => {
    const card = {
      id: req.params.id,
      text: req.body.text,
    };
    await updateCard(card);
    res.send(card);
  },
);
cardsRouter.delete(
  '/:id',
  async (req: Request<IdParams>, res: Response<void>) => {
    await deleteCard(req.params.id);
    res.sendStatus(204);
  },
);
