import { BodyLong } from "@navikt/ds-react";
import type {
  Unntak,
  UnntakArsaker,
} from "@/schema/aktivitetskravVurderingSchema";

const getAarsakAvsnitt = (arsak: UnntakArsaker) => {
  switch (arsak) {
    case "MEDISINSKE_GRUNNER":
      return "NAV har vurdert aktivitetsplikten din og besluttet at du er unntatt fra aktivitetsplikten på grunn av medisinske opplysninger.";
    case "TILRETTELEGGING_IKKE_MULIG":
      return "NAV har vurdert aktivitetsplikten din og besluttet at du er unntatt fra aktivitetsplikten siden tilrettelegging på arbeidsplassen ikke er mulig.";
    case "SJOMENN_UTENRIKS":
      return "NAV vurderer at du er unntatt fra aktivitetsplikten.";
  }
};

interface Props {
  vurdering: Unntak;
}
export const VurderingUnntak = ({ vurdering }: Props) => {
  return (
    <BodyLong className="font-bold">
      {getAarsakAvsnitt(vurdering.arsaker[0])}
    </BodyLong>
  );
};
