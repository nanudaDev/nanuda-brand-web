import { BaseService } from '@/core';
import { ConsultRequestDto } from '@/dto';
import {
  PostReservationRequestDto,
  TimeSlotResponseDto,
} from '@/dto/reservation';
import ConsultResultResponseDto from '@/dto/reservation/consult-result-response.dto';
import EventDto from '@/dto/reservation/event.dto';
import GetReservationResponseDto from '@/dto/reservation/get-reservation-response.dto';
import LoginDto from '@/dto/reservation/login.dto';

export class ReservationService extends BaseService {
  constructor() {
    super();
  }
  login(loginDto: LoginDto) {
    return super.post<ConsultResultResponseDto>('reservation/login', loginDto);
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
    return super.get<TimeSlotResponseDto[]>(
      'reservation/check-available-times',
      {
        reservationDate: date,
      },
    );
  }
  cancelReservation() {
    //delete 작업중
    return super.delete<GetReservationResponseDto>('reservation');
  }
}

export default new ReservationService();
