import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ServiceForm from '../../../sections/admin/service/ServiceForm'

const ServiceAdd = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Dịch vụ
        </Typography>
        <Typography variant='body1' color='primary'>
          Tạo mới
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Thêm mới dịch vụ
        </Typography>
      </Stack>

      {/*  */}
      <ServiceForm />
    </Stack>
  )
}

export default ServiceAdd
