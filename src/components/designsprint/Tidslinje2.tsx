import {
  Accordion,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  Link,
} from "@navikt/ds-react";
import { CheckmarkCircleIcon } from "@navikt/aksel-icons";

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
        <Accordion.Item>
          <Accordion.Header>
            <div className="flex gap-2">
              <CheckmarkCircleIcon title="a11y-title" fontSize="1.5rem" />
              Uke 4: Nå kan du dele oppfølgingsplanen med fastlege
            </div>
          </Accordion.Header>

          <Accordion.Content>Ingen</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Uke 8: Oppfølgingssamtale med Per</Accordion.Header>
          <Accordion.Content>
            <BodyShort spacing>
              <em></em>
            </BodyShort>
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
