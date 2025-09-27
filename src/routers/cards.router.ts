import express, { Response, Request } from 'express';
import { GetCardsResponse } from '../types';
import { Card } from '../types';
import { CreateCardRequest } from '../types';
import { IdParams } from '../types';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  (req: Request<{}, {}>, res: Response<GetCardsResponse>) => {
    //TODO: Return cards
  },
);
cardsRouter.get('/:id', (req: Request<IdParams>, res: Response<Card>) => {
  //TODO: Return card
});
cardsRouter.post(
  '/',
  (req: Request<{}, CreateCardRequest>, res: Response<Card>) => {
    //TODO: Create card
  },
);
cardsRouter.put('/:id', (req: Request<IdParams, Card>, res: Response<Card>) => {
  //TODO: Update card
});
cardsRouter.delete('/:id', (req: Request<IdParams>, res: Response<void>) => {
  //TODO: Update card
});
