import { BaseService } from '@/core';
import { ConsultRequestDto } from '@/dto';
import {
  PostReservationRequestDto,
  TimeSlotResponseDto,
} from '@/dto/reservation';
import ConsultResultResponseDto from '@/dto/reservation/consult-result-response.dto';
import DeleteReservationRequestDto from '@/dto/reservation/delete-reservation-request.dto';
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
  cancelReservation(deleteReservationRequestDto: DeleteReservationRequestDto) {
    const params: any = {
      params: { id: 12 },
      // query: {
      //   revervationCode: deleteReservationRequestDto.reservationCode,
      //   phone: deleteReservationRequestDto.phone,
      // },
      // data: { deleteReason: deleteReservationRequestDto.deleteReason },
    };
    return super.delete<GetReservationResponseDto>('reservation', {
      params: { id: 12 },
    });
  }
}

export default new ReservationService();
