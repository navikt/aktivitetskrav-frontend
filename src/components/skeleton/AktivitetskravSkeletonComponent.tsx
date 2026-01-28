"use client";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { Page } from "@/components/page/Page";
import { Skeletor } from "@/components/skeleton/Skeletor";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/view/aktivitetskravInfo/MedUtenArbeidsgiverToggleGroup";
import { infoSideHeaderText } from "@/components/view/UnderBehandlingComponent";

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
