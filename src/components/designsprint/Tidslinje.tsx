import {
  Accordion,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  Link,
} from "@navikt/ds-react";

export const Tidslinje = () => {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Tidslinje for sykefraværet
      </Heading>
      <BodyLong spacing textColor="subtle">
        {/* TODO */}
        Hendelser og oppgaver tilknyttet oppfølging av Per.
      </BodyLong>

      <Accordion>
        <Accordion.Item defaultOpen>
          <Accordion.Header>
            Uke 4: Nå kan du dele oppfølgingsplanen med fastlege
          </Accordion.Header>

          <Accordion.Content>
            <BodyShort spacing>
              En god dialog med den sykemeldte både før og etter sykdom, kan
              gjøre jobben lettere når dere skal planlegge tiltak og muligheter
              for tilpasning og tilstedeværelse på jobben. Senest ved 4 ukers
              sykefravær plikter du å dele informasjon med fastlegen. Dette kan
              ha betydning for sykefraværets omfang og lengde.
            </BodyShort>
            <BodyShort spacing>
              Det første dialogmøtet (dialogmøte 1) er en samtale mellom deg,
              arbeidstakeren din og eventuelt legen. I denne samtalen skal dere
              lage en oppfølgingsplan. I tillegg kan bedriftshelsetjenesten,
              tillitsvalgte eller verneombudet delta på møtet. Arbeidstaker har
              plikt til å delta. Du kan lese <Link>mer om dialogmøter her</Link>
              .
            </BodyShort>
            <BodyShort spacing>
              Dersom din ansatt ikke kan møte deg til en samtale, kan du som
              arbeidsgiver utarbeide planen alene. I planen kan du dele
              informasjon til Nav og til fastlege dersom du mener det har
              betydning for saken.
            </BodyShort>

            <HStack gap="4" spacing className="mb-4 mt-4">
              <Button>Opprett en oppfølgingsplan</Button>
              <Button variant="secondary">Ikke aktuelt nå</Button>
            </HStack>

            {/* <BodyShort spacing>
              For å få mer kunnskap om sykefraværsoppfølging har vi samlet mange
              nyttige ressurser her:{" "}
              <Link>Vil redusere sykefravær og beholde ansatte i jobb</Link>.
            </BodyShort> */}
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            Uke 8: NAV vurderer aktivitetskrav
          </Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            Uke 17: Ønsker dere et dialogmøte med NAV?
          </Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Uke 26: Dialogmøte med NAV</Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>
        {/* <Accordion.Item>
          <Accordion.Header>TODO</Accordion.Header>
          <Accordion.Content>
            Da er det lite som trengs å gjøres.
          </Accordion.Content>
        </Accordion.Item> */}
      </Accordion>
    </Box>
  );
};
