import { RemoveRedEye } from '@mui/icons-material'
import { Avatar, Chip, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import calendarApi from '../../../../api/calendar'
import DataGridCustom from '../../../../components/DataGridCustom'
import GlassBox from '../../../../components/GlassBox'
import { getStatusColor } from '../../../../utils/aboutColor'
import { dateFormat } from '../../../../utils/dateFormat'
import ModalInfo from './ModalInfo'

const CalendarTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [registerId, setRegisterId] = useState()

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
      valueGetter: (params) => {
        return `${params.value.name} + ${params.value.phone}`
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
                <Avatar variant='rounded' src={item.service.image} />
                <Typography variant='body2'>{item.service.name}</Typography>
              </Stack>
            ))}
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
      <DataGridCustom rows={rows} columns={columns} />
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
