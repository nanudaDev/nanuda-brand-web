import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const StagingEnvironment: Environment = {
  baseURL: 'https://pickcook-api-test.nanudakitchen.com/',
  // baseURL: 'https://pickcook-api.nanudakitchen.com/',
  NODE_ENV: EnvironmentType.staging,
  production: false,
  clientName: packageInfo.name,
  productionTip: false,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/staging-storage-nanuda',
};
