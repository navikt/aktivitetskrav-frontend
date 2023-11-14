import React from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { Chat2Icon, DocPencilIcon, PersonIcon } from "@navikt/aksel-icons";
import {
  hvaBetyrDetText,
  hvaMaDuGjoreText,
  hvordanVurdererText,
} from "./InfoTexts";
import { IconRow } from "@/components/icons/IconRow";
import { Skeletor } from "@/components/skeleton/Skeletor";

interface Props {
  harArbeidsgiver: boolean;
  displaySkeleton?: boolean;
}

export const AktivitetskravInfo = ({
  harArbeidsgiver,
  displaySkeleton = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <Skeletor displaySkeleton={displaySkeleton}>
          <BodyLong spacing>Hei!</BodyLong>
        </Skeletor>

        <Skeletor displaySkeleton={displaySkeleton}>
          <BodyLong>
            Det er på tide å informere deg om aktivitetsplikten. Alle sykmeldte
            skal i utgangspunktet jobbe litt hvis de kan, også hvis de er 100 %
            sykmeldt. Dette kalles aktivitetsplikt i folketrygdloven.
          </BodyLong>
        </Skeletor>
      </div>

      <IconRow icon={<DocPencilIcon />} displaySkeleton={displaySkeleton}>
        <div>
          <Skeletor displaySkeleton={displaySkeleton}>
            <Heading size="medium" level="3" spacing>
              Hvordan vurderer NAV aktivitetsplikten?
            </Heading>
          </Skeletor>

          <Skeletor displaySkeleton={displaySkeleton}>
            <BodyLong>{hvordanVurdererText(harArbeidsgiver)}</BodyLong>
          </Skeletor>
        </div>
      </IconRow>

      <IconRow icon={<PersonIcon />} displaySkeleton={displaySkeleton}>
        <div>
          <Skeletor displaySkeleton={displaySkeleton}>
            <Heading size="medium" level="3" spacing>
              Hva betyr det for deg?
            </Heading>
          </Skeletor>

          <Skeletor displaySkeleton={displaySkeleton}>
            <BodyLong>{hvaBetyrDetText(harArbeidsgiver)}</BodyLong>
          </Skeletor>
        </div>
      </IconRow>

      <IconRow icon={<Chat2Icon />} displaySkeleton={displaySkeleton}>
        <div>
          <Skeletor displaySkeleton={displaySkeleton}>
            <Heading size="medium" level="3" spacing>
              Hva må du gjøre?
            </Heading>
          </Skeletor>

          <Skeletor displaySkeleton={displaySkeleton}>
            <BodyLong>{hvaMaDuGjoreText(harArbeidsgiver)}</BodyLong>
          </Skeletor>
        </div>
      </IconRow>
    </div>
  );
};
