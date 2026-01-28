import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";

import { Aktivitetskrav } from "./Aktivitetskrav";
import fixtures from "@/mocks/fixtures";

describe("Aktivitetskrav", () => {
  it("Displays infoside for vurdering ny kandidat", () => {
    render(<Aktivitetskrav aktivitetskrav={fixtures.nyKandidatFixture} />);

    expect(screen.getByText("Din aktivitetsplikt")).toBeInTheDocument();
  });

  it("Displays infoside for vurdering forhandsvarsel with missing document", () => {
    render(
      <Aktivitetskrav
        aktivitetskrav={fixtures.forhaandsvarselFixtureWithoutDocument}
      />,
    );

    expect(screen.getByText("Din aktivitetsplikt")).toBeInTheDocument();
  });

  it("Displays forhaandsvarsel for vurdering forhandsvarsel with document", () => {
    render(<Aktivitetskrav aktivitetskrav={fixtures.forhaandsvarselFixture} />);

    expect(
      screen.getByText("Varsel om mulig stans av sykepenger"),
    ).toBeInTheDocument();
  });

  it("Displays unntaksinfo with årsak for vurdering unntak", () => {
    render(<Aktivitetskrav aktivitetskrav={fixtures.unntakFixture} />);

    expect(
      screen.getByText("NAV har vurdert aktivitetsplikten din"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "NAV har vurdert aktivitetsplikten din og besluttet at du er unntatt fra aktivitetsplikten på grunn av medisinske opplysninger.",
      ),
    ).toBeInTheDocument();
  });

  it("Displays oppfyltinfo with årsak for vurdering oppfylt", () => {
    render(<Aktivitetskrav aktivitetskrav={fixtures.oppfyltFixture} />);

    expect(
      screen.getByText("NAV har vurdert aktivitetsplikten din"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "NAV vurderer at du oppfyller aktivitetsplikten siden du er i tiltak.",
      ),
    ).toBeInTheDocument();
  });
});
