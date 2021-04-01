<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <!-- <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template> -->
      </FullCalendar>
    </div>
    <b-modal id="select-time" hide-footer>
      <template #modal-title>
        <strong class="txt-primary">예약하기</strong>
      </template>
      <div v-for="item in terms" :key="item.id">
        <b-btn block class="mt-2" @click="onClickTime(item.value)">{{
          item.name
        }}</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FullCalendar, {
  CalendarOptions,
  EventApi,
  DateSelectArg,
  EventClickArg,
  DateRangeInput,
  DateSpanApi,
} from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '@/common';
import { PostReservationRequestDto } from '@/dto/reservation/post-reservation-request.dto';
import reservationService from '@/services/reservation.service';
import EventDto from '@/dto/reservation/event.dto';
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
  private terms = [
    { id: 10, name: '오전 10시', value: '10:00AM' },
    {
      id: 11,
      name: '오전 11시',
      value: '11:00AM',
    },
    {
      id: 12,
      name: '오전 12시',
      value: '12:00AM',
    },
    {
      id: 13,
      name: '오후 1시',
      value: '01:00PM',
    },
  ];
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
    select: this.handleDateSelect,
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
        color: '#ff9f89',
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
  handleDateSelect(selectInfo: DateSelectArg) {
    this.postReserationRequestDto.reservationDate = selectInfo.start;
    this.$bvModal.show('select-time');
  }
  onClickTime(time: string) {
    this.postReserationRequestDto.reservationTime = time;
    reservationService
      .postReservation(this.postReserationRequestDto)
      .subscribe(res => {
        this.$router.push('/reservation/success');
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
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
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
  padding: 3em;
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
.fc-day-sun,
.fc-day-sat {
  background-color: rgb(255, 193, 170);
}
</style>
