# aktivitetskrav-frontend

```sh
pnpm dev
pnpm test --run
pnpm lint
pnpm build
```

Open `/syk/aktivitetskrav` on the local server; the app does not live at `/`.

- API proxy routes use `bodyParser: false` and `externalResolver: true` so the
  original request reaches `proxyAktivitetskravBackendRequest` in
  `src/utils/aktivitetskravApiProxyUtils.ts`.
- Frontend `/api/aktivitetsplikt/*` maps to backend `/api/v1/aktivitetsplikt/*`.
  History is GET; marking a notice as read is POST.
- The `testscenario` header selects fixtures only when
  `NEXT_PUBLIC_RUNTIME_ENVIRONMENT` is `local` or `demo`. Preserve that gate;
  dev/prod requests use the authenticated backend proxy.
