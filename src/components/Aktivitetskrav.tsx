import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { ForhandsvarselComponent } from "@/components/ForhandsvarselComponent";
import { AktivitetskravInfoComponent } from "@/components/AktivitetskravInfoComponent";

interface Props {
  aktivitetskrav: AktivitetskravVurdering;
}
export const Aktivitetskrav = ({ aktivitetskrav }: Props) => {
  switch (aktivitetskrav.status) {
    case "FORHANDSVARSEL": {
      if (!aktivitetskrav.document) {
        return <AktivitetskravInfoComponent />;
      }
      return (
        <ForhandsvarselComponent
          fristDato={aktivitetskrav.fristDato}
          document={aktivitetskrav.document}
          sistVurdert={aktivitetskrav.sistVurdert}
          journalpostId={aktivitetskrav.journalpostId}
        />
      );
    }
    default: {
      return <AktivitetskravInfoComponent />;
    }
  }
};
