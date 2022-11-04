import { Notifications } from '@mui/icons-material'
import {
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItem,
  Popper,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { set } from 'date-fns'
import React, { useState } from 'react'
import { useEffect } from 'react'
import notifyApi from '../api/notify'
import useAuth from '../hook/useAuth'
import { dateFormat, formatDateToHour } from '../utils/dateFormat'
import getSocket from '../utils/socket'

const socket = getSocket()

const Notification = () => {
  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)

  const [listNotify, setListNotify] = useState([])

  const { userInfo } = useAuth()

  const handleGetNotify = async () => {
    try {
      const data = await notifyApi.getStoreNotify(userInfo.storeId)
      setListNotify(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleIsRead = (notifyId, status) => {
    if (status === 1) return
    socket.emit('update-notify-status', notifyId)
  }

  useEffect(() => {
    handleGetNotify()
    socket.on('receive-new-notify', () => {
      console.log('dsadsa')
      handleGetNotify()
    })
  }, [socket])

  return (
    <ClickAwayListener onClickAway={() => setAnchor(null)}>
      <Box>
        <IconButton onClick={(e) => setAnchor(anchor ? null : e.currentTarget)}>
          <Badge
            badgeContent={listNotify.filter((item) => !item.status).length}
            color='warning'
            max={99}
          >
            <Notifications color='primary' />
          </Badge>
        </IconButton>
        <Popper open={open} anchorEl={anchor} placement='top-end' sx={{ zIndex: 1500 }}>
          <NotifyWrapper>
            {listNotify &&
              listNotify.map((notify) => (
                <div key={notify._id}>
                  <NotifyItem onClick={() => handleIsRead(notify._id, notify.status)}>
                    <Typography variant='h4' color={!notify.status ? 'primary' : ''}>
                      Thông báo
                    </Typography>
                    <Typography variant='body2' color={!notify.status ? '' : 'text.primaryChannel'}>
                      {notify.content}
                    </Typography>
                    <Typography
                      variant='body2'
                      color={!notify.status ? '' : 'text.primaryChannel'}
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      {formatDateToHour(new Date(notify.createdAt))} -{' '}
                      {dateFormat(new Date(notify.createdAt))}
                    </Typography>
                    {!notify.status ? <Dot /> : null}
                  </NotifyItem>
                  <Divider />
                </div>
              ))}
          </NotifyWrapper>
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}

const Dot = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: 15px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${theme.palette.warning.main};
`,
)

const NotifyItem = styled(Stack)`
  position: relative;
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const NotifyWrapper = styled(Stack)(
  ({ theme }) => `
    min-width: 350px;
    max-width: 350px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(10px);
    box-shadow: 0px 5px 15px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    max-height: 400px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #e3e3e3;
    }

    ${theme.breakpoints.down('md')} {
        margin-left: 100px;
        min-width: 250px;
        max-width: 250px;
    }
`,
)

export default Notification
