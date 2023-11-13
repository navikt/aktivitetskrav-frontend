import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";

export async function fetchAktivitetskrav(): Promise<AktivitetskravVurdering> {
  const res = await fetch(process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
