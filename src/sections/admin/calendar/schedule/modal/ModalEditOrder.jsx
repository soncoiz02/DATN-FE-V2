import { Close } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import calendarApi from '../../../../../api/calendar'
import serviceApi from '../../../../../api/service'
import GlassBox from '../../../../../components/GlassBox'
import RHFProvider from '../../../../../components/ReactHookForm/RHFProvider'

import { useState } from 'react'
import MainButton from '../../../../../components/MainButton'
import { RHFAutoCompleteRenderImg } from '../../../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../../../components/ReactHookForm/RHFDatePicker'
import RHFTextField from '../../../../../components/ReactHookForm/RHFTextField'
import { convertNumberToHour, convertTimeToNumber } from '../../../../../utils/dateFormat'
import AssignStaff from './AssignStaff'
import ChangeStatus from './ChangeStatus'
import { useSelector } from 'react-redux'

const defaultFormValue = {
  name: '',
  phone: '',
  service: '',
  date: Date,
  timeSlot: 0,
  staff: '',
  status: '',
}

const ModalEditOrder = ({ openModal, onCloseModal, orderId, removeOrderId }) => {
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

  // hook form

  // const formSchema = yup.object().shape({})

  const methods = useForm({
    defaultValues: defaultFormValue,
  })
  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    setFormValues(values)
    handleGetDetailService(values.service.id)
    handleGetRegisteredServiceByUser(values.phone, values.date)
    handleGetTimeSlotCheckByStaff(values.date)
  }

  // function

  const isChecked = (index) => {
    return index === checkedIndex
  }

  const handleCloseModal = () => {
    removeOrderId()
    onCloseModal()
  }

  const checkTimeSlotByStaff = (index) => {
    return timeSlotCheckByStaff[index]
  }

  const handleDisableByUser = (time) => {
    if (userServiceRegisteredTime.length === 0) return false
    let isDisable = false
    const serviceDetail = allService.find(
      (item) => item._id === formValues?.service.id || currentOrder.serviceId,
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
    if (new Date(formValues?.date).getDate() === today.getDate()) {
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

  // async function

  const handleGetRegisteredServiceByUser = async (userPhone, date) => {
    try {
      const data = await serviceApi.getRegisteredServiceByUserAndDate(userPhone, date.toISOString())
      setUserServiceRegisteredTime(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetTimeSlotCheckByStaff = async (date) => {
    try {
      const categoryId = formValues?.service.categoryId || currentOrder?.serviceId.categoryId
      const serviceId = formValues?.service.id || currentOrder?.serviceId._id
      const data = await serviceApi.getTimeSlotCheckByStaff(categoryId, serviceId, date)
      setTimeSlotCheckByStaff(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetDetailOrder = async (id) => {
    try {
      const data = await calendarApi.getDetailOrder(id)

      handleGetTimeSlotCheckByStaff(new Date(data.startDate))
      handleGetRegisteredServiceByUser(data.infoUser.phone, new Date(data.startDate))

      console.log(data)

      reset({
        name: data.infoUser.name,
        phone: data.infoUser.phone,
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

      setCurrentOrder(data)
      setCheckedData(valueChecked)
      setTimeSlot(data.serviceId.timeSlot)
      setCurrentStaff(currentStaff)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServiceOptions()
    handleGetDetailOrder(orderId)
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
                <Grid item xs={12} md={6}>
                  <RHFTextField name='name' label='Họ tên' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='phone' label='Số điện thoại' />
                </Grid>
                <Grid item xs={12} md={6}>
                  {serviceOptions && (
                    <RHFAutoCompleteRenderImg
                      name='service'
                      options={serviceOptions}
                      label='Dịch vụ'
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker name='date' label='Ngày sử dụng dịch vụ' disablePast />
                </Grid>
                <Grid item xs={12}>
                  <Stack justifyContent='center' alignItems='center'>
                    <MainButton type='submit' colorType='primary'>
                      Chọn khung giờ
                    </MainButton>
                  </Stack>
                </Grid>
              </Grid>
            </RHFProvider>
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
                          checkTimeSlotByStaff(index) ||
                          handleDisableByCurrentTime(time) ||
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
                categoryId={currentOrder.serviceId.categoryId}
                serviceId={formValues?.service.id ?? currentOrder.serviceId._id}
                timeSlot={checkedData}
                date={
                  formValues?.date.toISOString() || new Date(currentOrder.startDate).toISOString()
                }
              />
            )}
            <ChangeStatus status={currentStatus} setStatus={setCurrentStatus} />
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <MainButton colorType='primary'>Hủy lịch</MainButton>
              <Stack direction='row' gap={1}>
                <MainButton colorType='neutral'>Hủy</MainButton>
                <MainButton colorType='primary'>Cập nhật</MainButton>
              </Stack>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default ModalEditOrder
