import fixtures from "@/mocks/fixtures";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export type TestScenario =
  | typeof InfoSideTestScenario
  | typeof IkkeAktuellTestScenario
  | typeof InnstillingOmStansTestScenario
  | typeof UnntakTestScenario
  | typeof OppfyltTestScenario
  | typeof ForhandsvarselTestScenario;

export const InfoSideTestScenario = "INFOSIDE";
export const ForhandsvarselTestScenario = "FORHANDSVARSEL";
export const IkkeAktuellTestScenario = "IKKEAKTUELL";
export const InnstillingOmStansTestScenario = "INNSTILLING_OM_STANS";
export const UnntakTestScenario = "UNNTAK";
export const OppfyltTestScenario = "OPPFYLT";

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

export const getAktivitetskravVurderingForScenario = (
  testScenario: TestScenario,
): AktivitetskravVurdering[] => {
  switch (testScenario) {
    case "INFOSIDE": {
      return fixtures.nyKandidatFixture;
    }
    case "FORHANDSVARSEL": {
      return fixtures.forhaandsvarselFixture;
    }
    case "OPPFYLT": {
      return fixtures.oppfyltFixture;
    }
    case "IKKEAKTUELL": {
      return fixtures.ikkeAktuellFixture;
    }
    case "INNSTILLING_OM_STANS": {
      return fixtures.ikkeOppfyltFixture;
    }
    case "UNNTAK": {
      return fixtures.unntakFixture;
    }
  }
};
