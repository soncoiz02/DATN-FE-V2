import React from 'react'
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ServiceForm from '../../../sections/admin/service/ServiceForm'

const ServiceUpdate = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Link
          underline='none'
          variant='body1'
          color='GrayText'
          component={RouterLink}
          to='/admin/services-management'
        >
          Dịch vụ
        </Link>
        <Typography variant='body1' color='primary'>
          Chỉnh sửa
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Cập nhật dịch vụ
        </Typography>
      </Stack>
      {/*  */}
      <ServiceForm />
    </Stack>
  )
}

export default ServiceUpdate
