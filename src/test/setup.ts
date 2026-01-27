import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock environment variables needed for the app
process.env.NEXT_PUBLIC_BASE_PATH = "/syk/aktivitetskrav";

// Mock fetch to prevent actual API calls during tests
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: async () => ({}),
  text: async () => "",
} as Response);
