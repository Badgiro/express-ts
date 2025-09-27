import express from 'express';
import { PORT } from './config';
import { cardsRouter } from './routers/cards.router';
import { createTables } from './database/create-tables';

async function run() {
  await createTables();
  const server = express();

  server.get('/', (request, response) => {
    response.send('You are ok');
  });
  server.use('/cards', cardsRouter);

  server.listen(+PORT);
}
run().catch((error) => console.error(error));
