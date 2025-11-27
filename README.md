# Aktivitetskrav frontend app

[![Build Status](https://github.com/navikt/aktivitetskrav-frontend/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/navikt/aktivitetskrav-frontend/actions/workflows/build-and-deploy.yaml)

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)

**Important:** To get started with building and running the app, read our [wiki for Next.js apps](https://github.com/navikt/esyfo-dev-tools/wiki/nextjs-build-run).

## Purpose of the app

This app is used to show the status of the activity requirement for logged-in users on `Min Side`.

```mermaid
graph TD
    MinSide[Min side] -->|"/syk/aktivitetskrav"| App[Aktivitetskrav frontend]
    DittSykefravaer[Ditt sykefravær] -->|"/syk/aktivitetskrav"| App
```

### Activity requirement view

The user gets an overview of their activity duty (aktivitetsplikt). This includes:

- Advance warnings about possible stoppage of sick pay (Varsel om mulig stans av sykepenger).
- Information about deadlines and how to avoid stoppage.
- Legal basis for the requirement.
- A timeline of previous events and assessments.

**Base path** `/syk/aktivitetskrav`

### Assessment details

This view provides detailed information about a specific assessment or event, such as:

- Information letters about the activity duty (Info om aktivitetsplikt).
- Explanations of how NAV assesses the duty.
- Implications for the user (potential stoppage of sick pay).
- Instructions on what the user needs to do.

**Path** `/syk/aktivitetskrav/[uuid]`

## Backend API

The frontend app communicates with the backend via `esyfo-proxy`.

Used endpoints:

- **GET** `/historikk` - Fetches history of activity requirement assessments
- **POST** `/les` - Marks advance warning as read
