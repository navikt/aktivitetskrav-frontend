import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export interface AktivitetskravViewItem {
  type:
    | "UNDER_BEHANDLING"
    | "FORHANDSVARSEL"
    | "MOTTATT_VURDERING"
    | "IKKE_OPPFYLT";
  vurdering: AktivitetskravVurdering;
}

export const mapVurderingerToViewItem = (
  vurderinger: AktivitetskravVurdering[],
): AktivitetskravViewItem[] => {
  return vurderinger.map((vurdering) => mapVurderingToViewItem(vurdering));
};

export const mapVurderingToViewItem = (
  vurdering: AktivitetskravVurdering,
): AktivitetskravViewItem => {
  switch (vurdering.status) {
    case "FORHANDSVARSEL": {
      return {
        type: !!vurdering.document ? "FORHANDSVARSEL" : "UNDER_BEHANDLING",
        vurdering: vurdering,
      };
    }
    case "AVVENT":
    case "NY":
    case "NY_VURDERING": {
      return {
        type: "UNDER_BEHANDLING",
        vurdering: vurdering,
      };
    }
    case "UNNTAK":
    case "OPPFYLT":
    case "IKKE_AKTUELL":
      return {
        type: "MOTTATT_VURDERING",
        vurdering: vurdering,
      };
    case "IKKE_OPPFYLT": {
      return {
        type: "IKKE_OPPFYLT",
        vurdering: vurdering,
      };
    }
  }
};

interface SplittedAktivitetskrav {
  activeVurdering: AktivitetskravViewItem | null;
  historicVurderinger: AktivitetskravViewItem[] | null;
}

export const getViewItems = (
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
