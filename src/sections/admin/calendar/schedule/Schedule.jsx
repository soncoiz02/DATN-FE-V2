import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import { Edit } from '@mui/icons-material'
import { IconButton, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../../../../api/calendar'
import serviceApi from '../../../../api/service'
import userApis from '../../../../api/user'
import GlassBox from '../../../../components/GlassBox'
import useAuth from '../../../../hook/useAuth'
import { setServices, setStatus } from '../../../../redux/slice/orderSlice'
import { getFullList } from '../../../../redux/slice/serviceRegisterSlice'
import formatPrice from '../../../../utils/formatPrice'
import ModalEditOrder from './modal/ModalEditOrder'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [listService, setListServices] = useState([])
  const [resources, setResources] = useState()
  const [orderId, setOrderId] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const theme = useTheme()
  const appointments = useSelector((state) => state.serviceRegister.listFiltered)
  const dispatch = useDispatch()

  const { userInfo } = useAuth()

  // component

  const Header = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => {
          setOrderId(appointmentData.id)
          setOpenModal(true)
        }}
        size='large'
      >
        <Edit />
      </IconButton>
    </AppointmentTooltip.Header>
  )

  // functions

  const currentDateChange = (dateChange) => setCurrentDate(dateChange)

  const getStatusColor = (statusType) => {
    if (statusType === 'pending') return theme.palette.warning.main
    if (statusType === 'done') return theme.palette.secondary.main
    if (statusType === 'reject') return theme.palette.primary.main
    if (statusType === 'accepted') return theme.palette.info.main
  }

  // async function

  const handleGetListOrder = async () => {
    try {
      console.log(userInfo)
      const data = await calendarApi.getFutureOrder('633e5ddff1be5d928b97c813')
      const appointments = data.map((item) => {
        return {
          id: item._id,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          title: item.infoUser.name + ' - ' + item.infoUser.phone,
          status: item.status._id,
          service: item.service._id,
          staff: item.staff,
        }
      })

      dispatch(getFullList(appointments))
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetResources = async () => {
    try {
      const allData = await Promise.all([
        serviceApi.getAll(),
        calendarApi.getListStatus(),
        userApis.getStoreStaff('633e759de2466f29efaab9fd'),
      ])
      const serviceData = allData[0]
      const statusData = allData[1]
      const staffData = allData[2]

      const status = statusData.map((item) => ({
        id: item._id,
        text: 'Trạng thái: ' + item.name,
        color: getStatusColor(item.type),
      }))

      const services = serviceData.map((item) => ({
        id: item._id,
        text: `${item.name} - ${formatPrice(item.price)}`,
      }))

      const staff = staffData.map((item) => ({
        id: item._id,
        text: 'Nhân viên: ' + item.name,
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

      const staffResources = {
        fieldName: 'staff',
        title: 'Nhân viên',
        instances: staff,
      }

      setResources([serviceResources, statusResources, staffResources])
      setListServices(serviceData)
      dispatch(setStatus(statusData))
      dispatch(setServices(serviceData))
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
      <Stack gap={3}>
        <Scheduler data={appointments} locale='vi-VN' height={800}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
            defaultCurrentViewName='Tháng'
          />
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
          <Appointments />
          <AppointmentTooltip headerComponent={Header} showCloseButton />
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
          {/* <ConfirmationDialog
            messages={{
              confirmDeleteMessage: 'Bạn có chắc muốn hủy lịch này',
              deleteButton: 'Có',
              cancelButton: 'Không',
              discardButton: 'Bỏ',
              confirmCancelMessage: 'Bạn có muốn bỏ những thay đổi',
            }}
          /> */}
        </Scheduler>
      </Stack>
      {orderId && (
        <ModalEditOrder
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          orderId={orderId}
          removeOrderId={() => setOrderId(null)}
        />
      )}
    </GlassBox>
  )
}

export default Calendar
