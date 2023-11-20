import React from "react";
import { NextPage } from "next";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { AktivitetskravSkeletonComponent } from "@/components/skeleton/AktivitetskravSkeletonComponent";
import { useAktivitetskravData } from "@/data/dataHooks";
import { mapVurderingToViewItem } from "@/components/view/viewUtils";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { Vurdering } from "@/components/view/Vurdering";
import { useRouter } from "next/router";
import { Page } from "@/components/page/Page";

interface Props {
  uuidToDisplay: string | string[] | undefined;
  vurderinger: AktivitetskravVurdering[];
}
const DetailedView = ({ uuidToDisplay, vurderinger }: Props) => {
  const viewItem = vurderinger.find(
    (vurdering) => vurdering.vurderingUuid === uuidToDisplay,
  );

  if (viewItem) {
    return (
      <Page>
        <AktivitetskravBox>
          <Vurdering viewItem={mapVurderingToViewItem(viewItem)} />
        </AktivitetskravBox>
      </Page>
    );
  }

  throw new Error("Could not find viewItem");
};

const DetailsPage: NextPage = () => {
  const { isPending, error, data } = useAktivitetskravData();
  const router = useRouter();
  const uuid = router.query.uuid;

  if (error) {
    throw error;
  }

  return isPending ? (
    <AktivitetskravSkeletonComponent />
  ) : (
    <DetailedView uuidToDisplay={uuid} vurderinger={data} />
  );
};

export default DetailsPage;
