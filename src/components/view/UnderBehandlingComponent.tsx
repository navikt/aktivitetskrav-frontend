"use client";
import { useState } from "react";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/view/aktivitetskravInfo/MedUtenArbeidsgiverToggleGroup";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

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
        utsendtDato={vurdering.sistVurdert}
        alertStyle="info"
      />

      <MedUtenArbeidsgiverToggleGroup setVisning={setVisning} />

      <AktivitetskravInfo harArbeidsgiver={visning === "MED_ARBEIDSGIVER"} />
    </>
  );
};
