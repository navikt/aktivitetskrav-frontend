import React from "react";
import { fetchAktivitetskrav } from "@/serverActions/fetchAktivitetskrav";
import { Aktivitetskrav } from "@/components/Aktivitetskrav";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: fetchAktivitetskrav,
    throwOnError: true,
  });

  if (isPending) {
    return "...loading todo (skeleton?)";
  }

  if (error) {
    return "egg error";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-8">
      <Aktivitetskrav aktivitetskrav={data} />
    </main>
  );
};

export default Home;
