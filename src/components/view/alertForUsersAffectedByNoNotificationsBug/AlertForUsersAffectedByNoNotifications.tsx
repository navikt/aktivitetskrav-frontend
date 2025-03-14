import { Alert, BodyLong } from "@navikt/ds-react";

import { Forhandsvarsel } from "@/schema/aktivitetskravVurderingSchema";

interface Props {
  forhandsvarselVurdering: Forhandsvarsel;
}

/**
 * Informasjon til brukere som ble påvirket av en feil der vi ikke sendte ut varsler
 * en periode.
 */
export const AlertForUsersAffectedByNoNotificationsBug = ({
  forhandsvarselVurdering: vurdering,
}: Props) => {
  // TODO: Sjekke at createdAt kan brukes til dette og at dette er ok periode,
  //  og at dette ikke gir informasjonen til flere enn de som faktisk får utsatt frist.
  const isAffectedForhandsvarsel =
    new Date(vurdering.createdAt) >= new Date("2025-02-27T13:00:00") &&
    new Date(vurdering.createdAt) < new Date("2025-03-08");
  // && new Date(vurdering.fristDato) <= new Date("2025-03-31");

  return (
    (isAffectedForhandsvarsel || true) && (
      <Alert variant="warning">
        <BodyLong className={"mb-2"}>
          I perioden 27.februar til 7.mars har vi hatt tekniske problemer med
          varslinger på sms og e-post. Vi har derfor utsatt svarfristen til 1.
          april. Du kan se vekk fra den opprinnelige svarfristen det vises til
          nedenfor. Vi beklager feilen!
        </BodyLong>
        <BodyLong>
          Har du ytterligere spørsmål om dette, ta kontakt med oss på 55 55 33
          33 eller kontakt din veileder i Nav.
        </BodyLong>
      </Alert>
    )
  );
};
