/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { openDB } from "idb";

export function useQuestionsCache() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const db = await openDB("ept-db", 1, {
        upgrade(db: any) {
          if (!db.objectStoreNames.contains("questions")) {
            db.createObjectStore("questions");
          }
        },
      });
      const data = await db.get("questions", "latest");
      setQuestions(data || []);
    })();
  }, []);

  return { questions };
}
