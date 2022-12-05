import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { MoreVert, Edit, Delete, Search, FilterAlt } from '@mui/icons-material'
import DataGridCustom from '../../../components/DataGridCustom'
import GlassBox from '../../../components/GlassBox'
import userApis from '../../../api/user'
import { dateFormat } from '../../../utils/dateFormat'

const UserList = () => {
  const [rows, setRows] = useState([])
  const [idService, setIdService] = useState([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenPopper = (event, id) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setIdService(id)
  }

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'serviceId',
      headerName: 'Người dùng',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack gap={1} direction='row' alignItems='center'>
            <Avatar variant='rounded' src={params.row.user.avt} />
            <Typography variant='body2'>{params.row.user.name}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: isMobile ? 120 : 140,
      renderCell: (params) => {
        return <Typography variant='body2'>{params.row.user.phone}</Typography>
      },
    },

    {
      field: 'birthday',
      headerName: 'Ngày sinh nhật',
      width: isMobile ? 120 : 140,
      renderCell: (params) => {
        return <Typography variant='body2'>{dateFormat(params.row.user.birthday)}</Typography>
      },
    },

    {
      field: 'email',
      headerName: 'Email',
      width: isMobile ? 120 : 140,
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return <Typography variant='body2'>{params.row.user.email}</Typography>
      },
    },

    {
      field: 'action',
      headerName: '',
      width: isMobile ? 50 : 80,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={(e) => handleOpenPopper(e, params.id)}>
              <MoreVert fontSize='small' />
            </IconButton>
            <Popper open={open} anchorEl={anchorEl} placement='left-start'>
              <GlassBox sx={{ padding: '3px', borderRadius: '10px', bgcolor: 'white' }}>
                <MenuItem component={Link} to={`edit/${idService}`}>
                  <Edit fontSize='small' />
                  <Typography variant='body1' sx={{ padding: '0 5px' }}>
                    Xem chi tiết
                  </Typography>
                </MenuItem>
                <MenuItem anchorEl={anchorEl}>
                  <Delete fontSize='small' color='primary' />
                  <Typography variant='body1' color='primary' sx={{ padding: '0 5px' }}>
                    Xóa
                  </Typography>
                </MenuItem>
              </GlassBox>
            </Popper>
          </>
        )
      },
    },
  ]

  const handleGetService = async () => {
    try {
      const data = await userApis.getUserOrder()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item.user._id,
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
    <GlassBox sx={{ padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
      <Grid container paddingBottom={{ md: '50px', xs: '15px' }}>
        <Grid item xs={10} md={6}>
          <form action=''>
            <GlassBox
              sx={{
                p: '5px 5px 5px 20px',
                display: 'flex',
                alignItems: 'center',
                width: 1,
                height: '50px',
                borderRadius: '10px',
              }}
            >
              <Search />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Tìm kiếm người dùng ...'
                inputProps={{ 'aria-label': 'Tìm kiếm người dùng' }}
              />
            </GlassBox>
          </form>
        </Grid>
        <Grid
          item
          xs={2}
          md={6}
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <IconButton>
            <FilterAlt fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
      <DataGridCustom rows={rows} columns={columns} />
    </GlassBox>
  )
}

export default UserList
