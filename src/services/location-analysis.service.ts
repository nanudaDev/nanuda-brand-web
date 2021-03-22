import { BaseService } from '@/core';

export class LocationAnalysisService extends BaseService {
  constructor() {
    super();
  }
  getLocationInfoDetail(hdongCode: string) {
    return super.get(`location-analysis/location-info-detail`, {
      hdongCode: hdongCode,
    });
  }
}

export default new LocationAnalysisService();
