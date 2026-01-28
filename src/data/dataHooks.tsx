import { useQuery } from "@tanstack/react-query";
import { get } from "@/data/api";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export const useAktivitetskravData = () => {
  return useQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: () =>
      get<AktivitetskravVurdering[]>(
        `${process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL}/historikk`,
      ),
  });
};
