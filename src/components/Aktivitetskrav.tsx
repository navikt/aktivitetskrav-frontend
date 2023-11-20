import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { Page } from "@/components/page/Page";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import React from "react";
import { HistoricEventsSummary } from "@/components/history/HistoricEventsSummary";
import {AktivitetskravViewItem, mapVurderingerToViewItem} from "@/components/view/viewUtils";
import {Vurdering} from "@/components/view/Vurdering";

interface Props {
  aktivitetskrav: AktivitetskravVurdering[];
}

interface SplittedAktivitetskrav {
  activeVurdering: AktivitetskravViewItem | null;
  historicVurderinger: AktivitetskravViewItem[] | null;
}

const getViewItems = (
  aktivitetskrav: AktivitetskravVurdering[],
): SplittedAktivitetskrav => {
  if (!aktivitetskrav) {
    return {
      activeVurdering: null,
      historicVurderinger: null,
    };
  }

  const copiedAktivitetskrav = [...aktivitetskrav];

  const aktivitetsKravToViewItems =
    mapVurderingerToViewItem(copiedAktivitetskrav);

  const viewItemsWithoutDuplicates = aktivitetsKravToViewItems.filter(
    (vurdering, index) => {
      const previousVurdering = aktivitetsKravToViewItems[index - 1];

      if (!previousVurdering) return true;

      return previousVurdering.type !== vurdering.type;
    },
  );

  const activeVurdering: AktivitetskravViewItem | null =
    viewItemsWithoutDuplicates.pop() || null;

  return {
    activeVurdering: activeVurdering,
    historicVurderinger: viewItemsWithoutDuplicates,
  };
};

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
