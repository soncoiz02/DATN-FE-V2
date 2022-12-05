import { Avatar, Input, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import MainButton from '../../components/MainButton'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'
import Logo from '../../assets/img/logo.png'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import userApis from '../../api/user'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [verifyCode, setVerifyCode] = useState()
  const [verifyValue, setVerifyValue] = useState('')
  const [countDown, setCountDown] = useState(60)
  const [isVerify, setIsVerify] = useState(false)
  const navigate = useNavigate()

  const resetPasswordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập mật khẩu mới')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
        'Tối thiểu 6 ký tự,tối đa 15 ký tự, ít nhất một chữ hoa, một chữ thường và một số:',
      ),
    confirmPassword: yup
      .string()
      .trim()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
  })

  const emailSchema = yup.object().shape({
    email: yup.string().trim().required('Vui lòng nhập email').email('Sai định dạng email'),
  })

  const resetPasswordMethods = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  })

  const emailMethods = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(emailSchema),
  })

  const onSubmit = (values) => {
    handleVerifyEmail(values)
  }

  const onSubmitResetPassword = (values) => {
    const resetData = {
      newPassword: values.newPassword,
      email: emailMethods.getValues('email'),
    }
    handleChangePassword(resetData)
  }

  const handleVerifyEmail = async (email) => {
    try {
      const data = await userApis.verifyEmail(email)
      setVerifyCode(data)
    } catch (error) {
      emailMethods.setError('email', {
        message: error.response.data.message,
      })
    }
  }

  const handleChangePassword = async (resetData) => {
    try {
      const data = await userApis.resetPassword(resetData)
      toast.dark('Đổi mật khẩu thành công')
      navigate('/auth/login')
    } catch (error) {
      toast.dark('Đổi mật khẩu mới thất bại')
    }
  }

  const handleVerifyCode = () => {
    if (+verifyValue !== +verifyCode) {
      return toast.dark('Sai mã xác nhận')
    }
    if (countDown === 0) {
      return toast.dark('Mã xác nhận đã hết hạn')
    }
    setIsVerify(true)
  }

  useEffect(() => {
    let interval
    if (verifyCode) {
      interval = setInterval(() => {
        setCountDown(countDown - 1)
      }, 1000)

      if (countDown === 0) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [verifyCode, countDown])

  return (
    <Stack gap={4} sx={{ width: { xs: '100%', sm: '400px' } }} alignItems='center'>
      <Avatar src={Logo} sx={{ width: '70px', height: '70px' }} />
      <Stack>
        <Typography variant='h2' align='center'>
          Quên mật khẩu
        </Typography>
        <Typography variant='body1' mt={1} align='center'>
          Nhập email đăng ký
        </Typography>
      </Stack>
      {!verifyCode ? (
        <RHFProvider methods={emailMethods} onSubmit={emailMethods.handleSubmit(onSubmit)}>
          <Stack gap={2} alignItems='center'>
            <RHFTextField label='Email' name='email' />
            <MainButton
              colorType='primary'
              type='submit'
              sx={{ borderRadius: '50px', mt: 2, px: '45px', py: '10px' }}
            >
              Đăng nhập
            </MainButton>
          </Stack>
        </RHFProvider>
      ) : (
        <Stack gap={2}>
          <Typography variant='h2'>Mã xác nhận đã được gửi về email của bạn</Typography>
          <Input
            placeholder='Nhập mã xác nhận'
            value={verifyValue}
            onChange={(e) => setVerifyValue(e.target.value)}
          />
          <Stack>
            <Stack direction='row'>
              <Typography variant='body2'>Mã xác nhận hết hạn trong:</Typography>
              <Typography variant='body2' color='primary' ml={1}>
                {countDown}s
              </Typography>
            </Stack>
            <Stack direction='row'>
              <Typography variant='body2'>Bạn chưa nhận được mã? </Typography>
              <Typography
                variant='body2'
                color='primary'
                ml={1}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  handleVerifyEmail({ email: emailMethods.getValues('email') })
                  setCountDown(60)
                }}
              >
                Gửi lại
              </Typography>
            </Stack>
          </Stack>
          <MainButton colorType='primary' disabled={!verifyValue} onClick={handleVerifyCode}>
            Xác nhận
          </MainButton>
        </Stack>
      )}
      {isVerify && (
        <RHFProvider
          methods={resetPasswordMethods}
          onSubmit={resetPasswordMethods.handleSubmit(onSubmitResetPassword)}
        >
          <Stack gap={2} alignItems='center'>
            <RHFTextField label='Mật khẩu mới' name='newPassword' type='password' />
            <RHFTextField label='Nhập lại mật khẩu' name='confirmPassword' type='password' />
            <MainButton
              colorType='primary'
              type='submit'
              sx={{ borderRadius: '50px', mt: 2, px: '45px', py: '10px' }}
            >
              Đăng nhập
            </MainButton>
          </Stack>
        </RHFProvider>
      )}
    </Stack>
  )
}

export default ForgotPassword
