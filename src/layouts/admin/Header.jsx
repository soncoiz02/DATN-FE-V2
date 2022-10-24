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
  Snackbar,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hook/useAuth'
import getSocket from '../../utils/socket'

const socket = getSocket('order')

import NotifySound from '../../assets/audio/notify-sound.wav'

const Header = ({ onOpenMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const headerRef = useRef(null)
  const open = Boolean(anchorEl)
  const [notifyMessage, setNotifyMessage] = useState('')
  const [openNotify, setOpenNotify] = useState(false)

  const audio = useRef(null)

  const { enqueueSnackbar } = useSnackbar()

  const { userInfo } = useAuth()

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

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('receive-notify', (data) => {
        setOpenNotify(true)
        setNotifyMessage(data.notifyData.content)
        audio.current.play()
        // enqueueSnackbar(data.notifyData.content, { variant: 'notify' })
      })
    })
  }, [socket])

  return (
    <Container maxWidth='xl' sx={{ position: 'sticky', top: 0, zIndex: 60 }}>
      <Snackbar
        open={openNotify}
        onClose={() => setOpenNotify(false)}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CustomNotify opacity={0.5}>
          <Stack>
            <Typography variant='h3' sx={{ color: (theme) => theme.palette.info.main }}>
              Thông báo
            </Typography>
            <Typography variant='body1'>{notifyMessage}</Typography>
          </Stack>
        </CustomNotify>
      </Snackbar>
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
            <IconButton>
              <Badge badgeContent={5} color='warning' max={99}>
                <Notifications color='primary' />
              </Badge>
            </IconButton>
            <Avatar onClick={handleClick} sx={{ cursor: 'pointer' }} />
            <CustomMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <ListItem sx={{ pointerEvents: 'none' }}>
                <Stack>
                  <Typography variant='h4' color='primary'>
                    Trần Bảo Sơn
                  </Typography>
                  <Typography variant='subtitle2'>Admin</Typography>
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
                <Typography variant='body2'>Đăng xuất</Typography>
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
    min-width: 200px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  }
`

const CustomNotify = styled(Box)(
  ({ theme }) => `
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  border-left: 5px solid ${theme.palette.info.main};
  padding: 10px 30px;
  max-width: 400px;
  min-width: 400px;
`,
)

export default Header
