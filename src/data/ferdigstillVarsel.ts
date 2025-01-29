import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { post } from "@/data/api";

const queryKeyHasFerdigstiltForhandsVarsel = ["hasFerdigstiltForhandsVarsel"];

export const useFerdigstillForhandsVarsel = () => {
  const queryClient = useQueryClient();

  const { data: hasFerdigstiltForhandsvarsel } = useQuery({
    queryKey: queryKeyHasFerdigstiltForhandsVarsel,
    initialData: false,
  });

  useEffect(() => {
    const ferdigstillForhandsvarselIfNotAlreadyDone = async () => {
      if (!hasFerdigstiltForhandsvarsel) {
        await post(`${process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!}/les`);
        queryClient.setQueryData(queryKeyHasFerdigstiltForhandsVarsel, true);
      }
    };

    ferdigstillForhandsvarselIfNotAlreadyDone();
  }, [hasFerdigstiltForhandsvarsel, queryClient]);
};
