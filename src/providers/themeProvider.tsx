"use client"; // 👈 This ensures it's a Client Component

import { ThemeProvider } from "@material-tailwind/react";

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
