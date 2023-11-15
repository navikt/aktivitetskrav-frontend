import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { AktivitetskravInfoComponent } from "@/components/view/AktivitetskravInfoComponent";
import { ForhandsvarselComponent } from "@/components/view/ForhandsvarselComponent";

interface Props {
  aktivitetskrav: AktivitetskravVurdering;
}
export const Aktivitetskrav = ({ aktivitetskrav }: Props) => {
  switch (aktivitetskrav.status) {
    case "FORHANDSVARSEL": {
      if (!aktivitetskrav.document) {
        return <AktivitetskravInfoComponent />;
      }
      return <ForhandsvarselComponent document={aktivitetskrav.document} />;
    }
    default: {
      return <AktivitetskravInfoComponent />;
    }
  }
};
