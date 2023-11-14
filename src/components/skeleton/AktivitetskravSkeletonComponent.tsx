"use client";
import { Page } from "@/components/page/Page";
import { AktivitetskravInfo } from "@/components/aktivitetskrav/AktivitetskravInfo";
import { Skeleton } from "@navikt/ds-react";

export const AktivitetskravSkeletonComponent = () => {
  return (
    <Page headerText={<Skeleton>Informasjon om aktivitetsplikt</Skeleton>}>
      <AktivitetskravInfo harArbeidsgiver={true} displaySkeleton={true} />
    </Page>
  );
};
