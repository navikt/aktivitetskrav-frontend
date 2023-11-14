import React from "react";
import { Aktivitetskrav } from "@/components/Aktivitetskrav";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { get } from "@/data/api";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { AktivitetskravSkeletonComponent } from "@/components/skeleton/AktivitetskravSkeletonComponent";

const Home: NextPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: () =>
      get<AktivitetskravVurdering>(
        process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!,
      ),
  });

  if (error) {
    throw error;
  }

  return isPending ? (
    <AktivitetskravSkeletonComponent />
  ) : (
    <Aktivitetskrav aktivitetskrav={data} />
  );
};

export default Home;
