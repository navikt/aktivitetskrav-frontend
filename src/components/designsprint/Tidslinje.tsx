import { Accordion, BodyLong, Box, Heading, Link } from "@navikt/ds-react";

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
          <Accordion.Header>Uke 4: Du må følge opp Per</Accordion.Header>

          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>TODO</Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>TODO</Accordion.Header>
          <Accordion.Content>
            Da er det lite som trengs å gjøres.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};
