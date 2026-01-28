import { Alert, BodyLong, BodyShort } from "@navikt/ds-react";

import type { Forhandsvarsel } from "@/schema/aktivitetskravVurderingSchema";
import { forhandsvarselVurderingUuidsAffectedByNotificationBug } from "./affectedForhandsvarselVurderingUuids";

interface Props {
  forhandsvarselVurdering: Forhandsvarsel;
}

/**
 * Informasjon til brukere som ble påvirket av en feil der vi ikke sendte ut varsler
 * en periode.
 *
 * Komponenten kan nok slettes en gang etter fristen har gått ut for å gi tilbakemelding for de som får meldingen.
 */
export const AlertForUsersAffectedByNoNotificationsBug = ({
  forhandsvarselVurdering: vurdering,
}: Props) => {
  const isAffectedForhandsvarsel =
    forhandsvarselVurderingUuidsAffectedByNotificationBug.includes(
      vurdering.internUuid,
    );

  return (
    isAffectedForhandsvarsel && (
      <Alert variant="warning">
        <BodyShort spacing>
          <strong>
            Du har fått utsatt frist for å gi tilbakemelding til 9. april 2025.
            Du kan se bort fra fristen for å gi tilbakemelding som står i brevet
            nedenfor. Vi vil ikke gjøre en vurdering i saken din, før etter
            fristen for å gi tilbakemelding.
          </strong>
        </BodyShort>
        <BodyShort spacing>
          Nav har hatt tekniske problemer med varslinger på sms og e-post. Dette
          har medført at ikke alle brev fra oss har blitt varslet på riktig
          måte. På grunn av denne feilen får du utsatt frist for å gi
          tilbakemelding.
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
