"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics, isFirebaseClientConfigured } from "../lib/firebase-client";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (!isFirebaseClientConfigured()) {
      return;
    }

    void getFirebaseAnalytics();
  }, []);

  return null;
}
