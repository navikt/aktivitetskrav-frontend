import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { Page } from "@/components/page/Page";
import { AktivitetskravSkeletonComponent } from "@/components/skeleton/AktivitetskravSkeletonComponent";
import { Vurdering } from "@/components/view/Vurdering";
import { mapVurderingToViewItem } from "@/components/view/viewUtils";
import { useAktivitetskravData } from "@/data/dataHooks";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

interface Props {
  uuidToDisplay: string | string[] | undefined;
  vurderinger: AktivitetskravVurdering[];
}
const DetailedView = ({ uuidToDisplay, vurderinger }: Props) => {
  const viewItem = vurderinger.find(
    (vurdering) => vurdering.internUuid === uuidToDisplay,
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
