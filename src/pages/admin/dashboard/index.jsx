import { Equalizer, PieChart, TrendingUp } from '@mui/icons-material'
import { Box, Card, Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

import { useEffect, useState } from 'react'
import statisticApi from '../../../api/statistic'
import GlassBox from '../../../components/GlassBox'
import StatisticRevenue from '../../../sections/admin/statistic/revenue'
import formatPrice from '../../../utils/formatPrice'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [dashboardStatistic, setDashboardStatistic] = useState()

  const handleGetDashBoardStatisitc = async () => {
    try {
      const data = await statisticApi.getDashboardStatistic()
      setDashboardStatistic(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetDashBoardStatisitc()
  }, [])

  return (
    <Stack gap={2}>
      <Box sx={{ flexGrow: 1, marginTop: '63px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 1,
                borderRadius: '20px',
                boxShadow:
                  '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                minHeight: 1,
                display: { xs: 'flex', sm: 'block' },
                flexDirection: { xs: 'column', sm: 'none' },
                justifyContent: { xs: 'space-between' },
                padding: '20px',
              }}
            >
              <Stack
                direction={{ xs: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'center' }}
              >
                <Typography variant='h3' color='text.secondary'>
                  Tổng doanh thu
                </Typography>
                <IconButton>
                  <Equalizer
                    sx={{
                      color: '#2FA2F5',
                      width: { xs: '30px', sm: '35px' },
                      height: { xs: '30px', sm: '35px' },
                    }}
                  />
                </IconButton>
              </Stack>
              <Typography
                variant='h2'
                color='primary'
                sx={{ marginTop: '9px', lineHeight: '32.63px' }}
              >
                {loading ? (
                  <Skeleton width={150} height={20} />
                ) : (
                  formatPrice(dashboardStatistic.totalRevenue)
                )}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 1,
                borderRadius: '20px',
                boxShadow:
                  '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                minHeight: 1,
                display: { xs: 'flex', sm: 'block' },
                flexDirection: { xs: 'column', sm: 'none' },
                justifyContent: { xs: 'space-between' },
                padding: '20px',
              }}
            >
              <Stack
                direction={{ xs: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'center' }}
              >
                <Typography variant='h3' color='text.secondary'>
                  Tổng số lịch đặt
                </Typography>
                <IconButton>
                  <TrendingUp
                    sx={{
                      color: '#FF9900',
                      width: { xs: '30px', sm: '35px' },
                      height: { xs: '30px', sm: '35px' },
                    }}
                  />
                </IconButton>
              </Stack>
              <Typography
                variant='h2'
                color='primary'
                sx={{ marginTop: '9px', lineHeight: '32.63px' }}
              >
                {loading ? <Skeleton width={150} height={20} /> : dashboardStatistic.totalOrder}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 1,
                borderRadius: '20px',
                boxShadow:
                  '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                minHeight: 1,
                display: { xs: 'flex', sm: 'block' },
                flexDirection: { xs: 'column', sm: 'none' },
                justifyContent: { xs: 'space-between' },
                padding: '20px',
              }}
            >
              <Stack
                direction={{ xs: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'center' }}
              >
                <Typography variant='h3' color='text.secondary'>
                  Tổng số người dùng
                </Typography>
                <IconButton>
                  <PieChart
                    sx={{
                      color: '#27BD2D',
                      width: { xs: '30px', sm: '35px' },
                      height: { xs: '30px', sm: '35px' },
                    }}
                  />
                </IconButton>
              </Stack>
              <Typography
                variant='h2'
                color='primary'
                sx={{ marginTop: '9px', lineHeight: '32.63px' }}
              >
                {loading ? <Skeleton width={150} height={20} /> : dashboardStatistic.totalUser}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <GlassBox>
        <StatisticRevenue />
      </GlassBox>
    </Stack>
  )
}

export default Dashboard
