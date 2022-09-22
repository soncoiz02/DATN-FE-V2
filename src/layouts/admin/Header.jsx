import { Home, Logout, Notifications, Person, Menu as MenuIcon } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Button,
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
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ onOpenMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Container maxWidth='xl' sx={{ py: 2 }}>
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
    </Container>
  )
}

const CustomMenu = styled(Menu)`
  .MuiMenu-paper {
    margin-top: 10px;
    min-width: 200px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  }
`

export default Header
