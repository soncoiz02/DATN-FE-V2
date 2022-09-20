import React from 'react'
import GlassBox from '../../../components/GlassBox'
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui'
import { useState } from 'react'
import { useCallback } from 'react'

const appointments = [
  {
    startDate: '2022-09-16T13:35:30.271Z',
    endDate: '2022-09-16T16:29:47.817Z',
    title: 'Meeting',
    id: 1,
  },
  {
    startDate: '2022-09-16T16:29:47.817Z',
    endDate: '2022-09-16T20:29:47.817Z',
    title: 'Go to a gym',
    id: 2,
  },
]

const Calendar = ({ onOpenModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [visible, setVisible] = useState(false)
  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  })
  const [data, setData] = useState(appointments)

  const currentDateChange = (dateChange) => setCurrentDate(dateChange)

  const onCommitChange = useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
        setData([...data, { id: startingAddedId, ...added }])
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment,
          ),
        )
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted))
      }
    },
    [setData, data],
  )

  return (
    <GlassBox>
      <Scheduler data={appointments} locale='vi-VN'>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
          defaultCurrentViewName='Tuần'
        />
        <EditingState onCommitChanges={onCommitChange} />
        <DayView startDayHour={8} endDayHour={21} name='Ngày' />
        <WeekView startDayHour={8} endDayHour={21} name='Tuần' />
        <MonthView startDayHour={8} endDayHour={21} name='Tháng' />
        <Toolbar />
        <DateNavigator />
        <TodayButton
          messages={{
            today: 'Hôm nay',
          }}
        />

        <IntegratedEditing />

        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip
          showCLoseButton
          visible={visible}
          onVisibilityChange={() => setVisible(!visible)}
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={({ data, target }) => setAppointmentMeta({ data, target })}
        />
        <DragDropProvider />
      </Scheduler>
    </GlassBox>
  )
}

export default Calendar
