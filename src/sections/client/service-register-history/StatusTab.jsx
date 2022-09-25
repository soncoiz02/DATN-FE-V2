import React from 'react'
import {
  AccessTimeFilled,
  CheckCircle,
  NotInterested,
  FilterAlt,
  Pending,
} from '@mui/icons-material'
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
} from '@mui/material'
import { green, pink, yellow } from '@mui/material/colors'

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
          <Stack direction='row' alignItems='center'>
            <MenuItem sx={{ padding: '6px 10px' }}>
              <AccessTimeFilled sx={{ color: yellow[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Đang chờ xác nhận
              </Typography>
            </MenuItem>

            <MenuItem sx={{ padding: '6px 10px' }}>
              <Pending sx={{ color: yellow[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                5
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Đã xác nhận
              </Typography>
            </MenuItem>

            <MenuItem sx={{ padding: '6px 10px' }}>
              <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Đã hoàn thành
              </Typography>
            </MenuItem>

            <MenuItem sx={{ padding: '6px 10px' }}>
              <NotInterested sx={{ color: pink[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                0
              </Typography>
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
                      <MenuItem onClick={handleClick}>
                        <Typography variant='body2'>Sắp xếp tên A-Z</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClick}>
                        <Typography variant='body2'>Sắp xếp tên Z-A</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClick}>
                        <Typography variant='body2'>Đánh giá Cao - Thấp</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClick}>
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
