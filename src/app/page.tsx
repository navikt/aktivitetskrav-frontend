import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchAktivitetskrav } from "@/api/fetchAktivitetskrav";
import { Aktivitetskrav } from "@/app/aktivitetskrav/Aktivitetskrav";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: fetchAktivitetskrav,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Aktivitetskrav />
    </HydrationBoundary>
  );
}
