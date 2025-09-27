import { Database } from 'sqlite3';
import { SQLITE_PATH } from '../config';

const db = new Database(SQLITE_PATH, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('Database connected');
});

//run
//get
//all

export const sqliteRun = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((res, rej) => {
    db.run(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return rej(error);
      }
      res(data);
    });
  });
};
export const sqliteGet = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((res, rej) => {
    db.get(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return rej(error);
      }
      res(data);
    });
  });
};
export const sqliteAll = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((res, rej) => {
    db.all(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        return rej(error);
      }
      res(data);
    });
  });
};
