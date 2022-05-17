import sqlite, { Database, Statement } from "better-sqlite3";

let db: Database | null;

const prepareCache = new Map<string, Statement<any[]>>();
export const prepare = (query: string): Statement<any[]> => {
  const cached = prepareCache.get(query);
  if (cached) {
    return cached;
  }

  if (!db) {
    db = new sqlite("pmc.sqlite", {
      fileMustExist: true,
    });
  }

  const created = db.prepare(query);
  prepareCache.set(query, created);
  return created;
};
