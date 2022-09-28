import { Backdrop, Box, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import MainButton from '../../components/MainButton'
import { StyledLink } from './Header'

const MobileMenu = ({ closeMenu, openMenu }) => {
  return (
    <>
      <Backdrop sx={{ zIndex: 50 }} onClick={closeMenu} open={openMenu}></Backdrop>
      <BoxMenu sx={{ zIndex: 60 }}>
        <Stack sx={{ height: '100%' }} gap={3}>
          <Typography variant='h2'>Logo</Typography>
          <Stack sx={{ mt: 4 }} gap={1}>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/'>
              Trang chủ
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/store'>
              Cửa hàng
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/about'>
              Về chúng tôi
            </StyledLink>
          </Stack>
          <Stack sx={{ mt: 'auto' }} gap={1} justifyContent='center'>
            <MainButton colorType='neutral' component={RouterLink} to='/login'>
              Đăng ký
            </MainButton>
            <MainButton colorType='primary' component={RouterLink} to='/login'>
              Đăng nhập
            </MainButton>
          </Stack>
        </Stack>
      </BoxMenu>
    </>
  )
}

const BoxMenu = styled(Box)`
  width: 80%;
  height: 100vh;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
`

export default MobileMenu
