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
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui'
import { styled, useTheme } from '@mui/material'
import { purple } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import calendarApi from '../../../api/calendar'
import serviceApi from '../../../api/service'
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
  const [appointments, setAppointments] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [resources, setResources] = useState()
  const theme = useTheme()

  const currentDateChange = (dateChange) => setCurrentDate(dateChange)

  const onCommitChange = ({ added, changed, deleted }) => {
    if (added) {
    }
    if (changed) {
      let dataChanged
      appointments.forEach((item) => {
        if (changed[item.id]) dataChanged = changed[item.id]
      })
      console.log(dataChanged)
    }
    if (deleted !== undefined) {
      handleCancelRegister(deleted)
    }
  }

  const getStatusColor = (statusType) => {
    if (statusType === 'pending') return theme.palette.warning.main
    if (statusType === 'done') return theme.palette.secondary.main
    if (statusType === 'reject') return theme.palette.primary.main
    if (statusType === 'accepted') return theme.palette.info.main
  }

  const handleGetListOrder = async () => {
    try {
      const data = await calendarApi.getListOrder()
      const appointments = data.map((item) => {
        return {
          id: item._id,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          title: item.infoUser.name + ' - ' + item.infoUser.phone,
          status: item.status._id,
          service: item.serviceId._id,
        }
      })

      setAppointments(appointments)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetResources = async () => {
    try {
      const serviceData = await serviceApi.getAll()
      const statusData = await calendarApi.getListStatus()
      const status = statusData.map((item) => ({
        id: item._id,
        text: item.name,
        color: getStatusColor(item.type),
      }))
      const services = serviceData.map((item) => ({
        id: item._id,
        text: item.name,
        color: purple[500],
      }))
      const serviceResources = {
        fieldName: 'service',
        title: 'Dịch vụ',
        instances: services,
      }
      const statusResources = {
        fieldName: 'status',
        title: 'Trạng thái',
        instances: status,
      }

      setResources([serviceResources, statusResources])
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelRegister = async (id) => {
    try {
      await calendarApi.updateOrderStatusToCancel(id)
      handleGetListOrder()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListOrder()
    handleGetResources()
  }, [])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' } }}>
      <Scheduler data={appointments} locale='vi-VN' height={800}>
        <ViewState
          currentDate={currentDate}
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
            deleteButton: 'Có',
            cancelButton: 'Không',
            discardButton: 'Bỏ',
            confirmCancelMessage: 'Bạn có muốn bỏ những thay đổi',
          }}
        />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          messages={{
            detailsLabel: 'Chi tiết',
            moreInformationLabel: 'Thông tin thêm',
            allDayLabel: 'Cả ngày',
            repeatLabel: 'Lặp lại',
            repeatEveryLabel: 'Lặp lại mỗi',
            daysLabel: 'ngày',
            daily: 'Hàng ngày',
            weekly: 'Hàng tuần',
            monthly: 'Hàng tháng',
            yearly: 'Hàng năm',
            endRepeatLabel: 'Kết thúc lặp',
            never: 'Không bao giờ',
            onLabel: 'Trong',
            occurrencesLabel: 'lần xuất hiện',
            afterLabel: 'Sau',
            commitCommand: 'Lưu',
          }}
        />
        <Resources data={resources} mainResourceName='status' />
      </Scheduler>
    </GlassBox>
  )
}

export default Calendar
