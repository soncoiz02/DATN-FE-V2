import React from 'react'
import {
  CheckCircle,
  NotInterested,
  FilterAlt,
  Pending,
  AccessTimeFilled,
} from '@mui/icons-material'
import GlassBox from '../../../components/GlassBox'
import {
  Grow,
  Box,
  MenuItem,
  Stack,
  Typography,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@mui/material'
import { green, pink, yellow, red, blue } from '@mui/material/colors'

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

  const icon = [
    <AccessTimeFilled sx={{ color: yellow[600], fontSize: '20px' }} />,
    <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />,
    <NotInterested sx={{ color: red[600], fontSize: '20px' }} />,
    <Pending sx={{ color: blue[600], fontSize: '20px' }} />,
  ]

  return (
    <Box sx={{ margin: '24px 0' }}>
      <GlassBox sx={{ padding: '5px 0px', borderRadius: '10px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <MenuItem sx={{ padding: '6px 10px' }}>
              <Pending sx={{ color: blue[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Trạng Thái
              </Typography>
            </MenuItem>
            <MenuItem sx={{ padding: '6px 10px' }}>
              <AccessTimeFilled sx={{ color: yellow[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Trạng Thái
              </Typography>
            </MenuItem>
            <MenuItem sx={{ padding: '6px 10px' }}>
              <NotInterested sx={{ color: red[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Trạng Thái
              </Typography>
            </MenuItem>
            <MenuItem sx={{ padding: '6px 10px' }}>
              <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />
              <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                2
              </Typography>
              <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Trạng Thái
              </Typography>
            </MenuItem>
          </Stack>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
            size='medium'
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
    </Box>
  )
}

export default StatusTab
