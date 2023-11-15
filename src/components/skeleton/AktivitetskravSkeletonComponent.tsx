"use client";
import { Page } from "@/components/page/Page";
import { Skeleton } from "@navikt/ds-react";
import { AktivitetskravInfo } from "@/components/view/aktivitetskravInfo/AktivitetskravInfo";

export const AktivitetskravSkeletonComponent = () => {
  return (
    <Page headerText={<Skeleton>Informasjon om aktivitetsplikt</Skeleton>}>
      <AktivitetskravInfo harArbeidsgiver={true} displaySkeleton={true} />
    </Page>
  );
};
