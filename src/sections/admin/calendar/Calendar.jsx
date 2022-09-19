import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import '@fullcalendar/react/dist/vdom'
import timeGridPlugin from '@fullcalendar/timegrid'
import React from 'react'
import GlassBox from '../../../components/GlassBox'

const eventsData = [
  {
    title: 'Event 1',
    start: '2022-09-04T00:00:00.000Z',
    color: 'green',
    backgroundColor: 'green',
  },
]

const Calendar = () => {
  return (
    <GlassBox>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView='timeGridWeek'
        events={eventsData}
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,listDay',
          center: 'title',
          end: 'today prev,next',
        }}
        handleWindowResize
        titleFormat={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }}
      />
    </GlassBox>
  )
}

export default Calendar
