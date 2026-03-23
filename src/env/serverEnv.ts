import { z } from "zod";

export const serverEnvSchema = z.object({
  AKTIVITETSKRAV_BACKEND_CLIENT_ID: z.string(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;

const formatServerEnvError = (error: z.ZodError): string => {
  const invalidVariables = error.issues.map((issue) => {
    const variableName = issue.path.join(".") || "unknown";

    if (issue.code === "invalid_type" && issue.input === undefined) {
      return `${variableName} (missing)`;
    }

    return `${variableName} (${issue.message})`;
  });

  return `Invalid server env vars: ${invalidVariables.join(", ")}`;
};

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const parsedEnv = serverEnvSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    throw new Error(formatServerEnvError(parsedEnv.error));
  }

  cachedServerEnv = parsedEnv.data;

  return cachedServerEnv;
}

export function _resetServerEnvCache(): void {
  cachedServerEnv = null;
}
