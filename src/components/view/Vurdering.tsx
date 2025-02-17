import React, { ReactElement } from "react";
import { ForhandsvarselComponent } from "@/components/view/ForhandsvarselComponent";
import { UnderBehandlingComponent } from "@/components/view/UnderBehandlingComponent";
import { MottattVurderingComponent } from "@/components/view/MottattVurderingComponent";
import { AktivitetskravViewItem } from "@/components/view/viewUtils";
import { IkkeOppfyltComponent } from "@/components/view/ikkeOppfylt/IkkeOppfyltComponent";

interface Props {
  viewItem?: AktivitetskravViewItem | null;
}

export const Vurdering = ({ viewItem }: Props): ReactElement | null => {
  if (!viewItem) return null;

  switch (viewItem.type) {
    case "FORHANDSVARSEL": {
      return <ForhandsvarselComponent vurdering={viewItem.vurdering} />;
    }
    case "MOTTATT_VURDERING":
      return <MottattVurderingComponent vurdering={viewItem.vurdering} />;
    case "UNDER_BEHANDLING":
      return <UnderBehandlingComponent vurdering={viewItem.vurdering} />;
    case "INNSTILLING_OM_STANS":
    case "IKKE_OPPFYLT":
      return <IkkeOppfyltComponent vurdering={viewItem.vurdering} />;
    default:
      return null;
  }
};
