"use client";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { Page } from "@/components/page/Page";
import { Skeletor } from "@/components/skeleton/Skeletor";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/view/aktivitetskravInfo/MedUtenArbeidsgiverToggleGroup";
import { infoSideHeaderText } from "@/components/view/UnderBehandlingComponent";

// The skeleton is prerendered at build time, so a date from the clock would
// differ from the browser's render and break hydration. The text is hidden.
const PLACEHOLDER_UTSENDT_DATO = "2000-01-01T12:00:00.000Z";

export const AktivitetskravSkeletonComponent = () => {
  return (
    <Page>
      <AktivitetskravBox>
        <Skeletor displaySkeleton={true}>
          <ComponentHeader
            headerText={infoSideHeaderText}
            utsendtDato={PLACEHOLDER_UTSENDT_DATO}
            alertStyle="info"
          />
        </Skeletor>

        <Skeletor displaySkeleton={true}>
          <MedUtenArbeidsgiverToggleGroup setVisning={() => void 0} />
        </Skeletor>

        <AktivitetskravInfo harArbeidsgiver={true} displaySkeleton={true} />
      </AktivitetskravBox>
    </Page>
  );
};
