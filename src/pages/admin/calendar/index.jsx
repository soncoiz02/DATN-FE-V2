import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import MainButton from '../../../components/MainButton'
import Calendar from '../../../sections/admin/calendar/Calendar'

const CalendarManagement = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color={'GrayText'}>
          Dashboard
        </Link>
        <Typography variant='body1' color='primary'>
          Lịch đặt
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Quản lý lịch đặt
        </Typography>
        <MainButton colorType='primary' sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}>
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <Calendar />
    </Stack>
  )
}

export default CalendarManagement
