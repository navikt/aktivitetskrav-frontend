import { Box } from "@navikt/ds-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AktivitetskravBox = ({ children }: Props) => {
  return (
    <div className="max-w-3xl w-full">
      <Box
        background="bg-default"
        padding="6"
        borderRadius="medium"
        shadow="small"
        className="mx-4 mt-4 flex flex-col gap-4"
      >
        {children}
      </Box>
    </div>
  );
};
