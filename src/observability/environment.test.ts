import { describe, expect, it } from "vitest";
import { resolveApmEnvironment } from "./environment";

describe("APM environment", () => {
  it("foretrekker clusteret fra NAIS-poden", () => {
    expect(resolveApmEnvironment("prod-gcp", "dev-gcp")).toBe("prod-gcp");
  });

  it("bruker det miljøspesifikke build-clusteret for statiske sider", () => {
    expect(resolveApmEnvironment(undefined, "dev-gcp")).toBe("dev-gcp");
  });

  it("finner ikke på et cluster", () => {
    expect(resolveApmEnvironment(undefined, undefined)).toBeUndefined();
  });
});
