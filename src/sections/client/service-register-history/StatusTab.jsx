import React from 'react'
import { Menu as MenuIcon, CheckCircle, NotInterested, FilterAlt } from '@mui/icons-material'
import GlassBox from '../../../components/GlassBox'
import {
  Grow,
  Box,
  MenuItem,
  Stack,
  styled,
  Typography,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  ListItemIcon,
} from '@mui/material'
import { green, pink, yellow } from '@mui/material/colors'
import { Link } from 'react-router-dom'

const StatusTab = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <BoxStatus>
      <GlassBox sx={{ padding: '5px 0px', borderRadius: '10px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' gap={2} alignItems='center'>
            <MenuItem component={Link} to='service-register-history?filter=no-complete-service'>
              <ListItemIcon>
                <MenuIcon sx={{ color: yellow[600], fontSize: '20px' }} />
              </ListItemIcon>
              <Typography variant='body2'>5</Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Chưa hoàn thành
              </Typography>
            </MenuItem>

            <MenuItem component={Link} to='service-register-history?filter=done-complete-service'>
              <ListItemIcon>
                <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />
              </ListItemIcon>
              <Typography variant='body2'>2</Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Đã hoàn thành
              </Typography>
            </MenuItem>

            <MenuItem component={Link} to='service-register-history?filter=cancel-service'>
              <ListItemIcon>
                <NotInterested sx={{ color: pink[600], fontSize: '20px' }} />
              </ListItemIcon>
              <Typography variant='body2'>0</Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Đã hủy
              </Typography>
            </MenuItem>
          </Stack>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
            size='large'
          >
            <FilterAlt sx={{ color: pink[600] }} />
          </IconButton>
          <Popper open={open} anchorEl={anchorRef.current} transition placement='bottom-start'>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                        <Typography variant='body2'>Sắp xếp tên A-Z</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant='body2'>Sắp xếp tên Z-A</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant='body2'>Đánh giá Cao - Thấp</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant='body2'>Đánh giá Thấp - Cao</Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Stack>
      </GlassBox>
    </BoxStatus>
  )
}

const BoxStatus = styled(Box)`
  margin: 24px;
`

export default StatusTab
