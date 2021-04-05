import { BaseDto } from '@/core';

export default class EventDto extends BaseDto<EventDto> {
  start: string;
  end?: string;
  color: string;
  display: string;
}
