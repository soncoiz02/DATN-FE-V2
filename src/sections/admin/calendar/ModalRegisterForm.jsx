import { Container, Grid, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFAutoComplete from '../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import phoneRegExp from '../../../utils/phoneRegExp'

const defaultFormValues = {
  name: '',
  phone: '',
  service: '',
  dateStart: new Date(),
  timeRange: '',
}

const options = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
]

const timeRange = [
  {
    key: 1,
    label: '08:00 - 09:00',
  },
  {
    key: 2,
    label: '09:00 - 10:00',
  },
  {
    key: 3,
    label: '10:00 - 11:00',
  },
  {
    key: 4,
    label: '12:00 - 13:00',
  },
  {
    key: 5,
    label: '14:00 - 15:00',
  },
]

const ModalRegisterForm = ({ openModal, onCloseModal }) => {
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập họ tên'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Sai định dạng số điện thoại'),
    service: yup.string().trim().required('Vui lòng chọn dịch vụ'),
    timeRange: yup.string().trim().required('Vui lòng chọn khung giờ'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit } = methods

  const onSubmit = (values) => {
    console.log(values)
  }

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
