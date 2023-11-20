import React from "react";
import { Aktivitetskrav } from "@/components/Aktivitetskrav";
import { NextPage } from "next";
import { AktivitetskravSkeletonComponent } from "@/components/skeleton/AktivitetskravSkeletonComponent";
import { useAktivitetskravData } from "@/data/dataHooks";

const Home: NextPage = () => {
  const { isPending, error, data } = useAktivitetskravData();

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
