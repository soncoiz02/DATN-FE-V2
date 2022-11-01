import { Close } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import calendarApi from '../../../../../api/calendar'
import serviceApi from '../../../../../api/service'
import GlassBox from '../../../../../components/GlassBox'
import RHFProvider from '../../../../../components/ReactHookForm/RHFProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import MainButton from '../../../../../components/MainButton'
import { RHFAutoCompleteRenderImg } from '../../../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../../../components/ReactHookForm/RHFDatePicker'
import RHFTextField from '../../../../../components/ReactHookForm/RHFTextField'
import useAuth from '../../../../../hook/useAuth'
import { convertNumberToHour, convertTimeToNumber } from '../../../../../utils/dateFormat'
import phoneRegExp from '../../../../../utils/phoneRegExp'
import AssignStaff from './AssignStaff'

const defaultFormValue = {
  name: '',
  phone: '',
  email: '',
  service: {
    id: '',
    label: '',
    price: 0,
  },
  date: new Date(),
  timeSlot: 0,
  staff: '',
  status: '',
}

const ModalEditOrder = ({
  openModal,
  onCloseModal,
  orderId,
  removeOrderId,
  getListOrder,
  onOpenAlert,
  setAlertInfo,
}) => {
  const [currentOrder, setCurrentOrder] = useState()
  const [serviceOptions, setServiceOptions] = useState(null)
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [timeSlot, setTimeSlot] = useState()
  const [checkedData, setCheckedData] = useState()
  const [userServiceRegisteredTime, setUserServiceRegisteredTime] = useState([])
  const [timeSlotCheckByStaff, setTimeSlotCheckByStaff] = useState([])
  const [formValues, setFormValues] = useState()

  const [currentStaff, setCurrentStaff] = useState()

  const [currentStatus, setCurrentStatus] = useState()

  const allService = useSelector((state) => state.order.services)

  const { userInfo } = useAuth()

  // hook form

  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập họ tên'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Không đúng định dạng số điện thoại'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Sai định dạng email'),
    service: yup
      .object()
      .shape({
        id: yup.string().required('Vui lòng chọn dịch vụ'),
        label: yup.string().required('Vui lòng chọn dịch vụ'),
        price: yup.number().required('Vui lòng chọn dịch vụ'),
      })
      .typeError('Vui lòng chọn dịch vụ'),
    date: yup.date().required('Vui lòng chọn ngày'),
  })

  const methods = useForm({
    defaultValues: defaultFormValue,
    resolver: yupResolver(formSchema),
  })
  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    setFormValues(values)
    handleGetDetailService(values.service.id)
    handleGetRegisteredServiceByUser(values.phone, values.date)
    handleGetTimeSlotCheckByStaff(values.date, values.service.id)
  }

  // function

  const isChecked = (index) => {
    return index === checkedIndex
  }

  const handleCloseModal = () => {
    if (orderId) removeOrderId()
    setCheckedData(null)
    onCloseModal()
  }

  const checkTimeSlotByStaff = (index, time) => {
    if (time === convertTimeToNumber(currentOrder?.startDate)) return
    return timeSlotCheckByStaff[index]
  }

  const handleDisableByUser = (time) => {
    if (userServiceRegisteredTime.length === 0) return false
    if (time === convertTimeToNumber(currentOrder?.startDate)) return
    let isDisable = false
    const serviceDetail = allService.find(
      (item) => item._id === formValues?.service.id || currentOrder?.serviceId,
    )
    const hourDuration = (serviceDetail.duration + 15) / 60
    userServiceRegisteredTime.forEach((item) => {
      if (
        (time < item.end && item.end - time < hourDuration) ||
        (time >= item.start && time - item.start < hourDuration)
      )
        isDisable = true
    })
    return isDisable
  }

  const handleDisableByCurrentTime = (time) => {
    const today = new Date()
    const thatDay = new Date(formValues?.date || currentOrder.startDate)
    if (thatDay.getDate() === today.getDate()) {
      const hourNumber = today.getHours()
      const minuteNumber = today.getMinutes() / 60
      const currentTime = hourNumber + minuteNumber

      if (currentTime > time) return true
      return false
    }
    return false
  }

  const handleGetServiceOptions = () => {
    const serviceOptions = allService.map((service) => ({
      id: service._id,
      label: service.name,
      image: service.image,
      price: service.price,
    }))
    setServiceOptions(serviceOptions)
  }

  const handleGetDetailService = (id) => {
    const data = allService.find((item) => item._id === id)
    setTimeSlot(data.timeSlot)
  }

  const handleUpdateOrder = () => {
    const date = formValues?.date || currentOrder.startDate
    const infoUser = formValues
      ? { name: formValues.name, phone: formValues.phone, email: formValues.email }
      : currentOrder.infoUser
    const service =
      allService.find((service) => service._id === formValues?.service?.id) ||
      currentOrder.serviceId
    const timeStart = convertNumberToHour(checkedData, 'getTime')
    const timeEnd = convertNumberToHour(checkedData + (service.duration + 15) / 60, 'getTime')

    const startDate = new Date(new Date(date).setHours(timeStart.hour, timeStart.minute, 0))
    const endDate = new Date(new Date(date).setHours(timeEnd.hour, timeEnd.minute, 0))

    const staff = currentStaff.id
    const status = currentStatus.id

    const updateData = {
      infoUser,
      serviceId: service._id,
      staff: staff,
      status: status,
      startDate,
      endDate,
    }

    const activity = {
      content: 'Cập nhật lịch đặt',
      orderId: currentOrder._id,
      userId: userInfo._id,
    }

    updateOrder(updateData)
    handleAddUpdateActivity(activity)
  }

  // async function

  const handleAddUpdateActivity = async (data) => {
    try {
      await calendarApi.addUpdateActivity(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateOrder = async () => {
    try {
      const date = formValues.date
      const service = allService.find((service) => service._id === formValues.service.id)
      const timeStart = convertNumberToHour(checkedData, 'getTime')
      const timeEnd = convertNumberToHour(checkedData + (service.duration + 15) / 60, 'getTime')

      const startDate = new Date(new Date(date).setHours(timeStart.hour, timeStart.minute, 0))
      const endDate = new Date(new Date(date).setHours(timeEnd.hour, timeEnd.minute, 0))

      const registerData = {
        infoUser: {
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email,
        },
        serviceId: formValues.service.id,
        startDate,
        endDate,
        userId: userInfo._id,
        status: '632bc736dc2a7f68a3f383e7',
      }

      await serviceApi.registerService(registerData)
      getListOrder()
      handleCloseModal()
      onOpenAlert()
      setAlertInfo({
        message: 'Tạo mới lịch đặt thành công',
        type: 'success',
      })
    } catch (error) {
      onOpenAlert()
      setAlertInfo({
        message: 'Tạo mới lịch đặt thất bại',
        type: 'error',
      })
    }
  }

  const updateOrder = async (data) => {
    try {
      await calendarApi.updateOrder(data, currentOrder._id)
      getListOrder()
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetRegisteredServiceByUser = async (userPhone, date) => {
    try {
      const data = await serviceApi.getRegisteredServiceByUserAndDate(userPhone, date.toISOString())
      setUserServiceRegisteredTime(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetTimeSlotCheckByStaff = async (date, id) => {
    try {
      const serviceId = formValues?.service.id || id
      const data = await serviceApi.getTimeSlotCheckByStaff(serviceId, date.toISOString())
      setTimeSlotCheckByStaff(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetDetailOrder = async (id) => {
    try {
      const data = await calendarApi.getDetailOrder(id)
      reset({
        name: data.infoUser.name,
        phone: data.infoUser.phone,
        email: data.infoUser.email,
        service: {
          id: data.serviceId._id,
          image: data.serviceId.image,
          price: data.serviceId.price,
          label: data.serviceId.name,
        },
        date: new Date(data.startDate),
      })

      const valueChecked = convertTimeToNumber(data.startDate)

      const currentStaff = {
        id: data.staff?._id || '',
        label: data.staff?.name || '',
        image: data.staff?.avt || '',
      }

      const currentStatus = {
        id: data.status._id,
        label: data.status.name,
        type: data.status.type,
      }
      setCurrentOrder(data)
      setCheckedData(valueChecked)
      setTimeSlot(data.serviceId.timeSlot)
      setCurrentStaff(currentStaff)
      setCurrentStatus(currentStatus)

      handleGetTimeSlotCheckByStaff(new Date(data.startDate), data.serviceId._id)
      handleGetRegisteredServiceByUser(data.infoUser.phone, new Date(data.startDate))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServiceOptions()
    if (orderId) handleGetDetailOrder(orderId)
  }, [orderId])

  return (
    <Modal open={openModal} onClose={onCloseModal} sx={{ overflowY: 'auto' }}>
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          height: { xs: 'auto', md: '100vh' },
          justifyContent: 'center',
          py: { xs: '15px', md: '30px' },
        }}
      >
        <GlassBox sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }} opacity={1}>
          <Stack gap={3}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='h2'>Thông tin lịch đặt</Typography>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Stack>
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name='name' label='Họ tên' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name='phone' label='Số điện thoại' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name='email' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {serviceOptions && (
                    <RHFAutoCompleteRenderImg
                      name='service'
                      options={serviceOptions}
                      label='Dịch vụ'
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFDatePicker name='date' label='Ngày sử dụng dịch vụ' disablePast />
                </Grid>
                <Grid item xs={12}>
                  <Stack justifyContent='center' alignItems='center'>
                    <MainButton type='submit' colorType='primary'>
                      Xem khung giờ
                    </MainButton>
                  </Stack>
                </Grid>
              </Grid>
            </RHFProvider>
            <Stack gap={1}>
              <Typography variant='h4' color='primary'>
                Chú ý:
              </Typography>
              <Typography variant='body1'>
                Khi thay đổi các thông tin ở trên phải ấn nút xem khung giờ để hệ thống xử lý việc
                lấy ra các khung giờ tương ứng với mỗi dịch vụ
              </Typography>
            </Stack>
            {timeSlot && (
              <Stack gap={2}>
                <Typography variant='h3'>Khung giờ</Typography>
                <Stack direction='row' gap={{ xs: 2, md: 4 }} flexWrap='wrap'>
                  {timeSlot.map((time, index) => (
                    <Box key={index}>
                      <input
                        hidden
                        type='radio'
                        name='time'
                        id={`time-range-${index}`}
                        value={time}
                        onChange={() => {
                          setCheckedIndex(index)
                          setCheckedData(time)
                        }}
                      />
                      <MainButton
                        sx={{
                          border: isChecked(index) ? 'none' : '1px solid #e3e3e3',
                          padding: '10px 25px',
                        }}
                        colorType={isChecked(index) || time === checkedData ? 'primary' : 'neutral'}
                        component='label'
                        htmlFor={`time-range-${index}`}
                        disabled={
                          handleDisableByCurrentTime(time) ||
                          checkTimeSlotByStaff(index, time) ||
                          handleDisableByUser(time)
                        }
                      >
                        <Typography variant='body1'>
                          {convertNumberToHour(time, 'formatTime')}
                        </Typography>
                      </MainButton>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            )}
            {currentOrder && (
              <AssignStaff
                staffValue={currentStaff}
                setStaffValue={setCurrentStaff}
                categoryId={currentOrder.serviceId.categoryId._id}
                serviceId={formValues?.service.id || currentOrder.serviceId._id}
                timeSlot={checkedData}
                date={
                  formValues?.date.toISOString() || new Date(currentOrder.startDate).toISOString()
                }
              />
            )}
            <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={1}>
              <MainButton colorType='neutral' onClick={handleCloseModal}>
                Hủy
              </MainButton>
              <MainButton
                colorType='primary'
                onClick={orderId ? handleUpdateOrder : handleCreateOrder}
              >
                {orderId ? 'Cập nhật' : 'Tạo mới'}
              </MainButton>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default ModalEditOrder
