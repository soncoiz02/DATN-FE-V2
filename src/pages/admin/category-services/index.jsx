import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Stack, Typography, Breadcrumbs, Link } from '@mui/material'
import CategoryServicesTable from '../../../sections/admin/categoryService/CategoryServiceTable'

const CategoryServices = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Danh mục dịch vụ
        </Typography>
        <Typography variant='body1' color='primary'>
          Danh sách
        </Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h2' color='text.secondary'>
          Danh sách Danh mục dịch vụ
        </Typography>
      </Stack>
      <CategoryServicesTable />
    </Stack>
  )
}

export default CategoryServices
