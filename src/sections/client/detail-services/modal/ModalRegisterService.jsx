import { yupResolver } from '@hookform/resolvers/yup'
import {
  Abc,
  AddCircleOutlineRounded,
  CheckCircle,
  Close,
  FileDownloadDone,
  Loyalty,
  Person,
  Phone,
} from '@mui/icons-material'
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Popper,
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
import { convertNumberToHour, dateFormat, formatDateToHour } from '../../../../utils/dateFormat'
import phoneRegExp from '../../../../utils/phoneRegExp'

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import serviceApi from '../../../../api/service'

import getSocket from '../../../../utils/socket'
import { grey } from '@mui/material/colors'
import ModalVoucher from './ModalVoucher'
import AnotherService from './AnotherService'
import { toast } from 'react-toastify'

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
}

const socket = getSocket()

const ModalRegisterService = ({ onCloseModal, openModal, serviceInfo }) => {
  // state
  const [activeStep, setActiveStep] = useState(1)
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [timeRange, setTimeRange] = useState()
  const [formValues, setFormValues] = useState()
  const [userServiceRegisteredTime, setUserServiceRegisteredTime] = useState([])
  const [timeSlotCheckByStaff, setTimeSlotCheckByStaff] = useState([])

  const { userInfo, isLogin } = useAuth()

  const [voucherAnchor, setVoucherAnchor] = useState(null)
  const openVoucher = Boolean(voucherAnchor)

  const [voucherInfo, setVoucherInfo] = useState()

  const [anotherServiceAnchor, setAnotherServiceAnchor] = useState(null)
  const openAnotherService = Boolean(anotherServiceAnchor)

  const [anotherServiceInfo, setAnotherServiceInfo] = useState()

  // form schema
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập họ tên'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Không đúng định dạng số điện thoại'),
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

  const getStartAndEndDate = (startTime, endTime) => {
    const startDateConverted = convertNumberToHour(startTime, 'getTime')
    const endDateConverted = convertNumberToHour(endTime, 'getTime')

    const startDate = new Date(
      formValues.date.setHours(startDateConverted.hour, startDateConverted.minute, 0),
    )
    const endDate = new Date(
      formValues.date.setHours(endDateConverted.hour, endDateConverted.minute, 0),
    )

    return {
      startDate,
      endDate,
    }
  }

  const handleFinalStep = () => {
    const { startDate, endDate } = getStartAndEndDate(
      timeRange.value,
      timeRange.value + (serviceInfo.duration + 15) / 60,
    )

    const registerData = {
      infoUser: {
        name: formValues.name,
        phone: formValues.phone,
        email: userInfo.email,
      },
      servicesRegistered: [
        {
          service: serviceInfo._id,
          timeStart: startDate,
          timeEnd: endDate,
        },
      ],
      startDate,
      endDate,
      voucher: voucherInfo ? voucherInfo._id : null,
      userId: userInfo._id,
    }

    if (anotherServiceInfo) {
      const { startDate, endDate } = getStartAndEndDate(
        timeRange.value + (serviceInfo.duration + 15) / 60,
        timeRange.value +
          (serviceInfo.duration + 15) / 60 +
          (anotherServiceInfo.duration + 15) / 60,
      )
      const anotherService = {
        service: anotherServiceInfo._id,
        timeStart: startDate,
        timeEnd: endDate,
      }

      registerData.servicesRegistered.push(anotherService)
      registerData.endDate = endDate
    }

    const storeNotifyData = {
      storeId: serviceInfo.categoryId.storeId,
      userId: userInfo._id,
      content: `${userInfo.name} đã đăng ký dịch vụ ${serviceInfo.name} vào lúc ${formatDateToHour(
        startDate,
      )} ngày ${dateFormat(formValues.date)}`,
    }

    const staffNotifyData = {
      storeId: serviceInfo.categoryId.storeId,
      userId: userInfo._id,
      content: `Bạn có lịch vào lúc ${formatDateToHour(startDate)} ngày ${dateFormat(
        formValues.date,
      )}`,
    }

    handleRegisterService(registerData, storeNotifyData)
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
    if (isLogin === false) return toast.dark('Bạn cần phải đăng nhập để đăng ký dịch vụ này')
    if (!timeRange?.value) return setTimeRange({ error: true, value: null })
    setActiveStep(activeStep + 1)
  }

  // async function

  const handleRegisterService = async (registerData, storeNotifyData) => {
    try {
      const responseData = await serviceApi.registerService(registerData)

      const staffNotifyData = responseData.servicesRegistered.map((item) => {
        return {
          storeId: serviceInfo.categoryId.storeId,
          userId: item.staff,
          content: `Bạn có lịch vào lúc ${formatDateToHour(item.timeStart)} ngày ${dateFormat(
            item.timeStart,
          )}`,
        }
      })

      const notifyData = {
        storeNotifyData,
        staffNotifyData,
      }

      socket.emit('send-notify', { storeId: serviceInfo.categoryId.storeId, notifyData })
      toast.dark('Đăng ký thành công')
      handleCloseModal()
    } catch (error) {
      toast.dark('Đăng ký thất bại')
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
    if (isLogin) {
      socket.on('connect', () => {
        console.log(socket.id)
      })
      fillUserData()
    }
  }, [])

  return (
    <CustomModal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='md'
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
            <Stack sx={{ width: '100%' }}>
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
              <MainLayout sx={{ mt: { md: '30px', xs: '15px' }, pt: 1 }}>
                {activeStep === 1 && (
                  <Stack gap={3}>
                    <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                      <Stack gap={1}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <RHFTextField
                              name='name'
                              fullWidth
                              label='Họ tên'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Person />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <RHFTextField
                              name='phone'
                              fullWidth
                              label='Số điện thoại'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Phone />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
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
                    <Stack gap={1}>
                      <Typography variant='h4' color='primary'>
                        Chú ý:
                      </Typography>
                      <Typography variant='body1'>
                        Khi thay đổi các thông tin ở trên phải ấn nút xem khung giờ để hệ thống xử
                        lý việc lấy ra các khung giờ tương ứng với mỗi dịch vụ
                      </Typography>
                    </Stack>
                    {formValues && (
                      <Stack gap={3}>
                        <Typography variant='h3'>Chọn khung giờ</Typography>
                        {timeRange?.error && (
                          <Typography variant='h3' color='primary' textAlign='center'>
                            Vui lòng chọn khung giờ
                          </Typography>
                        )}
                        <Stack direction='row' gap={{ md: 3, xs: 2 }} flexWrap='wrap'>
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
                        {timeRange?.value && (
                          <ClickAwayListener onClickAway={() => setAnotherServiceAnchor(null)}>
                            <Stack gap={2}>
                              <Typography variant='h3'>Thêm dịch vụ khác ?</Typography>
                              {anotherServiceInfo ? (
                                <Stack
                                  direction='row'
                                  alignItems='center'
                                  justifyContent='space-between'
                                  sx={{
                                    border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                                    p: 2,
                                    borderRadius: '10px',
                                    position: 'relative',
                                  }}
                                >
                                  <Divider sx={{ width: '100%' }}>
                                    <Typography variant='h4' color='primary'>
                                      {anotherServiceInfo.name}
                                    </Typography>
                                  </Divider>
                                  <IconButton
                                    size='small'
                                    sx={{
                                      position: 'absolute',
                                      top: '-15px',
                                      right: '-10px',
                                      background: 'rgba(0,0,0,0.1)',
                                    }}
                                    onClick={() => setAnotherServiceInfo(null)}
                                  >
                                    <Close fontSize='small' />
                                  </IconButton>
                                </Stack>
                              ) : (
                                <Stack
                                  alignItems='center'
                                  justifyContent='center'
                                  width='100%'
                                  sx={{
                                    border: `1px dashed ${grey[400]}`,
                                    p: 1,
                                    borderRadius: '10px',
                                  }}
                                >
                                  <Button
                                    aria-describedby='service-popper'
                                    variant='outlined'
                                    sx={{
                                      borderRadius: '50px',
                                      p: { md: '10px 45px', xs: '5px 35px' },
                                    }}
                                    onClick={(event) => {
                                      setAnotherServiceAnchor(
                                        anotherServiceAnchor ? null : event.currentTarget,
                                      )
                                    }}
                                  >
                                    <AddCircleOutlineRounded />
                                  </Button>
                                  <Popper
                                    id='service-popper'
                                    open={openAnotherService}
                                    anchorEl={anotherServiceAnchor}
                                    placement='top'
                                    sx={{ zIndex: 2000 }}
                                  >
                                    <AnotherService
                                      storeId={serviceInfo.categoryId.storeId}
                                      getAnotherServiceInfo={setAnotherServiceInfo}
                                      closePopup={() => setAnotherServiceAnchor(null)}
                                      nextTimeSlot={
                                        timeRange.value + (serviceInfo.duration + 15) / 60
                                      }
                                      date={formValues.date.toISOString()}
                                      currentService={serviceInfo}
                                    />
                                  </Popper>
                                </Stack>
                              )}
                            </Stack>
                          </ClickAwayListener>
                        )}
                        <ClickAwayListener onClickAway={() => setVoucherAnchor(null)}>
                          <Stack gap={2}>
                            <Typography variant='h3'>Thêm mã giảm giá ?</Typography>
                            {voucherInfo ? (
                              <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                sx={{
                                  border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                                  p: 2,
                                  borderRadius: '10px',
                                  position: 'relative',
                                }}
                              >
                                <Divider sx={{ width: '100%' }}>
                                  <Typography variant='h4' color='primary'>
                                    {voucherInfo.title}
                                  </Typography>
                                </Divider>
                                <IconButton
                                  size='small'
                                  sx={{
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-10px',
                                    background: 'rgba(0,0,0,0.1)',
                                  }}
                                  onClick={() => setVoucherInfo(null)}
                                >
                                  <Close fontSize='small' />
                                </IconButton>
                              </Stack>
                            ) : (
                              <Stack
                                alignItems='center'
                                justifyContent='center'
                                width='100%'
                                sx={{
                                  border: `1px dashed ${grey[400]}`,
                                  p: 1,
                                  borderRadius: '10px',
                                }}
                              >
                                <Button
                                  aria-describedby='voucher-popper'
                                  variant='outlined'
                                  sx={{
                                    borderRadius: '50px',
                                    p: { md: '10px 45px', xs: '5px 35px' },
                                  }}
                                  onClick={(event) => {
                                    setVoucherAnchor(voucherAnchor ? null : event.currentTarget)
                                  }}
                                >
                                  <AddCircleOutlineRounded />
                                </Button>
                                <Popper
                                  id='voucher-popper'
                                  open={openVoucher}
                                  anchorEl={voucherAnchor}
                                  placement='top'
                                  sx={{ zIndex: 2000 }}
                                >
                                  <ModalVoucher
                                    storeId={serviceInfo.categoryId.storeId}
                                    getVoucherInfo={setVoucherInfo}
                                    closePopup={() => setVoucherAnchor(null)}
                                  />
                                </Popper>
                              </Stack>
                            )}
                          </Stack>
                        </ClickAwayListener>
                        <Divider />
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ mt: 2 }}
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
                      <Stack direction='row'>
                        <Typography variant='h3' color='secondary'>
                          Xác nhận thông tin
                        </Typography>
                      </Stack>
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
              </MainLayout>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </CustomModal>
  )
}

const MainLayout = styled(Stack)`
  overflow-y: auto;
  max-height: 65vh;
  padding: 0 10px;

  ::-webkit-scrollbar {
    display: none;
  }
`

const CustomModal = styled(Modal)`
  .MuiBackdrop-root {
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(10px);
  }
`

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
