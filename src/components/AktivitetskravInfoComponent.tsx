import { Page } from "@/components/page/Page";
import { useState } from "react";
import { MedUtenArbeidsgiverToggleGroup } from "@/components/aktivitetskrav/MedUtenArbeidsgiverToggleGroup";
import { AktivitetskravInfo } from "@/components/aktivitetskrav/AktivitetskravInfo";
import { Link } from "@navikt/ds-react";

export type MedUtenAGVisning = "MED_ARBEIDSGIVER" | "UTEN_ARBEIDSGIVER"

export const AktivitetskravInfoComponent = () => {
  const [visning, setVisning] = useState<MedUtenAGVisning>("MED_ARBEIDSGIVER")

  return (
    <Page headerText="Informasjon om aktivitetsplikt" image={visning}>
      <MedUtenArbeidsgiverToggleGroup setVisning={setVisning} />

      <AktivitetskravInfo
        harArbeidsgiver={visning === "MED_ARBEIDSGIVER"}
      />

      <Link className="flex self-center" href={process.env.NEXT_PUBLIC_MIN_SIDE_URL}>
        Naviger til Min side
      </Link>
    </Page>
  )
}