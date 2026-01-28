import { Heading } from "@navikt/ds-react";
import React, { ReactNode } from "react";

interface Props {
  headerText: ReactNode;
}

export const PageHeading = ({ headerText }: Props) => {
  return (
    <div className="flex flex-row bg-white pt-4 items-center justify-center">
      <Heading size="xlarge" level="1">
        {headerText}
      </Heading>
    </div>
  );
};
