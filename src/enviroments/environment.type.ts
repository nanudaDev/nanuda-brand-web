export class Environment {
  baseURL?: string;
  NODE_ENV?: EnvironmentType;
}

export enum EnvironmentType {
  development = 'development',
  production = 'production',
  staging = 'staging',
}
