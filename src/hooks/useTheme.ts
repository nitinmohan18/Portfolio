"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme] = useState<Theme>("dark");

  // Portfolio always uses dark theme — kept for extensibility
  return { theme, isDark: true };
}
