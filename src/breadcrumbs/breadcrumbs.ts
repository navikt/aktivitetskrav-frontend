interface Breadcrumb {
  url: string;
  title: string;
}

export const AktivitetspliktCrumbs: Breadcrumb[] = [
  {
    url: process.env.NEXT_PUBLIC_MIN_SIDE_URL!,
    title: "Min side",
  },
  {
    url: process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL!,
    title: "Ditt sykefravær",
  },
  {
    url: "/aktivitetsplikt",
    title: "Informasjon om aktivitetsplikt",
  },
];

