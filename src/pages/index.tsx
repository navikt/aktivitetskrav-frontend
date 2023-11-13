import React from "react";
import { Aktivitetskrav } from "@/components/Aktivitetskrav";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { get } from "@/data/api";

const Home: NextPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: () => get(process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!),
    throwOnError: true,
  });

  if (isPending) {
    return "...loading todo (skeleton?)";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-8">
      <Aktivitetskrav aktivitetskrav={data!} />
    </main>
  );
};

export default Home;
