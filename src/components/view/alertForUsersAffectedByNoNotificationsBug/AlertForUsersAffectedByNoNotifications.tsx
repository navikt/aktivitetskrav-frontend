import { Alert, BodyLong, BodyShort } from "@navikt/ds-react";

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
    new Date(vurdering.sistVurdert) >= new Date("2025-02-27T12:59:00") &&
    new Date(vurdering.sistVurdert) < new Date("2025-03-10");
  // && new Date(vurdering.fristDato) <= new Date("2025-03-31");

  return (
    isAffectedForhandsvarsel && (
      <Alert variant="warning">
       {/* <BodyShort spacing>
          <strong>
            Hvis utsendt dato i brevet nedenfor er i perioden fra og med 27.
            februar til og med 9. mars, gjelder følgende for deg:
          </strong>
        </BodyShort>*/}
        <BodyShort spacing>
          <strong>
            Du har fått utsatt frist for å gi tilbakemelding til 9. april 2025
          . Du kan se bort fra fristen for å gi tilbakemelding som står i brevet
          nedenfor. Vi vil ikke gjøre en vurdering i saken din, før etter
          fristen for å gi tilbakemelding.
          </strong>
        </BodyShort>
        <BodyShort spacing>
          Nav har hatt tekniske problemer med varslinger på sms og e-post. Dette
          har medført at ikke alle brev fra oss har blitt varslet på riktig
          måte. På grunn av denne feilen får du utsatt frist for å gi
          tilbakemelding, dersom brevet nedenfor er datert mellom 27. februar og
          9. mars.
        </BodyShort>
        <BodyShort>
          Vi beklager feilen. Har du ytterligere spørsmål om dette, ta kontakt
          med oss på 55&nbsp;55&nbsp;33&nbsp;33 eller kontakt din veileder i
          Nav. Denne meldingen vil bli synlig for deg i 3 uker fra du logger deg
          inn og sjekker meldingen.
        </BodyShort>
      </Alert>
    )
  );
};
