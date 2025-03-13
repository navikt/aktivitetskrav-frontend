import React from "react";
import { Alert, BodyLong, Heading, Link, Tag } from "@navikt/ds-react";

import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { getShortDateFormat } from "@/utils/dateUtils";
import { ComponentHeader } from "@/components/header/ComponentHeader";
import { useFerdigstillForhandsVarsel } from "@/data/ferdigstillVarsel";

interface Props {
  vurdering: AktivitetskravVurdering;
}

export const ForhandsvarselComponent = ({ vurdering }: Props) => {
  useFerdigstillForhandsVarsel();

  if (vurdering.status !== "FORHANDSVARSEL") return null;

  const showInformationForUsersThatDidNotGetVarselBetweenFeb27AndMarSomething =
    true;
  // (new Date(vurdering.createdAt) >= new Date("2025-02-27") &&
  //   new Date(vurdering.createdAt) <= new Date("2025-03-?") &&
  //   new Date(vurdering.fristDato) <= new Date("2021-03-30")); // ?

  const informationForUsersThatDidNotGetVarselBetweenFeb27AndMarSomething = (
    <BodyLong>
      På grunn av en teknisk feil har du ikke fått varsel på SMS og på Din side
      om denne vurderingen til riktig tidspunkt. Du har derfor senere frist enn
      det som står... (TODO) Vi beklager feilen.
    </BodyLong>
  );

  return (
    <div>
      {showInformationForUsersThatDidNotGetVarselBetweenFeb27AndMarSomething && (
        <Alert variant="info">
          {informationForUsersThatDidNotGetVarselBetweenFeb27AndMarSomething}
        </Alert>
      )}

      <div className="flex flex-col gap-4 mb-4">
        {vurdering.document?.map((d, index) => {
          switch (d.type) {
            case "HEADER_H1":
              return (
                <div className="mt-4" key={index}>
                  {d.texts.map((text, index) => (
                    <ComponentHeader
                      key={index}
                      headerText={text}
                      utsendtDato={vurdering.sistVurdert}
                      alertStyle="warning"
                    />
                  ))}
                </div>
              );
            case "HEADER_H2":
              return (
                <div className="mt-4" key={index}>
                  {d.texts.map((text, index) => (
                    <Heading size="large" level="2" key={index}>
                      {text}
                    </Heading>
                  ))}
                </div>
              );
            case "HEADER_H3":
              return (
                <div className="mt-4" key={index}>
                  {d.texts.map((text, index) => (
                    <Heading size="medium" level="3" key={index}>
                      {text}
                    </Heading>
                  ))}
                </div>
              );
            case "LINK":
              return (
                <div key={index}>
                  {d.title && (
                    <Heading size="xsmall" level="3" spacing>
                      {d.title}
                    </Heading>
                  )}
                  {d.texts.map((text, index) => (
                    <Link className="break-words" key={index} href={text}>
                      {text}
                    </Link>
                  ))}
                </div>
              );
            case "BULLET_POINTS":
              return (
                <ul className="list-disc list-inside" key={index}>
                  {d.texts.map((text, index) => (
                    <BodyLong size="small" key={index} as={"li"}>
                      {text}
                    </BodyLong>
                  ))}
                </ul>
              );
            case "PARAGRAPH":
              return (
                <div key={index}>
                  {d.texts.map((text, index) => (
                    <BodyLong size="small" key={index}>
                      {text}
                    </BodyLong>
                  ))}
                </div>
              );
          }
        })}
      </div>

      <Tag variant="warning-moderate" className="w-fit mt-4">
        Svarfrist: {getShortDateFormat(vurdering.fristDato)}
      </Tag>
    </div>
  );
};
