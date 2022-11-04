import React from 'react'
import { Typography, Breadcrumbs, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ListServices from '../../../sections/admin/services-statistic/ListServices'
import SummaryStatistic from '../../../sections/admin/services-statistic/SummaryStatistic'

const ServiceStatistic = () => {
  return (
    <>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='GrayText'>
          Thống kê
        </Typography>
        <Typography variant='body1' color='primary'>
          Dịch vụ
        </Typography>
      </Breadcrumbs>
      <SummaryStatistic />
      <ListServices />
    </>
  )
}

export default ServiceStatistic
