import { Breadcrumbs, Grid, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import GlassBox from '../../../../components/GlassBox'
import BestStatistic from '../../../../sections/admin/statistic/best-statistic'
import StatisticRevenue from '../../../../sections/admin/statistic/revenue'
import StatisticLineChart from '../../../../sections/admin/statistic/revenue'
import ServiceRevenue from '../../../../sections/admin/statistic/service-statistic'
import UserStatistic from '../../../../sections/admin/statistic/user-statistic'

const RevenueStatistic = () => {
  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Typography variant='body1' color='primary'>
          Thống kê
        </Typography>
      </Breadcrumbs>
      <Typography variant='h2' color='text.secondary'>
        Thông kê chung
      </Typography>
      <Grid container spacing={3} sx={{ pb: 5 }}>
        <BestStatistic />
        <Grid item xs={12} md={8}>
          <GlassBox>
            <Stack gap={1}>
              <StatisticRevenue />
            </Stack>
          </GlassBox>
        </Grid>
        <ServiceRevenue />
        <Grid item xs={12}>
          <UserStatistic />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default RevenueStatistic
