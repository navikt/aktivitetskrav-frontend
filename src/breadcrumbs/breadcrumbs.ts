interface Breadcrumb {
  url: string;
  title: string;
}

export const AktivitetspliktBaseCrumbs: Breadcrumb[] = [
  {
    url: process.env.NEXT_PUBLIC_MIN_SIDE_URL!,
    title: "Min side arbeidsgiver",
  },
  {
    url: process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL!,
    title: "Dine sykmeldte",
  },
  {
    url: "/syk/aktivitetskrav",
    title: "Per Persen",
  },
];

export const AktivitetspliktHistorikkCrumbs: Breadcrumb[] = [
  ...AktivitetspliktBaseCrumbs,
  {
    url: "/syk/aktivitetskrav",
    title: "Historikk",
  },
];

export function createBreadcrumbs(pathname: string) {
  return AktivitetspliktBaseCrumbs
}
