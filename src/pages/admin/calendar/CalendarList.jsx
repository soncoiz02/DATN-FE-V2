import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MainButton from '../../../components/MainButton'
import CalendarTable from '../../../sections/admin/calendar/list/CalendarTable'

const CalendarList = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Lịch đặt
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách lịch đặt
        </Typography>
        <MainButton
          colorType='primary'
          sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
          onClick={() => setOpenModal(true)}
        >
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <CalendarTable />
    </Stack>
  )
}

export default CalendarList
