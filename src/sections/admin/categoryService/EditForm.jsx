import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Modal, Grid, Typography, IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import categoryApi from '../../../api/category'
import * as yup from 'yup'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFSwitch from '../../../components/ReactHookForm/RHFSwitch'
import { Close } from '@mui/icons-material'

const defaultFormValues = {
  name: '',
  status: false,
}

const EditCategoryService = ({ openModal, onCloseModal, registerId, resetCategory, confirm }) => {
  const [categoryServiceInfo, setCategoryServiceInfo] = useState()
  const [formValues, setFormValues] = useState()

  // form schema
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập Tên danh mục'),
  })

  // react hook form
  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    if (registerId) return handleUpdateCategory(registerId, values)
  }

  const handleUpdateCategory = async (id, data) => {
    try {
      const values = await categoryApi.update(id, data)
      setFormValues(values)
      confirm()
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetCategoryServiceInfo = async (registerId) => {
    try {
      const data = await categoryApi.getOne(registerId)
      reset({
        name: data?.name,
        status: data?.status === 0 ? false : true,
      })
      setCategoryServiceInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    reset(defaultFormValues)
    onCloseModal()
    resetCategory()
  }

  useEffect(() => {
    if (registerId) handleGetCategoryServiceInfo(registerId)
  }, [registerId])

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
      >
        <GlassBox sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }} opacity={1}>
          <Stack gap={3}>
            <Typography variant='h2' color='text.secondary' margin='normal'>
              Sửa danh mục dịch vụ
            </Typography>
            <IconButton sx={{ position: 'absolute', top: 20, right: 20 }} onClick={onCloseModal}>
              <Close />
            </IconButton>
            {categoryServiceInfo && (
              <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name='name' label='Tên danh mục' />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color='text.secondary'>Trạng thái</Typography>
                    <RHFSwitch name='status' />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <MainButton sx={{ ml: 'auto' }} type='submit' colorType='primary'>
                        Lưu
                      </MainButton>
                    </Stack>
                  </Grid>
                </Grid>
              </RHFProvider>
            )}
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default EditCategoryService
