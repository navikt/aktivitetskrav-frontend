import React from "react";
import { Aktivitetskrav } from "./Aktivitetskrav";
import fixtures from "@/mocks/fixtures";

describe("<Aktivitetskrav />", () => {
  it("Displays infoside for vurdering ny kandidat", () => {
    cy.mount(<Aktivitetskrav aktivitetskrav={fixtures.nyKandidatFixture} />);

    cy.contains("Det er på tide å informere deg om aktivitetsplikten");
  });

  it("Displays infoside for vurdering forhandsvarsel with missing document", () => {
    cy.mount(
      <Aktivitetskrav
        aktivitetskrav={fixtures.forhaandsvarselFixtureWithoutDocument}
      />,
    );

    cy.contains("Det er på tide å informere deg om aktivitetsplikten");
  });

  it("Displays forhaandsvarsel for vurdering forhandsvarsel with document", () => {
    cy.mount(
      <Aktivitetskrav aktivitetskrav={fixtures.forhaandsvarselFixture} />,
    );

    cy.contains("Varsel om stans av sykepenger");
  });

  it("Displays unntaksinfo with årsak for vurdering unntak", () => {
    cy.mount(<Aktivitetskrav aktivitetskrav={fixtures.unntakFixture} />);

    cy.contains("NAV har vurdert aktivitetsplikten din");
    cy.contains(
      "NAV har vurdert aktivitetsplikten din og besluttet at du er unntatt fra aktivitetsplikten på grunn av medisinske opplysninger.",
    );
  });

  it("Displays oppfyltinfo with årsak for vurdering oppfylt", () => {
    cy.mount(<Aktivitetskrav aktivitetskrav={fixtures.oppfyltFixture} />);

    cy.contains("NAV har vurdert aktivitetsplikten din");
    cy.contains("NAV vurderer at du oppfyller aktivitetsplikten siden du er");
  });
});
