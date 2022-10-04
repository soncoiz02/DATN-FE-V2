import { Breadcrumbs, Stack, Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MainButton from '../../../components/MainButton'
import ServiceTable from '../../../sections/admin/service/list/ServiceTable'

const ServiceList = () => {
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
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách dịch vụ
        </Typography>
        <MainButton colorType='primary' sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}>
          <Typography variant='h6'>Thêm +</Typography>
        </MainButton>
      </Stack>
      <ServiceTable />
    </Stack>
  )
}

export default ServiceList
