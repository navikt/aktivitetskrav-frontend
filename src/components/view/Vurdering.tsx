import type { ReactElement } from "react";
import { ForhandsvarselComponent } from "@/components/view/ForhandsvarselComponent";
import { IkkeOppfyltComponent } from "@/components/view/ikkeOppfylt/IkkeOppfyltComponent";
import { MottattVurderingComponent } from "@/components/view/MottattVurderingComponent";
import { UnderBehandlingComponent } from "@/components/view/UnderBehandlingComponent";
import type { AktivitetskravViewItem } from "@/components/view/viewUtils";

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
      return <IkkeOppfyltComponent vurdering={viewItem.vurdering} />;
    default:
      return null;
  }
};
