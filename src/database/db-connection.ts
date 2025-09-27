import { Database } from 'sqlite3';
import { SQLITE_PATH } from '../config';

const db = new Database(SQLITE_PATH, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('Database connected');
});
