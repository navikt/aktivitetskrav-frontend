import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { post } from "@/data/api";

const queryKeyHasFerdigstiltForhandsVarsel = ["hasFerdigstiltForhandsVarsel"];

export const useFerdigstillForhandsVarsel = () => {
  const queryClient = useQueryClient();

  const { data: hasFerdigstiltForhandsvarsel } = useQuery({
    queryKey: queryKeyHasFerdigstiltForhandsVarsel,
    queryFn: () => false,
    initialData: false,
  });

  useEffect(() => {
    const ferdigstillForhandsvarselIfNotAlreadyDone = async () => {
      if (!hasFerdigstiltForhandsvarsel) {
        await post("/syk/aktivitetskrav/api/aktivitetsplikt/les");
        queryClient.setQueryData(queryKeyHasFerdigstiltForhandsVarsel, true);
      }
    };

    ferdigstillForhandsvarselIfNotAlreadyDone();
  }, [hasFerdigstiltForhandsvarsel, queryClient]);
};
