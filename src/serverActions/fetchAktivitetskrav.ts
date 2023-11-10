"use server";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import fixtures from "@/mocks/fixtures";

export async function fetchAktivitetskrav() {
  if (
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
  ) {
    return fixtures.unntakVurdering;
  }

  const res = await fetch(process.env.ESYFO_PROXY_API_URL!);
  const { data }: { data: AktivitetskravVurdering } = await res.json();
  return data;
}
