import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "@/data/api";
import { render, screen } from "@/test/test-utils";
import {
  ForhandsvarselTestScenario,
  setTestScenario,
} from "@/utils/testScenarioUtils";
import { TestScenarioDevTools } from "./TestScenarioDevTools";

const historikkUrl = "/api/aktivitetsplikt/historikk";

describe("TestScenarioDevTools", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(fetch).mockClear();
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.unstubAllEnvs();
  });

  it.each(["local", "demo"])(
    "bruker infoside i første og senere forespørsler i %s",
    async (environment) => {
      vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);

      await get(historikkUrl);
      render(<TestScenarioDevTools />);
      await get(historikkUrl);

      expect(fetch).toHaveBeenNthCalledWith(
        1,
        historikkUrl,
        expect.objectContaining({ headers: { testscenario: "INFOSIDE" } }),
      );
      expect(fetch).toHaveBeenNthCalledWith(
        2,
        historikkUrl,
        expect.objectContaining({ headers: { testscenario: "INFOSIDE" } }),
      );
    },
  );

  it.each(["local", "demo"])(
    "beholder et valgt scenario i %s",
    async (environment) => {
      vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);
      setTestScenario(ForhandsvarselTestScenario);

      render(<TestScenarioDevTools />);
      await get(historikkUrl);

      expect(fetch).toHaveBeenCalledWith(
        historikkUrl,
        expect.objectContaining({
          headers: { testscenario: "FORHANDSVARSEL" },
        }),
      );
    },
  );

  it.each(["dev", "prod"])(
    "bruker ikke testscenario i %s",
    async (environment) => {
      vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);
      setTestScenario(ForhandsvarselTestScenario);

      render(<TestScenarioDevTools />);
      await get(historikkUrl);

      expect(
        screen.queryByRole("button", { name: "Åpne testscenariovelger" }),
      ).not.toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith(
        historikkUrl,
        expect.objectContaining({ headers: undefined }),
      );
    },
  );
});
