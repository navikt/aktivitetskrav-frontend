import { BodyLong } from "@navikt/ds-react";
import type {
  Oppfylt,
  OppfyltArsaker,
} from "@/schema/aktivitetskravVurderingSchema";

const getAarsakAvsnitt = (arsak: OppfyltArsaker) => {
  switch (arsak) {
    case "FRISKMELDT":
      return "NAV vurderer at du oppfyller aktivitetsplikten siden du er friskmeldt.";
    case "GRADERT":
      return "NAV vurderer at du oppfyller aktivitetsplikten siden du er i gradert arbeid.";
    case "TILTAK":
      return "NAV vurderer at du oppfyller aktivitetsplikten siden du er i tiltak.";
  }
};

interface Props {
  vurdering: Oppfylt;
}
export const VurderingOppfylt = ({ vurdering }: Props) => {
  return <BodyLong>{getAarsakAvsnitt(vurdering.arsaker[0])}</BodyLong>;
};
