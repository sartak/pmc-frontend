import sqlite, { Statement } from "better-sqlite3";

const db = new sqlite("pmc.sqlite", {
  fileMustExist: true,
});

const prepareCache = new Map<string, Statement<any[]>>();
export const prepare = (query: string): Statement<any[]> => {
  const cached = prepareCache.get(query);
  if (cached) {
    return cached;
  }

  const created = db.prepare(query);
  prepareCache.set(query, created);
  return created;
};
