import React, { useEffect, useState } from 'react'
import {
  CheckCircle,
  NotInterested,
  FilterAlt,
  Pending,
  AccessTimeFilled,
  MonetizationOn,
  Contactless,
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
import { useNavigate } from 'react-router-dom'
import orderStatusApi from '../../../api/orderStatus'
import { useDispatch, useSelector } from 'react-redux'
import { getFullList, getBySort } from '../../../redux/slice/serviceRegisterSlice'
import calendarApi from '../../../api/calendar'

const StatusTab = () => {
  const navigate = useNavigate()
  const [orderStatus, setOrderStatus] = useState([])

  const dispatch = useDispatch()

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

  const handleClick = (key, order) => {
    navigate({
      pathname: '/service-register-history',
      search: `?sort/${key}=${order}`,
    })
    dispatch(getBySort({ key, order }))
    setOpen(false)
  }

  const getOrderStatus = async () => {
    try {
      const data = await orderStatusApi.getAll()
      setOrderStatus(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetListOrder = async () => {
    try {
      const serviceBy = await calendarApi.getListOrder()
      dispatch(getFullList(serviceBy))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderStatus()
    handleGetListOrder()
  }, [])

  const icon = [
    <AccessTimeFilled sx={{ color: yellow[600], fontSize: '20px' }} />,
    <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />,
    <NotInterested sx={{ color: red[600], fontSize: '20px' }} />,
    <Pending sx={{ color: blue[600], fontSize: '20px' }} />,
    <MonetizationOn sx={{ color: green[600], fontSize: '20px' }} />,
    <Contactless sx={{ color: green[600], fontSize: '20px' }} />,
  ]

  return (
    <Box sx={{ margin: '24px 0' }}>
      <GlassBox sx={{ padding: '5px 0px', borderRadius: '10px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            {orderStatus.map((item, index) => (
              <MenuItem
                key={index}
                sx={{ padding: '6px 10px' }}
                onClick={() =>
                  navigate({
                    pathname: '/service-register-history',
                    search: `?status=${item._id}`,
                  })
                }
              >
                {icon[index]}
                <Typography variant='body2' sx={{ margin: { xs: '0px 2px', lg: '0px 5px' } }}>
                  2
                </Typography>
                <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
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
                      <MenuItem onClick={() => handleClick('name', 'asc')}>
                        <Typography variant='body2'>Sắp xếp tên A-Z</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleClick('name', 'desc')}>
                        <Typography variant='body2'>Sắp xếp tên Z-A</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleClick('time', 'asc')}>
                        <Typography variant='body2'>Gần đây</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleClick('time', 'desc')}>
                        <Typography variant='body2'>Trước đây</Typography>
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
