import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Appointments,
  AppointmentTooltip,
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
import {
  Cancel,
  CheckCircle,
  CreditScore,
  Done,
  DoubleArrow,
  Edit,
  Workspaces,
} from '@mui/icons-material'
import {
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Popper,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../../../../api/calendar'
import serviceApi from '../../../../api/service'
import userApis from '../../../../api/user'
import AlertCustom from '../../../../components/AlertCustom'
import GlassBox from '../../../../components/GlassBox'
import useAuth from '../../../../hook/useAuth'
import { setServices, setStatus } from '../../../../redux/slice/orderSlice'
import { getFullList } from '../../../../redux/slice/serviceRegisterSlice'
import formatPrice from '../../../../utils/formatPrice'
import getSocket from '../../../../utils/socket'
import DialogConfirm from './DialogConfirm'
import ModalEditOrder from './modal-form/ModalEditOrder'
import ModalPay from './modal-pay/ModalPay'
import { statusId } from '../../../../api/calendar'
import { dateFormat, formatDateToHour } from '../../../../utils/dateFormat'
import FilterForm from '../list/FilterForm'

const socket = getSocket()

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [resources, setResources] = useState()
  const [orderId, setOrderId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [openModalPay, setOpenModalPay] = useState(false)

  const [openAlert, setOpenAlert] = useState(true)
  const [alertInfo, setAlertInfo] = useState({
    message: '',
    type: '',
  })

  const theme = useTheme()
  const statuses = useSelector((state) => state.order.status)
  const appointments = useSelector((state) => state.serviceRegister.list)
  const dispatch = useDispatch()

  const { userInfo } = useAuth()

  const [queryParams, setQueryParams] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // component

  const Header = ({ children, appointmentData, ...restProps }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopper = Boolean(anchorEl)

    const handleOpenPopper = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const isPast = (date) => {
      const today = new Date()
      const thatDay = new Date(date)
      return today > thatDay
    }

    const isPay = (status) => {
      return status === statusId.paid
    }

    const disableSuccess = (status) => {
      return (
        status === statusId.pending ||
        status === statusId.cancel ||
        status === statusId.done ||
        status === statusId.accepted
      )
    }

    const disablePayment = (status) => {
      return (
        status !== statusId.done || status === statusId.paid || userInfo?.roleId.name === 'Staff'
      )
    }

    const disableStart = (status) => {
      return status !== statusId.accepted
    }

    const disableAccepted = (status) => {
      return (
        status === statusId.accepted ||
        status === statusId.done ||
        status === statusId.doing ||
        userInfo?.roleId.name === 'Staff'
      )
    }

    const disableCancel = (status) => {
      return (
        status === statusId.doing || status === statusId.cancel || userInfo?.roleId.name === 'Staff'
      )
    }

    const disableEdit = (status) => {
      return (
        status === statusId.done ||
        status === statusId.paid ||
        status === statusId.doing ||
        status === statusId.cancel ||
        userInfo?.roleId.name === 'Staff'
      )
    }

    return (
      <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
        <Tooltip title='Tr???ng th??i' placement='top'>
          <IconButton
            /* eslint-disable-next-line no-alert */
            onClick={handleOpenPopper}
            disabled={isPast(appointmentData.startDate) || isPay(appointmentData.status)}
            size='large'
          >
            <Workspaces />
          </IconButton>
        </Tooltip>
        <Popper open={openPopper} anchorEl={anchorEl} placement='top' sx={{ zIndex: 1500 }}>
          <Paper>
            <Stack>
              <MenuItem
                onClick={() => handleChangeStatus(appointmentData.id, 'accepted')}
                disabled={
                  disableAccepted(appointmentData.status) || isPast(appointmentData.startDate)
                }
              >
                <Stack direction='row' gap={1} alignItems='center'>
                  <CheckCircle color='info' fontSize='small' />
                  <Typography variant='body2'>X??c nh???n</Typography>
                </Stack>
              </MenuItem>
              <MenuItem
                disabled={disableStart(appointmentData.status) || isPast(appointmentData.startDate)}
                onClick={() => handleChangeStatus(appointmentData.id, 'doing')}
              >
                <Stack direction='row' gap={1} alignItems='center'>
                  <DoubleArrow color='primary' fontSize='small' />
                  <Typography variant='body2'>B???t ?????u l??m</Typography>
                </Stack>
              </MenuItem>
              <MenuItem
                disabled={
                  disableSuccess(appointmentData.status) || isPast(appointmentData.startDate)
                }
                onClick={() => {
                  setOrderId(appointmentData.id)
                  setDialogTitle('X??c nh???n l???ch ?????t n??y ???? ho??n th??nh ?')
                  setOpenDialog(true)
                }}
              >
                <Stack direction='row' gap={1} alignItems='center'>
                  <Done color='success' fontSize='small' />
                  <Typography variant='body2'>Ho??n th??nh</Typography>
                </Stack>
              </MenuItem>
              <MenuItem
                disabled={
                  disablePayment(appointmentData.status) || isPast(appointmentData.startDate)
                }
                onClick={() => {
                  setOrderId(appointmentData.id)
                  setOpenModalPay(true)
                }}
              >
                <Stack direction='row' gap={1} alignItems='center'>
                  <CreditScore color='secondary' fontSize='small' />
                  <Typography variant='body2'>Thanh to??n</Typography>
                </Stack>
              </MenuItem>
              <MenuItem
                onClick={() => handleCancel(appointmentData.id, 'cancel')}
                disabled={
                  disableCancel(appointmentData.status) || isPast(appointmentData.startDate)
                }
              >
                <Stack direction='row' gap={1} alignItems='center'>
                  <Cancel color='error' fontSize='small' />
                  <Typography variant='body2'>H???y</Typography>
                </Stack>
              </MenuItem>
            </Stack>
          </Paper>
        </Popper>
        <Tooltip title='S???a' placement='top'>
          <span>
            <IconButton
              /* eslint-disable-next-line no-alert */
              onClick={() => {
                setOrderId(appointmentData.id)
                setOpenModal(true)
              }}
              size='large'
              disabled={isPast(appointmentData.startDate) || disableEdit(appointmentData.status)}
            >
              <Edit />
            </IconButton>
          </span>
        </Tooltip>
      </AppointmentTooltip.Header>
    )
  }

  const Content = ({ children, appointmentData, ...restProps }) => {
    return (
      <AppointmentTooltip.Content appointmentData={appointmentData} {...restProps}>
        <Stack gap={1} sx={{ mt: 1.5 }}>
          {appointmentData.servicesRegistered.map((item, index) => (
            <Stack gap={1} sx={{ ml: 2.5 }} key={index}>
              <Stack direction='row' alignItems='center' gap={1}>
                <Avatar src={item.service.image} sx={{ width: '30px', height: '30px' }} />
                <Typography variant='body1'>
                  {item.service.name} | {formatDateToHour(item.timeStart)} -{' '}
                  {formatDateToHour(item.timeEnd)}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                alignItems='center'
                gap={1}
                sx={{ ml: 1.5, borderLeft: '1px solid gray', pl: 2 }}
              >
                <Avatar src={item.staff.avt} sx={{ width: '30px', height: '30px' }} />
                <Typography variant='body2'>{item.staff.name}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </AppointmentTooltip.Content>
    )
  }

  // functions

  const currentDateChange = (dateChange) => setCurrentDate(dateChange)

  const getStatusColor = (statusType) => {
    if (statusType === 'pending') return theme.palette.warning.main
    if (statusType === 'done') return theme.palette.secondary.main
    if (statusType === 'reject') return theme.palette.primary.main
    if (statusType === 'accepted') return theme.palette.info.main
    if (statusType === 'paid') return theme.palette.success.main
    if (statusType === 'doing') return amber[800]
  }

  // async function

  const handleCancel = async (orderId, statusType) => {
    try {
      const detailStatus = statuses.find((status) => status.type === statusType)
      const activityLog = {
        userId: userInfo._id,
        orderId,
        content: `???? h???y l???ch ?????t`,
      }
      await calendarApi.changeStatus(orderId, statusType)
      await calendarApi.addUpdateActivity(activityLog)
      socket.emit('change-status')
      const detailOrder = appointments.find((item) => item.id === orderId)
      const data = {
        content: `L???ch ?????t c???a b???n v??o l??c ${formatDateToHour(
          detailOrder.startDate,
        )} ng??y ${dateFormat(detailOrder.startDate)} ???? b??? h???y`,
        userId: detailOrder.customer,
        storeId: userInfo.storeId,
      }
      socket.emit('send-notify-to-user', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeStatus = async (orderId, statusType) => {
    try {
      const detailStatus = statuses.find((status) => status.type === statusType)
      const activityLog = {
        userId: userInfo._id,
        orderId,
        content:
          statusType === 'accepted'
            ? `???? x??c nh???n ????n`
            : `C???p nh???t tr???ng th??i th??nh ${detailStatus.name}`,
      }
      await calendarApi.changeStatus(orderId, statusType)
      await calendarApi.addUpdateActivity(activityLog)
      socket.emit('change-status')
      const detailOrder = appointments.find((item) => item.id === orderId)
      if (statusType === 'accepted') {
        const data = {
          content: `L???ch ?????t c???a b???n v??o l??c ${formatDateToHour(
            detailOrder.startDate,
          )} ng??y ${dateFormat(detailOrder.startDate)} ???? ???????c x??c nh???n`,
          userId: detailOrder.customer,
          storeId: userInfo.storeId,
        }
        socket.emit('send-notify-to-user', data)
      }
      if (statusType === 'paid') {
        console.log(statusType)
        const data = {
          content: `L???ch ?????t c???a b???n v??o l??c ${formatDateToHour(
            detailOrder.startDate,
          )} ng??y ${dateFormat(detailOrder.startDate)} ???? ???????c thanh to??n`,
          userId: detailOrder.customer,
          storeId: userInfo.storeId,
        }
        socket.emit('send-notify-to-user', data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updateOrderStatusToDone = async () => {
    try {
      await calendarApi.updateOrderStatusToDone(orderId)
      socket.emit('change-status')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetListOrder = async (queryParams) => {
    try {
      const data = await calendarApi.getFutureOrder(queryParams)
      const appointments = data.map((item) => {
        return {
          id: item._id,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          title: item.infoUser.name + ' - ' + item.infoUser.phone,
          status: item.status._id,
          servicesRegistered: item.servicesRegistered,
          customer: item.userId,
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
        serviceApi.getByStore(userInfo.storeId),
        calendarApi.getListStatus(),
        userApis.getStoreStaff(userInfo.storeId),
      ])
      const serviceData = allData[0]
      const statusData = allData[1]

      const status = statusData.map((item) => ({
        id: item._id,
        text: 'Tr???ng th??i: ' + item.name,
        color: getStatusColor(item.type),
      }))

      const statusResources = {
        fieldName: 'status',
        title: 'Tr???ng th??i',
        instances: status,
      }

      setResources([statusResources])
      dispatch(setStatus(statusData))
      dispatch(setServices(serviceData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetResources()
  }, [])

  useEffect(() => {
    handleGetListOrder(queryParams)
  }, [queryParams])

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('receive-new-order', (data) => {
        if (data === userInfo.storeId) {
          handleGetListOrder()
        }
      })
      socket.on('receive-status-change', () => {
        handleGetListOrder()
      })
    })
  }, [socket])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' } }}>
      <Stack gap={3}>
        <FilterForm
          currentParams={queryParams}
          setQueryParams={setQueryParams}
          onLoading={() => setIsLoading(true)}
        />
        <Scheduler data={appointments} locale='vi-VN' height={800}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
            defaultCurrentViewName='Tu???n'
          />
          <DayView startDayHour={8} endDayHour={21} name='Ng??y' />
          <WeekView startDayHour={8} endDayHour={21} name='Tu???n' />
          <MonthView startDayHour={8} endDayHour={21} name='Th??ng' />
          <Toolbar />
          <DateNavigator />
          <TodayButton
            messages={{
              today: 'H??m nay',
            }}
          />

          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip headerComponent={Header} showCloseButton contentComponent={Content} />
          <Resources data={resources} mainResourceName='status' />
        </Scheduler>
      </Stack>
      {openDialog && orderId && (
        <DialogConfirm
          openDialog={openDialog}
          closeDialog={() => setOpenDialog(false)}
          next={updateOrderStatusToDone}
          title={dialogTitle}
        />
      )}
      {openModal && orderId && (
        <ModalEditOrder
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          orderId={orderId}
          removeOrderId={() => setOrderId(null)}
          getListOrder={handleGetListOrder}
          onOpenAlert={() => setOpenAlert(true)}
          setAlertInfo={setAlertInfo}
        />
      )}
      {openModalPay && orderId && (
        <ModalPay
          openModal={openModalPay}
          onCloseModal={() => setOpenModalPay(false)}
          orderId={orderId}
          getListOrder={handleGetListOrder}
          onOpenAlert={() => setOpenAlert(true)}
          setAlertInfo={setAlertInfo}
        />
      )}
      {openAlert && (
        <AlertCustom
          open={openAlert}
          onClose={() => setOpenAlert(true)}
          message={alertInfo.message}
          status={alertInfo.type}
          time={2000}
        />
      )}
    </GlassBox>
  )
}

const CustomPaper = styled(Paper)`
  padding: 15px;
  z-index: 60;
`

export default Calendar
