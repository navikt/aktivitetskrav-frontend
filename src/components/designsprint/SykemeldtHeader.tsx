import { BodyLong, Heading, HStack, VStack } from "@navikt/ds-react";
import { PersonIcon } from "@navikt/aksel-icons";
import { PersonCircleIcon } from "@navikt/aksel-icons";

export const SykemeldtHeader = () => (
  <>
    <HStack gap="4">
      <PersonCircleIcon title="a11y-title" fontSize="4rem" />
      {/* <PersonIcon title="a11y-title" fontSize="1.5rem" /> */}
      <VStack gap="2">
        <Heading size="large">Per Persen</Heading>
        <BodyLong>100% sykmeldt 23. januar 2025 - 23. februar 2025</BodyLong>
      </VStack>
    </HStack>
    <hr />
  </>
);
