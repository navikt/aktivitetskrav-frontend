import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchAktivitetskrav } from "@/serverActions/fetchAktivitetskrav";
import { AktivitetskravPage } from "@/app/aktivitetskrav/AktivitetskravPage";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["aktivitetskrav"],
    queryFn: fetchAktivitetskrav,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AktivitetskravPage />
    </HydrationBoundary>
  );
}
