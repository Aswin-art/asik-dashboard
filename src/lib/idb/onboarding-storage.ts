import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "mindcare-db";
const STORE_NAME = "onboarding";
const DB_VERSION = 1;

let dbInstance: IDBPDatabase | null = null;

async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });

  return dbInstance;
}

export async function getOnboardingStatus(): Promise<boolean> {
  try {
    const db = await getDB();
    const value = await db.get(STORE_NAME, "hasSeenOnboarding");
    return value === true;
  } catch (error) {
    console.error("Error getting onboarding status:", error);
    return false;
  }
}

export async function setOnboardingStatus(value: boolean): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, value, "hasSeenOnboarding");
  } catch (error) {
    console.error("Error setting onboarding status:", error);
  }
}
