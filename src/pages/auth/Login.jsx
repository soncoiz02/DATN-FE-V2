import { Avatar, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RHFCheckBox from '../../components/ReactHookForm/RHFCheckBox'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'

import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MainButton from '../../components/MainButton'

import Logo from '../../assets/img/logo.png'
import authApi from '../../api/auth'
import { useCookies } from 'react-cookie'
import useAuth from '../../hook/useAuth'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const loginSchema = yup.object().shape({
    username: yup.string().trim().required('Vui lòng nhập tên đăng nhập'),
    password: yup
      .string()
      .trim()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu có ít nhất 6 ký tự'),
  })

  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
      keepLogin: false,
    },
    resolver: yupResolver(loginSchema),
  })

  const { handleSubmit, setError } = methods

  const onSubmit = (values) => {
    handleLogin({ username: values.username, password: values.password })
  }

  const handleLogin = async (loginData) => {
    try {
      const data = await authApi.login(loginData)
      login(data.token, data.user)
      if (data.user.roleId.name === 'Admin') return navigate('/admin/dashboard')
      navigate('/')
    } catch (error) {
      const errorMessage = error.response?.data.message
      const errorField = error.response?.data.field
      if (errorField === 'username') return setError('username', { message: errorMessage })
      if (errorField === 'password') return setError('password', { message: errorMessage })
    }
  }

  return (
    <Stack gap={4} sx={{ width: { xs: '100%', sm: '400px' } }} alignItems='center'>
      <Avatar src={Logo} sx={{ width: '70px', height: '70px' }} />
      <Stack>
        <Typography variant='h2' align='center'>
          Đăng Nhập
        </Typography>
        <Typography variant='body1' mt={1} align='center'>
          Nhập thông tin tài khoản của bạn
        </Typography>
      </Stack>
      <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} alignItems='center'>
          <RHFTextField label='Nhập tên đăng nhập' name='username' />
          <RHFTextField label='Nhập mật khẩu' name='password' type='password' />
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ width: '100%' }}
          >
            <RHFCheckBox name='keepLogin' label='Duy trì đăng nhập' />
            <Link to='/auth/forgot-password' component={RouterLink} underline='none'>
              Quên mật khẩu
            </Link>
          </Stack>
          <MainButton
            colorType='primary'
            type='submit'
            sx={{ borderRadius: '50px', mt: 2, px: '45px', py: '10px' }}
          >
            Đăng nhập
          </MainButton>
          <Typography mt={3} color={'gray'}>
            Bạn chưa có tài khoản?{' '}
            <Link underline='none' component={RouterLink} to='/auth/register'>
              {' '}
              Đăng ký ngay
            </Link>
          </Typography>
        </Stack>
      </RHFProvider>
    </Stack>
  )
}

export default Login
