import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import {
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
  ConfirmationDialog,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui'
import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import calendarApi from '../../../api/calendar'
import GlassBox from '../../../components/GlassBox'

// const appointments = [
//   {
//     startDate: '2022-09-16T13:35:30.271Z',
//     endDate: '2022-09-16T16:29:47.817Z',
//     title: 'Meeting',
//     id: 1,
//   },
//   {
//     startDate: '2022-09-16T16:29:47.817Z',
//     endDate: '2022-09-16T20:29:47.817Z',
//     title: 'Go to a gym',
//     id: 2,
//   },
// ]

const Calendar = () => {
  const [appointments, setAppointments] = useState()

  const currentDateChange = (dateChange) => setCurrentDate(dateChange)

  const onCommitChange = ({ added, changed, deleted }) => {
    console.log(added, changed, deleted)
    // setAppointments((data) => {
    //   if (added) {
    //     const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    //     data = [...data, { id: startingAddedId, ...added }];
    //   }
    //   if (changed) {
    //     data = data.map(appointment => (
    //       changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    //   }
    //   if (deleted !== undefined) {
    //     data = data.filter(appointment => appointment.id !== deleted);
    //   }
    //   return { data }
    // })
  }

  const handleGetListOrderConfirmed = async () => {
    try {
      const data = await calendarApi.getListOrderConfirmed()
      console.log(data)
      const appointments = data.map((item) => {
        return {
          startDate: new Date(item.dateStart),
          endDate: new Date(item.dateEnd),
          title: item.infoUser.name + ' đăng ký dịch vụ ' + item.service_id.name,
          id: item._id,
        }
      })
      setAppointments(appointments)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListOrderConfirmed()
  }, [])

  return (
    <GlassBox>
      <Scheduler data={appointments} locale='vi-VN' height={800}>
        <ViewState
          currentDate={new Date()}
          onCurrentDateChange={currentDateChange}
          defaultCurrentViewName='Tuần'
        />
        <EditingState onCommitChanges={onCommitChange} />
        <IntegratedEditing />
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

        <ViewSwitcher />
        <ConfirmationDialog
          messages={{
            confirmDeleteMessage: 'Bạn có chắc muốn hủy lịch này',
            deleteButton: 'Hủy lịch',
            cancelButton: 'Quay lại',
          }}
        />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </GlassBox>
  )
}

export default Calendar
