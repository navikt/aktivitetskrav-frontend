export const resolveApmEnvironment = (
  runtimeCluster: string | undefined,
  builtCluster: string | undefined,
): string | undefined => runtimeCluster ?? builtCluster;
