import { Breadcrumbs, Stack, Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MainButton from '../../../components/MainButton'
import ServiceTable from '../../../sections/admin/service/list/ServiceTable'
import ListStaff from '../../../sections/admin/staff/ListStaff'

const StaffManagement = () => {
  return (
    <Stack gap={2} sx={{ pb: 3 }}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Nhân viên
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách nhân viên
        </Typography>
        <MainButton
          colorType='primary'
          component={RouterLink}
          to='add'
          sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
        >
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <ListStaff />
    </Stack>
  )
}

export default StaffManagement
