import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AktivitetskravSkeletonComponent } from "./AktivitetskravSkeletonComponent";

const renderOn = (date: string) => {
  vi.setSystemTime(new Date(date));
  return renderToString(<AktivitetskravSkeletonComponent />);
};

describe("AktivitetskravSkeletonComponent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("rendrer lik markup uavhengig av dagens dato, så forhåndsrendret HTML hydrerer", () => {
    expect(renderOn("2026-11-18T10:00:00.000Z")).toBe(
      renderOn("2026-11-17T10:00:00.000Z"),
    );
  });
});
