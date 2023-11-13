export interface IServerEnvironmentVariables {
  DECORATOR_ENV: "prod" | "dev";
}

const serverEnv = process.env as unknown as IServerEnvironmentVariables;

export default serverEnv;
