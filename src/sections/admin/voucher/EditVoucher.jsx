import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Modal, Grid, Typography, IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import voucherApi from '../../../api/voucher'
import * as yup from 'yup'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import { Close } from '@mui/icons-material'

const defaultFormValues = {
  title: '',
  discount: '',
  description: '',
  startDate: Date,
  endDate: Date,
  userId: '',
  subject: '',
  isUsed: false,
}

const EditVoucher = ({ openModalEdit, onCloseModal, registerId, resetVoucher, confirm }) => {
  const [voucher, setVoucher] = useState()
  const [formValues, setFormValues] = useState()

  // form schema
  const formSchema = yup.object().shape({
    title: yup.string().trim().required('Vui lòng nhập tên voucher'),
    discount: yup.number('Giá trị phải là dạng số').required('Vui lòng nhập % giảm'),
    description: yup.string().trim().required('Vui lòng nhập mô tả'),
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
      const values = await voucherApi.update(id, data)
      setFormValues(values)
      confirm()
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetVoucher = async (registerId) => {
    try {
      const data = await voucherApi.getOne(registerId)
      reset({
        title: data?.title,
        startDate: new Date(data?.startDate),
        endDate: new Date(data?.endDate),
        discount: data?.discount,
        description: data?.description,
        isUsed: data?.isUsed,
        subject: 'mat-xa',
        userId: '634e65a857b7ea792917962d',
        storeId: '633e5ddff1be5d928b97c813',
      })
      setVoucher(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    reset(defaultFormValues)
    onCloseModal()
    resetVoucher()
  }

  useEffect(() => {
    if (registerId) handleGetVoucher(registerId)
  }, [registerId])

  return (
    <Modal open={openModalEdit} onClose={handleCloseModal}>
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
            {voucher && (
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

export default EditVoucher
