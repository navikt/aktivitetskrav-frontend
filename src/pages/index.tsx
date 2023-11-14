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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-8">
      {isPending ? (
        <AktivitetskravSkeletonComponent />
      ) : (
        <Aktivitetskrav aktivitetskrav={data} />
      )}
    </main>
  );
};

export default Home;
