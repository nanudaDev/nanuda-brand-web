import { YN } from '@/common';
import { BaseDto } from '@/core';
import { PICKCOOK_POPUP } from '@/shared';
import { FileAttachmentDto } from '@/services/shared/file-uplaod';

export class PopupDto extends BaseDto<PopupDto> {
  id?: number;
  title?: string;
  description?: string;
  started?: Date;
  ended?: Date;
  images?: FileAttachmentDto[];
  link?: string;
  linkType?: string;
  popupType?: PICKCOOK_POPUP;
  inUse?: YN;
}
