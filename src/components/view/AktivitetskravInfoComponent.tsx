"use client";
import { Page } from "@/components/page/Page";
import { useState } from "react";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/aktivitetskrav/MedUtenArbeidsgiverToggleGroup";
import { AktivitetskravInfo } from "@/components/aktivitetskrav/AktivitetskravInfo";

export type MedUtenAGVisning = "MED_ARBEIDSGIVER" | "UTEN_ARBEIDSGIVER";
export const infoSideHeaderText = "Informasjon om aktivitetsplikt";

export const AktivitetskravInfoComponent = () => {
  const [visning, setVisning] = useState<MedUtenAGVisning>("MED_ARBEIDSGIVER");

  return (
    <Page headerText={infoSideHeaderText} image={visning}>
      <MedUtenArbeidsgiverToggleGroup setVisning={setVisning} />

      <AktivitetskravInfo harArbeidsgiver={visning === "MED_ARBEIDSGIVER"} />
    </Page>
  );
};
