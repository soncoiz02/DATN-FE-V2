import { Home, Logout, Menu as MenuIcon, Notifications, Person } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hook/useAuth'
import getSocket from '../../utils/socket'

const socket = getSocket()

import { toast } from 'react-toastify'
import NotifySound from '../../assets/audio/notify-sound.wav'
import Notification from '../../components/Notification'

const Header = ({ onOpenMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const headerRef = useRef(null)
  const open = Boolean(anchorEl)

  const audio = useRef(null)

  const { userInfo, logout } = useAuth()

  const navigate = useNavigate()

  window.onscroll = () => {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      headerRef.current.classList.add('active')
    } else {
      headerRef.current.classList.remove('active')
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('set-client-id', socket.id)
    })
    socket.on('receive-notify', (data) => {
      toast.dark(data.content)
      audio.current.play()
    })
  }, [socket])

  return (
    <Container maxWidth='xl' sx={{ position: 'sticky', top: 0, zIndex: 60 }}>
      <audio src={NotifySound} ref={audio}></audio>
      <HeaderWrapper ref={headerRef}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={{ xs: 'space-between', md: 'flex-end' }}
        >
          <IconButton
            onClick={onOpenMenu}
            color='primary'
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction='row' gap={3} alignItems='center'>
            <Notification />
            <Avatar onClick={handleClick} sx={{ cursor: 'pointer' }} />
            <CustomMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <ListItem sx={{ pointerEvents: 'none', outline: 'none' }}>
                <Stack>
                  <Typography variant='h4' color='primary'>
                    {userInfo.name}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {userInfo?.roleId.name === 'Admin' && 'Quản trị viên'}
                    {userInfo?.roleId.name === 'Staff' && 'Nhân viên'}
                  </Typography>
                </Stack>
              </ListItem>
              <Divider />
              <MenuItem component={Link} to='/'>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <Typography variant='body2'>Trang chủ</Typography>
              </MenuItem>
              <MenuItem component={Link} to='/admin/users-management/account'>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <Typography variant='body2'>Tài khoản</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <Typography variant='body2' onClick={handleLogout}>
                  Đăng xuất
                </Typography>
              </MenuItem>
            </CustomMenu>
          </Stack>
        </Stack>
      </HeaderWrapper>
    </Container>
  )
}

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  transition: 0.3s;
  padding: 10px 0;
  &.active {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    padding: 15px;
    border-radius: 0 0 20px 20px;
    ${theme.breakpoints.down('md')} {
      padding: 10px;
    }
  }
`,
)

const CustomMenu = styled(Menu)`
  .MuiMenu-paper {
    margin-top: 10px;
    margin-right: 30px;
    min-width: 200px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(10px);
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  }
`

export default Header
