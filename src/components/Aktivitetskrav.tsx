import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { Page } from "@/components/page/Page";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import React from "react";
import { HistoricEventsSummary } from "@/components/history/HistoricEventsSummary";
import { getViewItems } from "@/components/view/viewUtils";
import { Vurdering } from "@/components/view/Vurdering";

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
