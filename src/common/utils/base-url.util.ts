import {
  DevelopmentEnvironment,
  EnvironmentType,
  ProductionEnvironment,
  StagingEnvironment,
} from '../../../environments';

export function getBaseUrl() {
  let baseUrl;
  if (process.env.NODE_ENV === EnvironmentType.development) {
    baseUrl = DevelopmentEnvironment.baseURL;
  }
  if (process.env.NODE_ENV === EnvironmentType.staging) {
    baseUrl = StagingEnvironment.baseURL;
  }
  if (process.env.NODE_ENV === EnvironmentType.production) {
    baseUrl = ProductionEnvironment.baseURL;
  }
  return baseUrl;
}

export function isEnvProd() {
  if (process.env.NODE_ENV === EnvironmentType.production) {
    return true;
  } else {
    return false;
  }
}
