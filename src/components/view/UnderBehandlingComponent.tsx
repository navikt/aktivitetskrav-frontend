"use client";
import { useState } from "react";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/view/aktivitetskravInfo/MedUtenArbeidsgiverToggleGroup";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export type MedUtenAGVisning = "MED_ARBEIDSGIVER" | "UTEN_ARBEIDSGIVER";
export const infoSideHeaderText = "Din aktivitetsplikt";

interface Props {
  vurdering: AktivitetskravVurdering;
}

export const UnderBehandlingComponent = ({ vurdering }: Props) => {
  const [visning, setVisning] = useState<MedUtenAGVisning>("MED_ARBEIDSGIVER");

  return (
    <>
      <ComponentHeader
        headerText={infoSideHeaderText}
        createdAt={vurdering.createdAt}
        alertStyle="info"
      />

      <MedUtenArbeidsgiverToggleGroup setVisning={setVisning} />

      <AktivitetskravInfo harArbeidsgiver={visning === "MED_ARBEIDSGIVER"} />
    </>
  );
};
