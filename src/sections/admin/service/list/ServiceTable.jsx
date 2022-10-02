import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Chip,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { MoreVert, Send } from '@mui/icons-material'
import DataGridCustom from '../../../../components/DataGridCustom'
import GlassBox from '../../../../components/GlassBox'
import serviceApi from '../../../../api/service'
import formatPrice from '../../../../utils/formatPrice'

const ServiceTable = () => {
  const [rows, setRows] = useState([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleClick = () => {
    // handle menu click here

    setOpen(false)
  }

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'serviceId',
      headerName: 'Dịch vụ',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.row
        console.log('1', params)
        return (
          <Stack gap={1} direction='row' alignItems='center'>
            <Avatar variant='rounded' src={cellData.image} />
            <Typography variant='body2'>{cellData.name}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'categoryId',
      headerName: 'Danh mục',
      width: isMobile ? 120 : 140,
      valueGetter: (params) => {
        return `${params.row.categoryId.name}`
      },
    },

    {
      field: 'price',
      headerName: 'Giá tiền',
      flex: isMobile ? 0 : 1,
      valueGetter: (params) => {
        return `${formatPrice(params.row.price)}`
      },
    },
    {
      field: 'duration',
      headerName: 'Thời gian',
      flex: isMobile ? 0 : 1,
      valueGetter: (params) => {
        return `${params.row.duration} phút`
      },
    },
    {
      field: 'totalStaff',
      headerName: 'Nhân viên',
      flex: isMobile ? 0 : 1,
      valueGetter: (params) => {
        return `${params.row.totalStaff} người`
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        const cellData = params.row.status
        if (cellData === 1) return <Chip label='Đang hoạt động' color='success' />
        if (cellData === 0) return <Chip label='Chưa hoạt động' color='warning' />
        return
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: isMobile ? 0 : 1,
      renderCell: () => {
        return (
          <>
            <IconButton
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup='true'
              onClick={handleToggle}
              size='small'
            >
              <MoreVert fontSize='small' />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'left-start' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id='menu-list-grow'
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClick}>
                          <Send fontSize='small' />
                          <Typography>Chỉnh sửa</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClick}>
                          <Send fontSize='small' />
                          <Typography>Xóa</Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )
      },
    },
  ]

  const handleGetService = async () => {
    try {
      const data = await serviceApi.getAll()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
      }))
      setRows(rowData)
      console.log(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetService()
  }, [])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
      <DataGridCustom rows={rows} columns={columns} />
    </GlassBox>
  )
}

export default ServiceTable
