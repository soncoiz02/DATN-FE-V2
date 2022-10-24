import { Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFSwitch from '../../../components/ReactHookForm/RHFSwitch'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import categoryApi from '../../../api/category'

import { Close } from '@mui/icons-material'

const defaultFormValues = {
  name: '',
  status: false,
}

const ModalRegisterForm = ({ openModal, onCloseModal }) => {
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng tên danh mục'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    const registerData = {
      name: values.name,
      status: values.status,
    }

    handleRegisterCategoryService(registerData)
  }

  const handleRegisterCategoryService = async (data) => {
    try {
      await categoryApi.registerCategoryService(data)
      reset(defaultFormValues)
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
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
              Thêm danh mục dịch vụ
            </Typography>
            <IconButton sx={{ position: 'absolute', top: 20, right: 20 }} onClick={onCloseModal}>
              <Close />
            </IconButton>
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name='name' label='Tên danh mục' />
                </Grid>
                <Grid item xs={12}>
                  <RHFSwitch name='status' />
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
