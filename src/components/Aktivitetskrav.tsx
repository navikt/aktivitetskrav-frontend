import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { HistoricEventsSummary } from "@/components/history/HistoricEventsSummary";
import { Page } from "@/components/page/Page";
import { Vurdering } from "@/components/view/Vurdering";
import { getViewItems } from "@/components/view/viewUtils";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

interface Props {
  aktivitetskrav: AktivitetskravVurdering[];
}

export const Aktivitetskrav = ({ aktivitetskrav }: Props) => {
  const { activeVurdering, historicVurderinger } = getViewItems(aktivitetskrav);

  return (
    <Page>
      <AktivitetskravBox>
        <Vurdering viewItem={activeVurdering} />
      </AktivitetskravBox>

      <HistoricEventsSummary historicVurderinger={historicVurderinger} />
    </Page>
  );
};
