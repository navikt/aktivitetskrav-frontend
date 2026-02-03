import { Box } from "@navikt/ds-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AktivitetskravBox = ({ children }: Props) => {
  return (
    <div className="max-w-3xl w-full">
      <Box
        background="default"
        padding="space-24"
        className="mx-4 mt-4 flex flex-col gap-4 rounded-lg"
      >
        {children}
      </Box>
    </div>
  );
};
