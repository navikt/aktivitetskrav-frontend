interface Breadcrumb {
  url: string;
  title: string;
}

export const AktivitetspliktBaseCrumbs: Breadcrumb[] = [
  {
    url: process.env.NEXT_PUBLIC_MIN_SIDE_URL!,
    title: "Min side",
  },
  {
    url: process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL!,
    title: "Ditt sykefravær",
  },
  {
    url: "/syk/aktivitetskrav",
    title: "Din aktivitetsplikt",
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
  switch (pathname) {
    case "/":
      return AktivitetspliktBaseCrumbs;
    case "/[uuid]":
      return AktivitetspliktHistorikkCrumbs;
    default:
      return [];
  }
}
