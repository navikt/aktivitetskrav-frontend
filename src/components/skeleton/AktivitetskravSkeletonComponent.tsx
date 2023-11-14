"use client";
import { Page } from "@/components/page/Page";
import { AktivitetskravInfo } from "@/components/aktivitetskrav/AktivitetskravInfo";
import { Link, Skeleton } from "@navikt/ds-react";

export const AktivitetskravSkeletonComponent = () => {
  return (
    <Page headerText={<Skeleton>Informasjon om aktivitetsplikt</Skeleton>}>
      <AktivitetskravInfo harArbeidsgiver={true} displaySkeleton={true} />

      <Link
        className="flex self-center"
        href={process.env.NEXT_PUBLIC_MIN_SIDE_URL}
      >
        Naviger til Min side
      </Link>
    </Page>
  );
};
