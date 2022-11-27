import { Assignment, Logout, Person } from '@mui/icons-material'
import { Avatar, Backdrop, Box, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import MainButton from '../../components/MainButton'
import useAuth from '../../hook/useAuth'
import { CustomLink, StyledLink, UserInfo } from './Header'

const MobileMenu = ({ closeMenu, openMenu }) => {
  const { isLogin, logout, userInfo } = useAuth()

  return (
    <Box>
      <Backdrop sx={{ zIndex: 50 }} onClick={closeMenu} open={openMenu}></Backdrop>
      <BoxMenu sx={{ zIndex: 60 }}>
        <Stack sx={{ height: '100%' }} gap={3}>
          <Typography variant='h2'>Logo</Typography>
          {isLogin && (
            <UserInfo>
              <Avatar src={userInfo.avt} />
              <Typography variant='h4' color='white'>
                {userInfo.name}
              </Typography>
            </UserInfo>
          )}
          <Stack sx={{ mt: isLogin ? 0 : 4 }} gap={1}>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/'>
              Trang chủ
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/service'>
              Dịch vụ
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/about'>
              Về chúng tôi
            </StyledLink>
          </Stack>
          {!isLogin ? (
            <Stack sx={{ mt: 'auto' }} gap={1} justifyContent='center'>
              <MainButton colorType='neutral' component={RouterLink} to='/auth/login'>
                Đăng ký
              </MainButton>
              <MainButton colorType='primary' component={RouterLink} to='/auth/login'>
                Đăng nhập
              </MainButton>
            </Stack>
          ) : (
            <Stack sx={{ mt: 'auto' }}>
              <CustomLink underline='none'>
                <Person />
                <Typography variant='body1'>Cài đặt tài khoản</Typography>
              </CustomLink>
              <CustomLink underline='none'>
                <Assignment />
                <Typography variant='body1'>Dịch vụ đăng ký</Typography>
              </CustomLink>
              <CustomLink underline='none' onClick={() => logout()}>
                <Logout />
                <Typography variant='body1'>Đăng xuất</Typography>
              </CustomLink>
            </Stack>
          )}
        </Stack>
      </BoxMenu>
    </Box>
  )
}

const BoxMenu = styled(Box)`
  width: 80%;
  height: 100vh;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
`

export default MobileMenu
