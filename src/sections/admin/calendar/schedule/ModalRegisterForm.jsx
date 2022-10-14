import { Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'
import { RHFAutoComplete } from '../../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../../components/ReactHookForm/RHFTextField'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import phoneRegExp from '../../../../utils/phoneRegExp'
import serviceApi from '../../../../api/service'
import { useState } from 'react'
import { useEffect } from 'react'

import addDate from 'date-fns/add'
import { minuteToHours } from '../../../../utils/dateFormat'
import { Close } from '@mui/icons-material'

const defaultFormValues = {
  name: '',
  phone: '',
  service: '',
  dateStart: new Date(),
  timeRange: 0,
}

const timeRange = [
  {
    key: 1,
    label: '08:00',
    id: 8,
  },
  {
    key: 2,
    label: '09:00',
    id: 9,
  },
  {
    key: 3,
    label: '10:00',
    id: 10,
  },
  {
    key: 4,
    label: '11:00',
    id: 11,
  },
  {
    key: 5,
    label: '12:00',
    id: 12,
  },
  {
    key: 6,
    label: '13:00 ',
    id: 13,
  },
  {
    key: 7,
    label: '14:00',
    id: 14,
  },
  {
    key: 8,
    label: '15:00',
    id: 15,
  },
  {
    key: 9,
    label: '16:00',
    id: 16,
  },
]

const ModalRegisterForm = ({ openModal, onCloseModal }) => {
  const [options, setOptions] = useState([])
  const [services, setServices] = useState([])

  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập họ tên'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Sai định dạng số điện thoại'),
    service: yup.string().trim().required('Vui lòng chọn dịch vụ'),
    timeRange: yup.number().required('Vui lòng chọn khung giờ'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    const serviceDuration = services.find((service) => service._id === values.service).duration
    const combineDate = new Date(values.dateStart.setHours(values.timeRange, 0, 0))
    console.log(combineDate)
    const registerData = {
      infoUser: {
        name: values.name,
        phone: values.phone,
      },
      serviceId: values.service,
      startDate: combineDate,
      endDate: addDate(combineDate, minuteToHours(serviceDuration)),
      userId: '632adebc2a74cae2c7625902',
      status: '632bc736dc2a7f68a3f383e7',
    }

    handleRegisterService(registerData)
  }

  const handleRegisterService = async (data) => {
    try {
      await serviceApi.registerService(data)
      reset(defaultFormValues)
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetServices = async () => {
    try {
      const data = await serviceApi.getAll()
      const options = data.map((service) => ({ id: service._id, label: service.name }))
      setOptions(options)
      setServices(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServices()
  }, [])

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
      >
        <GlassBox sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }} opacity={1}>
          <Stack gap={3}>
            <Typography variant='h2' color='text.secondary'>
              Đặt lịch
            </Typography>
            <IconButton sx={{ position: 'absolute', top: 20, right: 20 }} onClick={onCloseModal}>
              <Close />
            </IconButton>
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name='name' label='Họ tên' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name='phone' label='Số điện thoại' />
                </Grid>
                <Grid item xs={12}>
                  <RHFAutoComplete name='service' options={options} label='Chọn dịch vụ' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFDatePicker name='dateStart' disablePast label='Chọn ngày' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFAutoComplete name='timeRange' options={timeRange} label='Chọn khung giờ' />
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <MainButton sx={{ ml: 'auto' }} type='submit' colorType='primary'>
                      Xác nhận
                    </MainButton>
                  </Stack>
                </Grid>
              </Grid>
            </RHFProvider>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default ModalRegisterForm
