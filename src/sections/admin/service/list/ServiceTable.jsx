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
import DataGridCustom from '../../../../components/DataGridCustom'
import GlassBox from '../../../../components/GlassBox'
import serviceApi from '../../../../api/service'
import formatPrice from '../../../../utils/formatPrice'

const ServiceTable = () => {
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
      headerName: 'Dịch vụ',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.row
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
        console.log(params)
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
      width: isMobile ? 120 : 160,
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
                    Chỉnh sửa
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
      const data = await serviceApi.getAll()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
      }))
      setRows(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetService()
  }, [])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
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
                placeholder='Tìm kiếm dịch vụ ...'
                inputProps={{ 'aria-label': 'Tìm kiếm dịch vụ' }}
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

export default ServiceTable
