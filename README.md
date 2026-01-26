# Aktivitetskrav frontend app

[![Build Status](https://github.com/navikt/aktivitetskrav-frontend/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/navikt/aktivitetskrav-frontend/actions/workflows/build-and-deploy.yaml)

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)

**Viktig:** For å komme i gang med å bygge og kjøre appen, les vår [wiki for Next.js apps](https://github.com/navikt/esyfo-dev-tools/wiki/nextjs-build-run).

## Formål med appen

Denne appen brukes til å vise status for aktivitetskravet for innloggede brukere på `Min side`.

```mermaid
graph TD
    MinSide[Min side] -->|"/syk/aktivitetskrav"| App[Aktivitetskrav frontend]
    DittSykefravaer[Ditt sykefravær] -->|"/syk/aktivitetskrav"| App
```

### Visning av aktivitetskrav

Brukeren får en oversikt over sin aktivitetsplikt. Dette inkluderer:

- Varsel om mulig stans av sykepenger.
- Informasjon om frister og hvordan unngå stans.
- Lovgrunnlag for kravet.
- En tidslinje over tidligere hendelser og vurderinger.

**Base path** `/syk/aktivitetskrav`

### Vurderingsdetaljer

Denne visningen gir detaljert informasjon om en spesifikk vurdering eller hendelse, som:

- Info om aktivitetsplikt.
- Forklaringer på hvordan Nav vurderer kravet.
- Konsekvenser for brukeren (mulig stans av sykepenger).
- Instruksjoner om hva brukeren må gjøre.

**Path** `/syk/aktivitetskrav/[uuid]`

## Backend API

Frontend-appen kommuniserer med backend via [eSYFO proxy](https://github.com/navikt/esyfo-proxy).

Endpoints som brukes:

- **GET** `/historikk` - Henter historikk over vurderinger av aktivitetskrav
- **POST** `/les` - Markerer varsel som lest
