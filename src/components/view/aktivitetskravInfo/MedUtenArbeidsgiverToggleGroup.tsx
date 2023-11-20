import { ToggleGroup } from "@navikt/ds-react";
import React from "react";
import { Buldings3Icon, PersonIcon } from "@navikt/aksel-icons";
import { MedUtenAGVisning } from "@/components/view/UnderBehandlingComponent";

interface Props {
  setVisning(val: MedUtenAGVisning): void;
}

export const MedUtenArbeidsgiverToggleGroup = ({ setVisning }: Props) => {
  return (
    <div className="flex w-full justify-center mb-4">
      <ToggleGroup
        defaultValue="MED_ARBEIDSGIVER"
        onChange={(visning) => setVisning(visning as MedUtenAGVisning)}
      >
        <ToggleGroup.Item value="MED_ARBEIDSGIVER">
          <Buldings3Icon aria-hidden />
          Jeg har arbeidsgiver
        </ToggleGroup.Item>
        <ToggleGroup.Item value="UTEN_ARBEIDSGIVER">
          <PersonIcon aria-hidden />
          Jeg har ikke arbeidsgiver
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};
