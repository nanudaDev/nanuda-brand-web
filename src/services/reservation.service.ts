import { BaseService } from '@/core';
import { PostReservationRequestDto } from '@/dto/reservation';
import EventDto from '@/dto/reservation/event.dto';
import GetReservationResponseDto from '@/dto/reservation/get-reservation-response.dto';

export class ReservationService extends BaseService {
  constructor() {
    super();
  }
  getReservInfo(code: string) {
    return super.get<GetReservationResponseDto[]>('reservation', {
      reservationCode: code,
    });
  }
  postReservation(postReservationRequestDto: PostReservationRequestDto) {
    return super.post<GetReservationResponseDto>(
      'reservation',
      postReservationRequestDto,
    );
  }
  getHoliday() {
    return super.get<EventDto>('reservation/holidays');
  }
  getTimeSlots(date: string) {
    return super.get<any>('reservation/check-available-times', {
      reservationDate: date,
    });
  }
}

export default new ReservationService();
