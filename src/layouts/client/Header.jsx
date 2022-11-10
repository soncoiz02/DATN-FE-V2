import { Assignment, Logout, Menu, Notifications, Person, Sms } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ClickAwayListener,
  Container,
  IconButton,
  Link,
  Popper,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useRef, useState } from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import GlassBox from '../../components/GlassBox'
import MainButton from '../../components/MainButton'
import useAuth from '../../hook/useAuth'

const Header = ({ openMenu }) => {
  const headerRef = useRef(null)
  const { isLogin, logout, userInfo } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  window.onscroll = () => {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      headerRef.current.classList.add('active')
    } else {
      headerRef.current.classList.remove('active')
    }
  }

  const handleOpenPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <HeaderWrapper ref={headerRef}>
      <Container maxWidth='xl' sx={{ height: '100%', pt: 1, pb: 1 }}>
        <Stack
          direction='row'
          sx={{ height: '100%' }}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h2'>Logo</Typography>
          <Stack direction='row' gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
            <Stack direction='row' gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <MainButton colorType='neutral' component={RouterLink} to='/auth/register'>
                Đăng ký
              </MainButton>
              <MainButton colorType='primary' component={RouterLink} to='/auth/login'>
                Đăng nhập
              </MainButton>
            </Stack>
          ) : (
            <Stack direction='row'>
              <IconButton color='primary'>
                <Sms />
              </IconButton>
              <IconButton color='primary'>
                <Notifications />
              </IconButton>
              <IconButton
                color='primary'
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={openMenu}
              >
                <Menu />
              </IconButton>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box>
                  <UserInfo onClick={handleOpenPopper} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Avatar src={userInfo.avt} />
                    <Typography variant='h6' color='white'>
                      {userInfo.name}
                    </Typography>
                  </UserInfo>
                  <Popper open={open} anchorEl={anchorEl} sx={{ zIndex: 150 }}>
                    <GlassBox opacity={0.8} sx={{ padding: '10px', borderRadius: '10px' }}>
                      <CustomLink
                        underline='none'
                        component={RouterLink}
                        to='/account-setting/account-info'
                      >
                        <Person />
                        <Typography variant='body1'>Cài đặt tài khoản</Typography>
                      </CustomLink>
                      <CustomLink
                        underline='none'
                        component={RouterLink}
                        to='service-register-history'
                      >
                        <Assignment />
                        <Typography variant='body1'>Dịch vụ đăng ký</Typography>
                      </CustomLink>
                      <CustomLink underline='none' onClick={() => logout()}>
                        <Logout />
                        <Typography variant='body1'>Đăng xuất</Typography>
                      </CustomLink>
                    </GlassBox>
                  </Popper>
                </Box>
              </ClickAwayListener>
            </Stack>
          )}
        </Stack>
      </Container>
    </HeaderWrapper>
  )
}

export const CustomLink = styled(Link)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  gap: 0 10px;
  padding: 5px 0;
  color: ${theme.palette.text.primary};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${theme.palette.primary.main};
  }
`,
)

export const UserInfo = styled(Box)(
  ({ theme }) => `
  padding: 5px 20px 5px 5px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0 10px;
  background: ${theme.palette.primary.main};
  cursor: pointer;
`,
)

const HeaderWrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: transparent;
  z-index: 50;
  transition: 0.3s;

  &.active {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 70px;
  }
`

export const StyledLink = styled(Link)(
  ({ theme }) => `
    position: relative;
    padding: 10px 25px;
    color: ${grey[800]};
    text-decoration: none;
    transition: 0.3s;
    outline: none;
    border-radius: 5px;
    
    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        border-radius: 50px;
        background: ${theme.palette.primary.main};
        bottom: 0;
        left: auto;
        right: 0;
        transition: 0.3s;
    }
    &.active {
        color: ${theme.palette.primary.main};
        &:after {
            width: 100%;
            left: 0;
            right: auto;
        }
        &:hover {
            background: none;
        }
    }
`,
)

export default Header
