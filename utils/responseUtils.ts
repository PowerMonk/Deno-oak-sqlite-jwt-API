import { DatabaseRow } from "../db/dbMod.ts";

export function isEmptyObject(obj: DatabaseRow | null): boolean {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
}
