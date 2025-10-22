/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from "idb";

const DB_NAME = "ept-db";
const DB_VERSION = 1;
const STORE_NAME = "questions";

export async function saveQuestions(questions: any) {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  await db.put(STORE_NAME, questions, "latest");
}

export async function loadQuestions() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return await db.get(STORE_NAME, "latest");
}
