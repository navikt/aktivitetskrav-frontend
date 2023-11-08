"use server";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import fixtures from "@/mocks/fixtures";

export async function fetchAktivitetskrav() {
  if (process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local") {
    return fixtures.unntakVurdering;
  }

  const res = await fetch("/api/aktivitetskrav");
  const { data }: { data: AktivitetskravVurdering } = await res.json();
  return data;
}
