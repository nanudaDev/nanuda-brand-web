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
        <b-btn block class="mt-2">{{ item.name }}</b-btn>
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
// import krLocale from '@fullcalendar/core/locales/ko';

@Component({
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
})
export default class Reservation extends Vue {
  private terms = [
    { id: 10, name: '오전 10시' },
    {
      id: 11,
      name: '오전 11시',
    },
    {
      id: 12,
      name: '오전 12시',
    },
    {
      id: 13,
      name: '오후 1시',
    },
  ];
  private calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin, // needed for dateClick
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    buttonText: {
      today: '오늘',
      day: '일',
      week: '주',
      month: '월',
    },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    select: this.handleDateSelect,
    // eventClick: this.handleEventClick,
    eventsSet: this.handleEvents,
    selectAllow: this.selectAllow,
    locale: 'ko',
    slotMinTime: '10:00:00',
    slotMaxTime: '19:00:00',
    allDaySlot: false,
    slotDuration: '01:00:00',
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
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
    this.$bvModal.show('select-time');
  }
  // handleEventClick(clickInfo: EventClickArg) {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`,
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  selectAllow(info: DateSpanApi) {
    if (this.$moment(info.startStr).isBefore(new Date())) {
      return false;
    }
    const isWeekend = info.start.getDay() === 6 || info.start.getDay() === 0;
    if (isWeekend) {
      return false;
    }
    return true;
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
