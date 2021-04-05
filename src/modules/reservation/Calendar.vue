<template>
  <article class="main-article">
    <section class="article-section">
      <div class="demo-app">
        <div class="demo-app-main">
          <div class="container">
            <FullCalendar class="demo-app-calendar" :options="calendarOptions">
              <!-- <template v-slot:eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
              </template> -->
            </FullCalendar>
          </div>
        </div>
      </div>
    </section>
    <b-modal id="select-time" @ok="onTimeModalOk">
      <template #modal-title>
        <strong class="txt-primary">예약 하기</strong>
      </template>
      <div v-for="item in terms" :key="item.id" style="backgroundColor: #fff">
        <b-btn
          block
          size="sm"
          class="mt-2"
          :disabled="!item.available"
          variant="primary"
          @click="onClickTime(item.value)"
          >{{ item.value }}</b-btn
        >
      </div>
    </b-modal>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FullCalendar, {
  CalendarOptions,
  EventApi,
  DateSpanApi,
  DatePointApi,
} from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '@/common';
import { PostReservationRequestDto } from '@/dto/reservation/post-reservation-request.dto';
import reservationService from '@/services/reservation.service';
import EventDto from '@/dto/reservation/event.dto';
import GetReservTimesResponseDto from '@/dto/reservation/get-reserv-times-response.dto';
// import krLocale from '@fullcalendar/core/locales/ko';

@Component({
  name: 'Calendar',
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
})
export default class Calendar extends Vue {
  private postReserationRequestDto = new PostReservationRequestDto();
  private eventDto: EventDto[] = [];
  private terms: GetReservTimesResponseDto[] = [];
  private selectedTime = '';
  private calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin, // needed for dateClick
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today',
    },
    buttonText: {
      today: '오늘',
      day: '일',
      week: '주',
      month: '월',
    },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: false,
    showNonCurrentDates: false,
    dateClick: this.handleDateSelect,
    // eventClick: this.handleEventClick,
    eventsSet: this.handleEvents,
    selectAllow: this.selectAllow,
    locale: 'ko',
    slotMinTime: '10:00:00',
    slotMaxTime: '19:00:00',
    allDaySlot: false,
    slotDuration: '01:00:00',

    //오늘 이전 배경색 분홍색으로
    eventSources: [{ url: 'http://localhost:4700/reservation/holidays' }],
    events: [
      {
        start: '1970-01-01',
        end: new Date().toISOString().slice(0, 10),
        // color: '#ff9f89',
        color: '#d0d0d0',
        display: 'background',
      },
    ],
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  private currentEvents: EventApi[] = [];
  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
  }
  handleDateSelect(selectInfo: DatePointApi) {
    this.postReserationRequestDto.reservationDate = selectInfo.date;
    reservationService.getTimeSlots(selectInfo.dateStr).subscribe(res => {
      this.terms = res.data;
    });
    this.$bvModal.show('select-time');
  }
  onClickTime(time: string) {
    this.selectedTime = time;
  }
  onTimeModalOk() {
    this.postReserationRequestDto.reservationTime = this.selectedTime;
    reservationService
      .postReservation(this.postReserationRequestDto)
      .subscribe(res => {
        if (res) {
          this.$router.push('/reservation/success');
        }
      });
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  selectAllow(info: DateSpanApi) {
    //오늘 이전 날짜들 클릭안됨
    if (this.$moment(info.startStr).isBefore(new Date())) {
      return false;
    }
    //주말 클릭안됨
    const isWeekend = info.start.getDay() === 6 || info.start.getDay() === 0;
    if (isWeekend) {
      return false;
    }
    //공휴일 클릭안됨
    const include = this.eventDto.some(e => e.start == info.startStr);
    if (include) {
      return false;
    }
    return true;
  }
  created() {
    const code = sessionStorage.getItem('reservationCode');
    if (!code) {
      this.$router.push('/reservation');
    } else {
      this.postReserationRequestDto.reservationCode = code;
    }
    reservationService.getHoliday().subscribe(res => {
      this.eventDto = this.eventDto.concat(res.data);
    });
  }
}
</script>

<style lang="scss">
.selected {
  border: 1px black solid;
}
.main-article {
  background: #004d8a;
  min-height: 100vh;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-size: 1.2rem;

  .demo-app-calendar {
    background: #fff;
    padding: 2em;
    border-radius: 0.25em;
  }

  .demo-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
  }
  .demo-app-sidebar-section {
    padding: 2em;
  }
  .demo-app-main {
    flex-grow: 1;
    padding: 3em 1em;
    .fc-button-primary {
      background-color: #004d8a !important;
      border-color: #fff !important;
    }
    .fc-day-sun,
    .fc-day-sat {
      background-color: #d0d0d0;
    }
  }
}
</style>
