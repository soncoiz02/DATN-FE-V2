import { Breadcrumbs, Stack, Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import UserList from '../../../sections/admin/user/UserList'

const UserManagement = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Người dùng
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách người dùng
        </Typography>
      </Stack>
      <UserList />
    </Stack>
  )
}

export default UserManagement
