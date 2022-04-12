import { BaseDto } from '@/core';

export enum PICKCOOK_UPLOAD_TYPE {
  LOCATION_ANALYSIS = 'location-analysis',
  RESOURCE = 'resource',
  POPUP = 'popup',
}

export enum ATTACHMENT_REASON_TYPE {
  SUCCESS = 'SUCCESS',
  CONTENT_TYPE = 'CONTENT_TYPE',
  SIZE = 'SIZE',
  ETC = 'ETC',
}

export class FileAttachmentDto extends BaseDto<FileAttachmentDto> {
  constructor(partial?: any) {
    super(partial);
  }

  attachmentReasonType?: ATTACHMENT_REASON_TYPE;
  originFilename: string;
  source?: string;
  key?: string;
  endpoint?: string;
  uploadType?: PICKCOOK_UPLOAD_TYPE;
  mimetype?: string;
}
