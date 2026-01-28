"use client";
import { BodyLong } from "@navikt/ds-react";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

interface Props {
  vurdering: AktivitetskravVurdering;
}

export const IkkeOppfyltComponent = ({ vurdering }: Props) => {
  return (
    <>
      <ComponentHeader
        headerText={"Svarfristen har gått ut"}
        utsendtDato={vurdering.sistVurdert}
        alertStyle="warning"
      />

      <div className="flex flex-col gap-4">
        <BodyLong>Hei!</BodyLong>

        <BodyLong>
          Svarfristen til forhåndsvarslet har gått ut. NAV vurderer fremdeles
          aktivitetsplikten din. Du vil motta ny informasjon så snart NAV har
          fullført vurderingen.
        </BodyLong>
      </div>
    </>
  );
};
