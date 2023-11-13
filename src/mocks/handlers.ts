import fixtures from "./fixtures";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/aktivitetsplikt", ({ request, params, cookies }) => {
    return HttpResponse.json(fixtures.unntakVurdering)
  }),
];
