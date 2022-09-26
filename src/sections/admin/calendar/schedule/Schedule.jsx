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
import { Button, Divider, Grid, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../../../../api/calendar'
import serviceApi from '../../../../api/service'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'
import RHFProvider from '../../../../components/ReactHookForm/RHFProvider'
import RHFSelect from '../../../../components/ReactHookForm/RHFSelect'
import { filterByStatusAndService, getFullList } from '../../../../redux/slice/serviceRegisterSlice'

const defaultFormValues = {
  status: '',
  service: '',
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState('status')
  const [listStatus, setListStatus] = useState([])
  const [services, setListServices] = useState([])
  const [resources, setResources] = useState()
  const theme = useTheme()
  const appointments = useSelector((state) => state.serviceRegister.listFiltered)
  const dispatch = useDispatch()

  // hook form

  const methods = useForm({
    defaultValues: defaultFormValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    dispatch(filterByStatusAndService(values))
  }

  // functions

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

      dispatch(getFullList(appointments))
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
      setListStatus(statusData)
      setListServices(serviceData)
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
      <Stack gap={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Stack gap={2}>
              <Typography variant='h3'>Hiển thị theo</Typography>
              <Select onChange={(e) => setViewType(e.target.value)} value={viewType}>
                <MenuItem value='status'>Trạng thái</MenuItem>
                <MenuItem value='service'>Dịch vụ</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Stack gap={2}>
              <Typography variant='h3'>Lọc theo</Typography>
              <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid item xs={6} sm={4} md={4}>
                    <RHFSelect name='status' label='Trạng thái'>
                      {listStatus?.map((status) => (
                        <MenuItem value={status._id} key={status._id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <RHFSelect name='service' label='Dịch vụ'>
                      {services?.map((service) => (
                        <MenuItem value={service._id} key={service._id}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={6} sm={2} md={2}>
                    <MainButton
                      type='submit'
                      colorType='primary'
                      sx={{ height: '100%', width: '100%' }}
                    >
                      Lọc
                    </MainButton>
                  </Grid>
                  <Grid item xs={6} sm={2} md={2}>
                    <Button
                      variant='outlined'
                      sx={{ height: '100%', width: '100%', borderRadius: '10px' }}
                      onClick={() => {
                        reset(defaultFormValues)
                        dispatch(filterByStatusAndService({ status: '', service: '' }))
                      }}
                    >
                      Hủy
                    </Button>
                  </Grid>
                </Grid>
              </RHFProvider>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
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
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
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
          <Resources data={resources} mainResourceName={viewType} />
          <ConfirmationDialog
            messages={{
              confirmDeleteMessage: 'Bạn có chắc muốn hủy lịch này',
              deleteButton: 'Có',
              cancelButton: 'Không',
              discardButton: 'Bỏ',
              confirmCancelMessage: 'Bạn có muốn bỏ những thay đổi',
            }}
          />
        </Scheduler>
      </Stack>
    </GlassBox>
  )
}

export default Calendar
