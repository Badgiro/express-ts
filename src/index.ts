import express from 'express';
import { PORT, USER_LOGIN, USER_PASSWORD } from './config';
import { cardsRouter } from './routers/cards.router';
import { createTables } from './database/create-tables';
import basicAuth from 'express-basic-auth';
import { boardsRouter } from './routers/boards.router';

async function run() {
  await createTables();
  const server = express();
  server.use(
    basicAuth({
      users: { [USER_LOGIN]: USER_PASSWORD },
      challenge: true,
    }),
  );

  server.use(express.json());

  server.get('/', (request, response) => {
    response.send('You are ok');
  });
  server.use('/cards', cardsRouter);
  server.use('/boards', boardsRouter);

  server.listen(+PORT);
}
run().catch((error) => console.error(error));
