// import React from "react";
// import { Aktivitetskrav } from "./Aktivitetskrav";
// import fixtures from "@/mocks/fixtures";
// import { infoSideHeaderText } from "@/components/view/AktivitetskravInfoComponent";
// import { forhandsVarselHeaderText } from "@/components/view/ForhandsvarselComponent";
//
// describe("<Aktivitetskrav />", () => {
//   it("Displays infoside for Ny kandidat", () => {
//     cy.mount(<Aktivitetskrav aktivitetskrav={fixtures.nyKandidatFixture} />);
//
//     cy.contains(infoSideHeaderText);
//   });
//
//   it("Displays infoside for forhandsvarsel with missing document", () => {
//     cy.mount(
//       <Aktivitetskrav
//         aktivitetskrav={fixtures.forhaandsvarselVurderingWithoutDocument}
//       />,
//     );
//
//     cy.contains(infoSideHeaderText);
//   });
//
//   it("Displays forhaandsvarsel for forhandsvarsel with document", () => {
//     cy.mount(
//       <Aktivitetskrav aktivitetskrav={fixtures.forhaandsvarselVurdering} />,
//     );
//
//     cy.contains(forhandsVarselHeaderText);
//   });
//
//   it("Defaults to infoside for other states", () => {
//     cy.mount(<Aktivitetskrav aktivitetskrav={fixtures.unntakVurdering} />);
//
//     cy.contains(infoSideHeaderText);
//   });
// });
