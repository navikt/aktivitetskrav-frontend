"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAktivitetskrav } from "@/api/fetchAktivitetskrav";

export const Aktivitetskrav = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: fetchAktivitetskrav,
  });

  if (isPending) {
    return "..loading";
  }

  if (error) {
    return "error! " + error.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{data?.status}</div>
    </main>
  );
};
