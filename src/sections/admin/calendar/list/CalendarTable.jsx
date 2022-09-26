import React, { useState } from 'react'
import GlassBox from '../../../../components/GlassBox'
import { DataGrid } from '@mui/x-data-grid'
import calendarApi from '../../../../api/calendar'
import { useEffect } from 'react'
import { useMemo } from 'react'
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { dateFormat } from '../../../../utils/dateFormat'
import ModalInfo from './ModalInfo'
import { RemoveRedEye } from '@mui/icons-material'

const CalendarTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'userId',
      headerName: 'Người đặt',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => 'Trần Bảo Sơn',
    },
    {
      field: 'serviceId',
      headerName: 'Dịch vụ',
      width: 200,
      renderCell: (params) => {
        const cellData = params.formattedValue
        return (
          <Stack gap={1} direction='row' alignItems='center'>
            <Avatar variant='rounded' src={cellData.image} />
            <Typography variant='body2'>{cellData.name}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      flex: isMobile ? 0 : 1,
      valueGetter: (params) => {
        const cellData = params.value
        const date = dateFormat(new Date(cellData.startDate))
        const timeStart = new Date(cellData.startDate).getHours()
        return `${timeStart > 9 ? timeStart + ':00' : `0${timeStart}:00`}-${date}`
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        const cellData = params.formattedValue
        return <Chip label={cellData.name} color={getStatusColor(cellData.type)} />
      },
    },
    {
      field: 'action',
      headerName: 'Hành động',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={2}>
            <IconButton onClick={() => setOpenModal(true)}>
              <RemoveRedEye />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  const getStatusColor = (type) => {
    if (type === 'pending') return 'warning'
    if (type === 'done') return 'secondary'
    if (type === 'reject') return 'primary'
    if (type === 'accepted') return 'info'
    return 'default'
  }

  const handleGetServicesRegister = async () => {
    try {
      const data = await calendarApi.getListOrder()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
        time: {
          startDate: item.startDate,
          endDate: item.endDate,
        },
      }))
      setRows(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServicesRegister()
  }, [])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
      <CustomDataGird
        rows={rows}
        columns={columns}
        pageSize={20}
        localeText={{
          errorOverlayDefaultLabel: 'Đã có lỗi xảy ra',
          noResultsOverlayLabel: 'Không có dữ liệu',
          columnMenuLabel: 'Danh sách',
          columnMenuShowColumns: 'Hiển thị các cột',
          columnMenuFilter: 'Lọc',
          columnMenuHideColumn: 'Ẩn',
          columnMenuUnsort: 'Hủy sắp xếp',
          columnMenuSortAsc: 'Sắp xếp trước - sau',
          columnMenuSortDesc: 'Sắp xếp sau - trước',
          columnsPanelShowAllButton: 'Hiện tất cả',
          columnsPanelHideAllButton: 'Ẩn tất cả',
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} trên ${totalCount.toLocaleString()}`,
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} hàng đã chọn`
              : `${count.toLocaleString()} hàng đã chọn`,
        }}
      />
      <ModalInfo openModal={openModal} onCloseModal={() => setOpenModal(false)} />
    </GlassBox>
  )
}

const CustomDataGird = styled(DataGrid)`
  border: none;

  .MuiDataGrid-columnHeaders {
    background: #ceedff;
    border: none;
    border-radius: 10px;
  }

  .MuiDataGrid-virtualScroller {
    margin-top: 65px !important;
  }

  .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-cell:focus {
    outline: none;
  }

  .MuiDataGrid-columnHeader:focus-within,
  .MuiDataGrid-cell:focus-within {
    outline: none;
  }

  .MuiDataGrid-columnHeaderTitle {
    color: #494949;
    font-weight: 700;
  }

  .MuiDataGrid-cell {
    border: none;
  }

  .MuiDataGrid-row {
    margin: 5px 0;
  }
`

export default CalendarTable
