import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import GlassBox from '../../components/GlassBox'
import MainButton from '../../components/MainButton'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'
import * as yup from 'yup'

const Changepassword = () => {
  const onSubmit = (values) => {}
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
  const { handleSubmit } = methods
  return (
    <Container maxWidth='sm'>
      <GlassBox mt={5}>
        <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Grid style={{ width: '350px' }} m='auto'>
              <Typography variant='h3' mt={2} mb={2}>
                Mật khẩu cũ
              </Typography>
              <RHFTextField name='currentPassword' type='password' label='Nhập mật khẩu cũ' />
            </Grid>
            <Grid mt={4} style={{ width: '350px' }} m='auto'>
              <Typography variant='h3' mt={2} mb={2}>
                {' '}
                Mật khẩu mới
              </Typography>
              <RHFTextField name='newPassword' type='password' label='Nhập mật khẩu mới' />
            </Grid>
            <Grid mt={4} style={{ width: '350px' }} m='auto'>
              <Typography variant='h3' mt={2} mb={2}>
                Nhập lại mật khẩu
              </Typography>
              <RHFTextField name='newPassword' type='password' label='Nhập lại mật khẩu' />
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
      </GlassBox>
    </Container>
  )
}

export default Changepassword
