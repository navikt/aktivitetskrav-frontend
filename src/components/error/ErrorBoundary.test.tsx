import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

vi.mock("./PageError", () => ({
  default: () => <p>Fallback</p>,
}));

const ThrowingChild = () => {
  throw new Error("synthetic-render-canary");
};

describe("ErrorBoundary", () => {
  it("lar React/APM eie feilen og viser fallback", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      render(
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>,
      );

      expect(screen.getByText("Fallback")).toBeInTheDocument();
      expect(consoleError).toHaveBeenCalledOnce();
      expect(
        consoleError.mock.calls
          .flat()
          .some((argument) => argument instanceof Error),
      ).toBe(true);
    } finally {
      consoleError.mockRestore();
    }
  });
});
