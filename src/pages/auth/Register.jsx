import { Alert, Avatar, Grid, Link, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MainButton from '../../components/MainButton'
import Logo from '../../assets/img/logo.png'
import authApi from '../../api/auth'
import useAuth from '../../hook/useAuth'

function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Vui lòng nhập username đăng nhập')
      .min(6, 'Tên có ít nhất 6 ký tự')
      .max(12, 'Tên có tối đa 12 ký tự'),
    name: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên đăng nhập')
      .min(5, 'Tên có ít nhất 5 ký tự')
      .matches(
        /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
        'Tên không hợp lệ',
      ),
    email: yup
      .string()
      .trim()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Vui lòng nhập email đăng nhập'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),

    password: yup
      .string()
      .trim()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
        'Tối thiểu 6 ký tự,tối đa 15 ký tự, ít nhất một chữ hoa, một chữ thường và một số:',
      ),
    confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  })
  confirm
  const methods = useForm({
    defaultValues: {
      username: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  })
  const { handleSubmit, setError } = methods
  const onSubmit = (values) => {
    handeleRegister({
      username: values.username,
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
  }
  const handeleRegister = async (registerData) => {
    try {
      const data = await authApi.register(registerData)
      login(data.token, data.user)
      console.log(data)
      setOpen(true)
      const timer = setTimeout(() => {
        navigate('/auth/login')
      }, 3000)
      timer()
    } catch (error) {
      const errorMessage = error.response?.data.message
      const errorField = error.response?.data.field
      if (errorField === 'username') return setError('username', { message: errorMessage })
      if (errorField === 'email') return setError('email', { message: errorMessage })
    }
  }
  return (
    <Stack gap={4} sx={{ width: { xs: '100%', sm: '560px' } }} alignItems='center'>
      <Avatar src={Logo} sx={{ width: '70px', height: '70px' }} />
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity='success'>Bạn đã đăng ký thành công</Alert>
      </Snackbar>
      <Stack>
        <Typography variant='h2' align='center'>
          Đăng Ký
        </Typography>
        <Typography variant='body1' mt={1} align='center'>
          Nhập thông tin tài khoản của bạn
        </Typography>
      </Stack>
      <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} alignItems='center'>
          <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 6, md: 12 }}>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Tên đăng nhập' name='username' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Họ và tên' name='name' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Nhập tên email' name='email' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Nhập số điện thoại' name='phone' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Nhập mật khẩu' name='password' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField label='Nhập lại mật khẩu' name='confirmPassword' type='password' />
            </Grid>
          </Grid>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ width: '100%' }}
          ></Stack>
          <MainButton
            colorType='primary'
            type='submit'
            sx={{ borderRadius: '50px', px: '45px', py: '10px' }}
          >
            Đăng Ký
          </MainButton>
          <Typography mt={3} color={'gray'}>
            Bạn đã có tài khoản?{' '}
            <Link underline='none' component={RouterLink} to='/auth/login'>
              {' '}
              Đăng nhập
            </Link>
          </Typography>
        </Stack>
      </RHFProvider>
    </Stack>
  )
}

export default Register
