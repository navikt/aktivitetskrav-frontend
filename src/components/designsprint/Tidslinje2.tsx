import { Accordion, BodyLong, BodyShort, Box, Heading } from "@navikt/ds-react";
import sirkelIkon from "../../../public/Circle.svg";
import checkmark from "../../../public/Checkmark.svg";
import Image from "next/image";

export const Tidslinje = () => {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Tidslinje for sykefraværet
      </Heading>
      <BodyLong spacing textColor="subtle">
        {/* TODO */}
        Hendelser og oppgaver knyttet til oppfølgingen av Per.
      </BodyLong>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            <div className="flex gap-2">
              <Image
                src={checkmark}
                alt="Kommunikasjon om aktivitetskravet"
                height="24"
              />
              Uke 4: Nå kan du dele oppfølgingsplanen med fastlege
            </div>
          </Accordion.Header>

          <Accordion.Content>Ingen</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item defaultOpen>
          <Accordion.Header>
            <div className="flex gap-2">
              <Image src={sirkelIkon} alt="Kommunikasjon om aktivitetskravet" />
              <span>Uke 7: Oppfølgingssamtale med Per</span>
            </div>
          </Accordion.Header>
          <Accordion.Content>
            <BodyShort spacing>
              <em>Møtetidspunkt 21. februar kl 10.00</em>.
            </BodyShort>
            <BodyLong spacing>
              <strong>Agenda:</strong> Vi snakker om hvordan det går, og hvordan
              vi kan finne løsniger sammen.
            </BodyLong>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            <div className="flex gap-2">
              <Image src={sirkelIkon} alt="Kommunikasjon om aktivitetskravet" />
              <span>Uke 8: NAV vurderer aktivitetskrav</span>
            </div>
          </Accordion.Header>
          <Accordion.Content>Tekst</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            <div className="flex gap-2">
              <Image src={sirkelIkon} alt="Kommunikasjon om aktivitetskravet" />
              <span>Uke 17: Ønsker dere et dialogmøte med NAV?</span>
            </div>
          </Accordion.Header>
          <Accordion.Content>Tekst</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            {" "}
            <div className="flex gap-2">
              <Image src={sirkelIkon} alt="Kommunikasjon om aktivitetskravet" />
              <span>Uke 26: Dialogmøte med NAV</span>
            </div>
          </Accordion.Header>
          <Accordion.Content>Tekst</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};
