"use client";
import { useEffect } from "react";

export const MswEnabler = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NODE_ENV === "development") {
        const msw = require("./browser");
        msw.worker()
      }
    }
  }, []);

  return null;
};