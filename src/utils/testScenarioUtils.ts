import fixtures from "@/mocks/fixtures";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export type TestScenario =
  | typeof InfoSideTestScenario
  | typeof ForhandsvarselTestScenario;

export const InfoSideTestScenario = "INFOSIDE";
export const ForhandsvarselTestScenario = "FORHANDSVARSEL";

export const setTestScenario = (testScenario: TestScenario) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("aktivitetskrav-testscenario", testScenario);
  }
};

export const getTestScenario = (): TestScenario | undefined => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(
      "aktivitetskrav-testscenario",
    ) as TestScenario;
  }
};

export const getAktivitetskravVurderingForScenario = (testScenario: TestScenario): AktivitetskravVurdering => {
  switch (testScenario) {
    case "INFOSIDE": {
      return fixtures.nyKandidatVurdering;
    }
    case "FORHANDSVARSEL": {
      return fixtures.forhaandsvarselVurdering;
    }
  }
};
