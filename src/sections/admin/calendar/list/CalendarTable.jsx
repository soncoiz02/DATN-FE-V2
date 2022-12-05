import { RemoveRedEye } from '@mui/icons-material'
import { Avatar, Chip, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import calendarApi from '../../../../api/calendar'
import DataGridCustom from '../../../../components/DataGridCustom'
import GlassBox from '../../../../components/GlassBox'
import { getStatusColor } from '../../../../utils/aboutColor'
import { dateFormat, formatDateToHour } from '../../../../utils/dateFormat'
import FilterForm from './FilterForm'
import ModalInfo from './ModalInfo'

const CalendarTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [registerId, setRegisterId] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  })

  const [rowCount, setRowCount] = useState(0)

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'infoUser',
      headerName: 'Người đặt',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.formattedValue
        return (
          <Stack>
            <Typography variant='body2'>{cellData.name}</Typography>
            <Typography variant='body2'>{cellData.phone}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'servicesRegistered',
      headerName: 'Dịch vụ',
      flex: 1,
      renderCell: (params) => {
        const cellData = params.formattedValue
        return (
          <Stack>
            {cellData.map((item) => (
              <Stack gap={1} direction='row' alignItems='center'>
                <Typography variant='body2'>{item.service.name}</Typography>
              </Stack>
            ))}
          </Stack>
        )
      },
    },
    {
      field: 'startDate',
      headerName: 'Thời gian',
      flex: isMobile ? 0 : 1,
      valueGetter: (params) => {
        const cellData = params.value
        return `${formatDateToHour(cellData.startDate)}-${formatDateToHour(
          cellData.endDate,
        )} | ${dateFormat(cellData.startDate)}`
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
      sortable: false,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={2}>
            <IconButton
              onClick={() => {
                setRegisterId(params.id)
                setOpenModal(true)
              }}
            >
              <RemoveRedEye color='secondary' />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  const handleGetServicesRegister = async () => {
    try {
      const data = await calendarApi.getListOrder(queryParams)
      setRowCount(data.total)
      const rowData = data.orders.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
        startDate: {
          startDate: item.startDate,
          endDate: item.endDate,
        },
      }))
      setRows(rowData)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (page) => {
    setIsLoading(true)
    setQueryParams({ ...queryParams, page: page + 1 })
  }

  const handleSortModelChange = (sortModel) => {
    setIsLoading(true)
    if (sortModel.length === 0) return handleGetServicesRegister()
    if (sortModel[0].field === 'infoUser') {
      return setQueryParams({
        ...queryParams,
        sortField: 'infoUser.name',
        sortOrder: sortModel[0].sort,
      })
    }
    setQueryParams({ ...queryParams, sortField: sortModel[0].field, sortOrder: sortModel[0].sort })
  }

  useEffect(() => {
    handleGetServicesRegister()
  }, [queryParams])

  return (
    <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
      <FilterForm
        currentParams={queryParams}
        setQueryParams={setQueryParams}
        onLoading={() => setIsLoading(true)}
      />
      <DataGridCustom
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={queryParams.limit}
        page={queryParams.page - 1}
        paginationMode='server'
        pagination
        rowsPerPageOptions={[queryParams.limit]}
        onPageChange={(page) => handlePageChange(page)}
        rowCount={rowCount}
        sortingMode='server'
        onSortModelChange={handleSortModelChange}
      />
      {openModal && (
        <ModalInfo
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          registerId={registerId}
        />
      )}
    </GlassBox>
  )
}

export default CalendarTable
