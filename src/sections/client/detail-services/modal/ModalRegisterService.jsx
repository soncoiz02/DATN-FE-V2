import { yupResolver } from '@hookform/resolvers/yup'
import { AccessTime, CheckCircle, Close, FileDownloadDone, Person } from '@mui/icons-material'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Modal,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'
import RHFDatePicker from '../../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../../components/ReactHookForm/RHFTextField'
import useAuth from '../../../../hook/useAuth'
import { convertNumberToHour, dateFormat, minuteToHours } from '../../../../utils/dateFormat'
import phoneRegExp from '../../../../utils/phoneRegExp'

import addDate from 'date-fns/add'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import serviceApi from '../../../../api/service'

const registerStep = [
  {
    key: 1,
    title: 'Thông tin người dùng',
  },
  {
    key: 2,
    title: 'Hoàn thành',
  },
]

const defaultFormValues = {
  name: '',
  phone: '',
  date: new Date(),
  email: '',
}

const ModalRegisterService = ({ onCloseModal, openModal, serviceInfo }) => {
  // state
  const [activeStep, setActiveStep] = useState(1)
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [timeRange, setTimeRange] = useState()
  const [formValues, setFormValues] = useState()
  const [userServiceRegisteredTime, setUserServiceRegisteredTime] = useState([])
  const [timeSlotCheckByStaff, setTimeSlotCheckByStaff] = useState([])

  const [openAlert, setOpenAlert] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    message: '',
    type: '',
  })

  const serviceId = useParams().id
  const { userInfo, isLogin } = useAuth()

  // form schema
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập họ tên'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Không đúng định dạng số điện thoại'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Sai định dạng email'),
    date: yup.date().required('Vui lòng chọn ngày'),
  })

  // react hook form
  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  // function

  const isChecked = (index) => {
    return index === checkedIndex
  }

  const onSubmit = (values) => {
    setFormValues(values)
    handleGetRegisteredServiceByUser(values.phone, values.date)
    handleGetTimeSlotCheckByStaff(values.date)
  }

  const handleFinalStep = () => {
    const startDateConverted = convertNumberToHour(timeRange.value, 'getTime')
    // end time = start time + duration + 15
    const endDateConverted = convertNumberToHour(
      timeRange.value + (serviceInfo.duration + 15) / 60,
      'getTime',
    )

    const startDate = new Date(
      formValues.date.setHours(startDateConverted.hour, startDateConverted.minute, 0),
    )
    const endDate = new Date(
      formValues.date.setHours(endDateConverted.hour, endDateConverted.minute, 0),
    )

    console.log(startDate, endDate)

    const registerData = {
      infoUser: {
        name: formValues.name,
        phone: formValues.phone,
      },
      serviceId,
      startDate,
      endDate,
      userId: userInfo._id,
      status: '632bc736dc2a7f68a3f383e7',
    }
    handleRegisterService(registerData)
  }

  const checkTimeSlotByStaff = (index) => {
    return timeSlotCheckByStaff[index]
  }

  const handleDisableByCurrentTime = (time) => {
    const today = new Date()
    if (new Date(formValues.date).getDate() === today.getDate()) {
      const hourNumber = today.getHours()
      const minuteNumber = today.getMinutes() / 60
      const currentTime = hourNumber + minuteNumber

      if (currentTime > time) return true
      return false
    }
    return false
  }

  const fillUserData = () => {
    reset({
      name: userInfo?.name,
      phone: userInfo?.phone,
      date: new Date(),
      email: userInfo.email,
    })
  }

  const handleDisableByUser = (time) => {
    if (userServiceRegisteredTime.length === 0) return false
    let isDisable = false
    const hourDuration = (serviceInfo.duration + 15) / 60
    userServiceRegisteredTime.forEach((item) => {
      if (
        (time < item.end && item.end - time < hourDuration) ||
        (time >= item.start && time - item.start < hourDuration)
      )
        isDisable = true
    })
    return isDisable
  }

  const handleVerify = () => {
    if (isLogin === false) return alert('You need to login')
    if (!timeRange?.value) return setTimeRange({ error: true, value: null })
    setActiveStep(activeStep + 1)
  }

  // async function

  const handleRegisterService = async (registerData) => {
    try {
      const data = await serviceApi.registerService(registerData)
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

  const handleGetTimeSlotCheckByStaff = async (date) => {
    try {
      const data = await serviceApi.getTimeSlotCheckByStaff(serviceInfo._id, date.toISOString())
      setTimeSlotCheckByStaff(data)
    } catch (error) {
      console.log(error)
    }
  }

  // function close modal

  const handleResetAllData = () => {
    reset(defaultFormValues)
    setActiveStep(1)
    setCheckedIndex(-1)
    setFormValues(null)
    setTimeRange(null)
  }

  const handleCloseModal = () => {
    handleResetAllData()
    onCloseModal()
  }

  useEffect(() => {
    fillUserData()
  }, [])

  return (
    <Modal open={openModal} onClose={onCloseModal} sx={{ overflowY: 'auto' }}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          height: { xs: 'auto', md: '100vh' },
          justifyContent: 'center',
          py: { xs: '15px', md: '30px' },
          outline: 'none',
        }}
      >
        <GlassBox sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }} opacity={1}>
          <Stack gap={4}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h2'>Đăng ký dịch vụ</Typography>
              <IconButton onClick={onCloseModal}>
                <Close />
              </IconButton>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                {registerStep.map((step, index) => {
                  return (
                    <Step key={step.key}>
                      <StepLabel StepIconComponent={QontoStepIcon}>
                        <Typography variant='subtitle1' color='text.secondary'>
                          {step.title}
                        </Typography>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              <Box sx={{ mt: '30px' }}>
                {activeStep === 1 && (
                  <Stack gap={3}>
                    <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                      <Stack gap={1}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} lg={3}>
                            <RHFTextField name='name' fullWidth label='Họ tên' />
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <RHFTextField name='phone' fullWidth label='Số điện thoại' />
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <RHFTextField name='email' fullWidth label='Email' />
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <RHFDatePicker name='date' label='Chọn ngày' disablePast />
                          </Grid>
                        </Grid>
                        <MainButton
                          sx={{ alignSelf: 'center', mt: 5, px: 5 }}
                          colorType='primary'
                          type='submit'
                        >
                          Xem khung giờ
                        </MainButton>
                      </Stack>
                    </RHFProvider>
                    {formValues && (
                      <Stack gap={4}>
                        <Typography variant='h3'>Chọn khung giờ</Typography>
                        {timeRange?.error && (
                          <Typography variant='h3' color='primary' textAlign='center'>
                            Vui lòng chọn khung giờ
                          </Typography>
                        )}
                        <Stack direction='row' gap={5} flexWrap='wrap'>
                          {serviceInfo.timeSlot.map((time, index) => (
                            <Box key={index}>
                              <input
                                hidden
                                type='radio'
                                name='time'
                                id={`time-range-${index}`}
                                value={time}
                                onChange={() => {
                                  setCheckedIndex(index)
                                  setTimeRange({ error: false, value: time })
                                }}
                              />
                              <MainButton
                                sx={{
                                  border: isChecked(index) ? 'none' : '1px solid #e3e3e3',
                                  padding: '10px 25px',
                                }}
                                colorType={isChecked(index) ? 'primary' : 'neutral'}
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
                        <Box>
                          <Typography variant='h3' color='primary' mb={1}>
                            Khung giờ sẽ khóa nếu:
                          </Typography>
                          <Stack>
                            <Typography variant='title2'>
                              - Khung giờ đó đã qua so với thời gian hiện tại
                            </Typography>
                            <Typography variant='title2'>
                              - Khung giờ đó không còn nhân viên làm dịch vụ
                            </Typography>
                            <Typography variant='title2'>
                              - Số điện thoại bạn đặt đã có lịch đặt trong khoảng khung giờ đó
                            </Typography>
                          </Stack>
                        </Box>
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ mt: 3 }}
                        >
                          <MainButton
                            sx={{ px: { xs: '25px', sm: '50px' } }}
                            colorType='primary'
                            onClick={handleVerify}
                          >
                            Tiếp theo
                          </MainButton>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                )}
                {activeStep === 2 && (
                  <Stack gap={2} alignItems='center'>
                    <Stack direction='row' alignItems='center' gap={1}>
                      <CheckCircle color='secondary' />
                      <Typography variant='h3' color='secondary'>
                        Xác nhận thông tin
                      </Typography>
                    </Stack>
                    {formValues && (
                      <Stack sx={{ width: { xs: '100%', sm: '500px' } }}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Họ tên:</Typography>
                          <Typography variant='body1'>{formValues.name}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Số điện thoại:</Typography>
                          <Typography variant='body1'>{formValues.phone}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Email:</Typography>
                          <Typography variant='body1'>{formValues.email}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Dịch vụ đăng ký: </Typography>
                          <Typography variant='body1'>{serviceInfo.name}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Ngày làm dịch vụ: </Typography>
                          <Typography variant='body1'>
                            {dateFormat(new Date(formValues.date))}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Giờ làm: </Typography>
                          <Typography variant='body1'>
                            {convertNumberToHour(timeRange.value, 'formatTime')}
                          </Typography>
                        </Stack>
                      </Stack>
                    )}
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{ mt: 5, width: '100%' }}
                    >
                      <MainButton
                        sx={{ border: '1px solid #e3e3e3', px: { xs: '25px', sm: '50px' } }}
                        colorType='neutral'
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Bước trước
                      </MainButton>
                      <MainButton
                        sx={{ px: { xs: '25px', sm: '50px' } }}
                        colorType='primary'
                        onClick={handleFinalStep}
                      >
                        Xác nhận
                      </MainButton>
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Box>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 35px)',
    right: 'calc(50% + 35px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eeeeee',
    borderTopWidth: 3,
    borderRadius: 1,
    transition: '0.3s',
  },
}))

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  '& .QontoStepIcon-completedIcon': {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}))

const IconCircle = styled(Box)(
  ({ theme }) => `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
    .MuiSvgIcon-root {
        font-size: 30px;
        color: #979797;
    }

    &.active {
        background: ${theme.palette.primary.main};
        .MuiSvgIcon-root {
            color: white;
        }
    }

    @media screen and (max-width: 767px) {
        width: 35px;
        height: 35px;
        .MuiSvgIcon-root {
            font-size: 20px;
        }
    }
`,
)

function QontoStepIcon({ active, completed, className, icon }) {
  const icons = {
    1: <Person />,
    2: <FileDownloadDone />,
  }
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <IconCircle className='active'>{icons[String(icon)]}</IconCircle>
      ) : (
        <IconCircle>{icons[String(icon)]}</IconCircle>
      )}
    </QontoStepIconRoot>
  )
}

export default ModalRegisterService
