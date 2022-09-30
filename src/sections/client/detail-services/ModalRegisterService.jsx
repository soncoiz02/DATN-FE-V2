import { yupResolver } from '@hookform/resolvers/yup'
import { AccessTime, CheckCircle, Close, FileDownloadDone, Person } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
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
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import { convertNumberToHour, dateFormat, minuteToHours } from '../../../utils/dateFormat'
import phoneRegExp from '../../../utils/phoneRegExp'

import addDate from 'date-fns/add'
import { useParams } from 'react-router-dom'
import serviceApi from '../../../api/service'

const registerStep = [
  {
    key: 1,
    title: 'Thông tin người dùng',
  },
  {
    key: 2,
    title: 'Chọn khung giờ',
  },
  {
    key: 3,
    title: 'Hoàn thành',
  },
]

const defaultFormValues = {
  name: '',
  phone: '',
  date: new Date(),
}

const ModalRegisterService = ({ onCloseModal, openModal, serviceInfo }) => {
  // state
  const [activeStep, setActiveStep] = useState(1)
  const [checkedIndex, setCheckedIndex] = useState(-1)
  const [timeRange, setTimeRange] = useState()
  const [formValues, setFormValues] = useState()
  const [registerDetail, setRegisterDetail] = useState()
  const serviceId = useParams().id
  const [totalSlot, setTotalSlot] = useState([])

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
    handleGetTotalRegisteredService(serviceId, values.date)
    setActiveStep(activeStep + 1)
  }

  const handleGetTotalRegisteredService = async (id, date) => {
    try {
      const data = await serviceApi.getTotalRegisterInADay(id, date.toISOString())
      console.log(data)
      setTotalSlot(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFinalStep = () => {
    if (!timeRange?.value) return setTimeRange({ error: true, value: null })
    const { hour, minute } = convertNumberToHour(timeRange.value, 'getTime')
    const startDate = new Date(formValues.date.setHours(hour, minute, 0))
    const endDate = addDate(startDate, minuteToHours(serviceInfo.duration + 15))

    const registerData = {
      infoUser: {
        name: formValues.name,
        phone: formValues.phone,
      },
      serviceId,
      startDate,
      endDate,
      userId: '632c2a631c83d43cae12d886',
      status: '632bc736dc2a7f68a3f383e7',
    }
    handleRegisterService(registerData)
  }

  const handleRegisterService = async (registerData) => {
    try {
      const data = await serviceApi.registerService(registerData)
      setRegisterDetail(data)
      setActiveStep(activeStep + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setActiveStep(1)
    setFormValues(null)
    setTimeRange(null)
    reset(defaultFormValues)
    onCloseModal()
  }

  const handleDisableByTime = (time) => {
    const today = new Date()
    if (new Date(formValues.date).getDate() === today.getDate()) {
      if (today.getHours() > time) return true
      return false
    }
    return false
  }

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
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
                        <Typography
                          variant='subtitle1'
                          sx={{ color: (theme) => theme.palette.text.secondary }}
                        >
                          {step.title}
                        </Typography>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              <Box sx={{ mt: '30px' }}>
                {activeStep === 1 && (
                  <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={1}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <RHFTextField name='name' fullWidth label='Họ tên' />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <RHFTextField name='phone' fullWidth label='Số điện thoại' />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <RHFDatePicker name='date' label='Chọn ngày' disablePast />
                        </Grid>
                      </Grid>
                      <FormControlLabel
                        value={false}
                        control={<Checkbox />}
                        label='Đăng ký cho người khác'
                      />
                      <MainButton
                        sx={{ alignSelf: 'center', padding: '15px 85px', mt: 10 }}
                        colorType='primary'
                        type='submit'
                      >
                        Tiếp theo
                      </MainButton>
                    </Stack>
                  </RHFProvider>
                )}
                {activeStep === 2 && (
                  <Stack gap={4}>
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
                              totalSlot[index] === serviceInfo.totalStaff ||
                              handleDisableByTime(time)
                            }
                          >
                            <Typography variant='body1'>
                              {convertNumberToHour(time, 'formatTime')}
                            </Typography>
                          </MainButton>
                        </Box>
                      ))}
                    </Stack>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{ mt: { xs: 3, sm: 10 } }}
                    >
                      <MainButton
                        sx={{ border: '1px solid #e3e3e3', px: { xs: '25px', sm: '50px' } }}
                        colorType='neutral'
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Quay lại
                      </MainButton>
                      <MainButton
                        sx={{ px: { xs: '25px', sm: '50px' } }}
                        colorType='primary'
                        onClick={handleFinalStep}
                      >
                        Tiếp theo
                      </MainButton>
                    </Stack>
                  </Stack>
                )}
                {activeStep === 3 && (
                  <Stack gap={2} alignItems='center'>
                    <Stack direction='row' alignItems='center' gap={1}>
                      <CheckCircle color='secondary' />
                      <Typography variant='h3' color='secondary'>
                        Đăng ký thành công
                      </Typography>
                    </Stack>
                    {registerDetail && (
                      <Stack sx={{ width: { xs: '100%', sm: '500px' } }}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Họ tên:</Typography>
                          <Typography variant='body1'>{registerDetail.infoUser.name}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Số điện thoại:</Typography>
                          <Typography variant='body1'>{registerDetail.infoUser.phone}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Dịch vụ đăng ký: </Typography>
                          <Typography variant='body1'>{registerDetail.serviceId.name}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <Typography variant='body1'>Ngày làm dịch vụ: </Typography>
                          <Typography variant='body1'>
                            {dateFormat(new Date(registerDetail.startDate))}
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
                    <MainButton
                      sx={{ padding: '15px 85px', mt: 3 }}
                      colorType='primary'
                      onClick={handleCloseModal}
                    >
                      Hoàn thành
                    </MainButton>
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
    2: <AccessTime />,
    3: <FileDownloadDone />,
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
