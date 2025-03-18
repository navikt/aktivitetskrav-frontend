"use client";
import React from "react";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { BodyLong, Tag } from "@navikt/ds-react";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { getShortDateFormat } from "@/utils/dateUtils";
import { MottattVurderingDetaljer } from "@/components/view/mottattVurdering/MottattVurderingDetaljer";

interface Props {
  vurdering: AktivitetskravVurdering;
}

export const MottattVurderingComponent = ({ vurdering }: Props) => {
  return (
    <>
      <ComponentHeader
        headerText={"NAV har vurdert aktivitetsplikten din"}
        utsendtDato={vurdering.sistVurdert}
        alertStyle="success"
      />

      <div className="flex flex-col gap-4">
        <BodyLong>Hei!</BodyLong>

        <MottattVurderingDetaljer vurdering={vurdering} />

        <BodyLong>
          Aktivitetsplikten gjelder gjennom hele sykefraværet og det kan være at
          NAV vurderer aktivitetsplikten din igjen på et senere tidspunkt. Du
          vil da motta ny informasjon om det.
        </BodyLong>

        <BodyLong>
          Denne vurderingen er tilgjengelig for deg på Min side i 30 dager fra
          vurderingen til NAV ble gjort.
        </BodyLong>

        {vurdering.sistVurdert && (
          <Tag variant="success-moderate" className="w-fit mt-4">
            Dato for vurdering: {getShortDateFormat(vurdering.sistVurdert)}
          </Tag>
        )}
      </div>
    </>
  );
};
