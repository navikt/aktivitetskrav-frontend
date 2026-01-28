import { VurderingIkkeAktuell } from "@/components/view/mottattVurdering/VurderingIkkeAktuell";
import { VurderingOppfylt } from "@/components/view/mottattVurdering/VurderingOppfylt";
import { VurderingUnntak } from "@/components/view/mottattVurdering/VurderingUnntak";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

interface Props {
  vurdering: AktivitetskravVurdering;
}

export const MottattVurderingDetaljer = ({ vurdering }: Props) => {
  switch (vurdering.status) {
    case "OPPFYLT":
      return <VurderingOppfylt vurdering={vurdering} />;
    case "UNNTAK":
      return <VurderingUnntak vurdering={vurdering} />;
    case "IKKE_AKTUELL":
      return <VurderingIkkeAktuell />;
  }
};
