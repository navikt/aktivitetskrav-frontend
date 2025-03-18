"use client";
import { Page } from "@/components/page/Page";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { infoSideHeaderText } from "@/components/view/UnderBehandlingComponent";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/view/aktivitetskravInfo/MedUtenArbeidsgiverToggleGroup";
import { Skeletor } from "@/components/skeleton/Skeletor";

export const AktivitetskravSkeletonComponent = () => {
  return (
    <Page>
      <AktivitetskravBox>
        <Skeletor displaySkeleton={true}>
          <ComponentHeader
            headerText={infoSideHeaderText}
            utsendtDato={new Date().toISOString()}
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
