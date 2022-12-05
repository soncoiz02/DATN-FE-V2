import { Box, Stack, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginBg from '../../assets/img/login-bg.jpg'
import Toastify from '../../components/Toastify'

const AuthLayout = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Stack direction='row' height='100%'>
        <Stack
          justifyContent='center'
          alignItems='center'
          sx={{ width: { xs: '100%', md: '55%' }, px: { xs: '15px', md: '0' } }}
        >
          <Toastify />
          <Outlet />
        </Stack>
        <RightSide sx={{ display: { xs: 'none', md: 'block' } }}>
          <img src={LoginBg} alt='' />
        </RightSide>
      </Stack>
    </Box>
  )
}

const RightSide = styled(Box)`
  width: 45%;
  overflow: hidden;
  border-radius: 70px 0 0 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default AuthLayout
