import { Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import voucherApi from '../../../api/voucher'
import userApis from '../../../api/user'

import { useState } from 'react'
import { useEffect } from 'react'

import { Close } from '@mui/icons-material'

const defaultFormValues = {
  title: '',
  discount: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  userId: '',
  subject: '',
  isUsed: false,
}

const ModalRegisterForm = ({ openModal, onCloseModal }) => {
  const [options, setOptions] = useState([])
  const [user, setUser] = useState([])

  const formSchema = yup.object().shape({
    title: yup.string().trim().required('Vui lòng nhập tên voucher'),
    discount: yup.number('Giá trị phải là dạng số').required('Vui lòng nhập % giảm'),
    description: yup.string().trim().required('Vui lòng nhập mô tả'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    const registerData = {
      title: values.title,
      discount: values.discount,
      description: values.description,
      isUsed: false,
      startDate: new Date(values.startDate),
      subject: 'mat-xa',
      endDate: new Date(values.endDate),
      userId: '634e65a857b7ea792917962d',
      storeId: '633e5ddff1be5d928b97c813',
    }
    handleRegisterUser(registerData)
  }

  const handleRegisterUser = async (data) => {
    try {
      await voucherApi.create(data)
      reset(defaultFormValues)
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetUser = async () => {
    try {
      const data = await userApis.listUser()
      const options = data.map((user) => ({ id: user._id, label: user.name }))
      setOptions(options)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetUser()
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
              Thêm danh mục dịch vụ
            </Typography>
            <IconButton sx={{ position: 'absolute', top: 20, right: 20 }} onClick={onCloseModal}>
              <Close />
            </IconButton>
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name='title' label='Tên voucher' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name='discount' label='Giảm (%)' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFDatePicker name='startDate' disablePast label='Ngày bắt đầu' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFDatePicker name='endDate' disablePast label='Ngày kết thúc' />
                </Grid>
                <Grid item sm={12}>
                  <RHFTextField name='description' multiline rows={4} label='Mô tả' />
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <MainButton sx={{ ml: 'auto' }} type='submit' colorType='primary'>
                      Thêm
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
