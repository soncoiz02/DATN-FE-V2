import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MainButton from '../../../components/MainButton'
import ListUser from '../../../sections/admin/user/ListUser'

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
        <MainButton
          colorType='primary'
          component={RouterLink}
          to='add'
          sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
        >
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <ListUser />
    </Stack>
  )
}

export default UserManagement
