export interface IServerEnvironmentVariables {
  DECORATOR_ENV: "prod" | "dev";
  AKTIVITETSKRAV_BACKEND_CLIENT_ID: string;
}

const serverEnv = process.env as unknown as IServerEnvironmentVariables;

export default serverEnv;
