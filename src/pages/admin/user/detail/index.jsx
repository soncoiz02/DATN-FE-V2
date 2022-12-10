import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import DetailUserSection from '../../../../sections/admin/user/detail'

const DetailUser = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Người dùng
        </Typography>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/users-management'>
          Danh sách
        </Link>
        <Typography variant='body1' color='primary'>
          Chi tiết
        </Typography>
      </Breadcrumbs>
      <Typography variant='h2' color='text.secondary'>
        Chi tiết về người dùng
      </Typography>
      <DetailUserSection />
    </Stack>
  )
}

export default DetailUser
