import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import GlassBox from '../../components/GlassBox'
import MainButton from '../../components/MainButton'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'
import * as yup from 'yup'
import useAuth from '../../hook/useAuth'
import userApis from '../../api/user'
import { useState } from 'react'
import ModalGetVerifyCode from './ModalGetVerifyCode'

const Changepassword = () => {
  const { token, logout } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const [passwordData, setPasswordData] = useState('')

  const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().trim().required('Vui lòng nhập mật khẩu hiện tại'),
    newPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập mật khẩu mới')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
        'Tối thiểu 6 ký tự,tối đa 15 ký tự, ít nhất một chữ hoa, một chữ thường và một số:',
      ),
    newPasswordRepeated: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu mới')
      .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
  })
  const methods = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordRepeated: '',
    },
    resolver: yupResolver(changePasswordSchema),
  })
  const { handleSubmit, setError } = methods

  const onSubmit = (values) => {
    setPasswordData({ ...values })
    setOpenModal(true)
  }

  const handleChangePassword = async (passwordData) => {
    try {
      const data = await userApis.changePassword(passwordData, token)
      if (data.success) {
        logout()
      }
    } catch (error) {
      const errrorMessage = error.response.data.message
      setError('currentPassword', { message: errrorMessage }, { shouldFocus: true })
    }
  }

  return (
    <Container maxWidth='sm' sx={{ py: '30px' }}>
      <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid style={{ width: '350px' }} m='auto'>
            <Typography variant='h3' mt={2} mb={2}>
              Mật khẩu hiện tại
            </Typography>
            <RHFTextField name='currentPassword' type='password' label='Nhập mật khẩu hiện tại' />
          </Grid>
          <Grid mt={4} style={{ width: '350px' }} m='auto'>
            <Typography variant='h3' mt={2} mb={2}>
              Mật khẩu mới
            </Typography>
            <RHFTextField name='newPassword' type='password' label='Nhập mật khẩu mới' />
          </Grid>
          <Grid mt={4} style={{ width: '350px' }} m='auto'>
            <Typography variant='h3' mt={2} mb={2}>
              Nhập lại mật khẩu
            </Typography>
            <RHFTextField name='newPasswordRepeated' type='password' label='Nhập lại mật khẩu' />
          </Grid>
          <Grid mt={3}>
            <Stack>
              <MainButton sx={{ m: 'auto' }} type='submit' colorType='primary'>
                Cập Nhật
              </MainButton>
            </Stack>
          </Grid>
        </Grid>
      </RHFProvider>
      {openModal && (
        <ModalGetVerifyCode
          open={openModal}
          onClose={() => setOpenModal(false)}
          changePassword={() => handleChangePassword(passwordData)}
        />
      )}
    </Container>
  )
}

export default Changepassword
