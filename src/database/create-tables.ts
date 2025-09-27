import { sqliteRun } from './db-connection';

export const createTables = async (): Promise<void> => {
  sqliteRun(`
    CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL
    );
    `);
};
