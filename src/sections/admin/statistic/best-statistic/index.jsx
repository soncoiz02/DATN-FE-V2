import { AutoGraph } from '@mui/icons-material'
import { Avatar, Grid, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import statisticApi from '../../../../api/statistic'
import GlassBox from '../../../../components/GlassBox'
import ServiceSkeleton from '../../../../components/skeleton/ServiceSkeleton'
import formatPrice from '../../../../utils/formatPrice'

const BestStatistic = () => {
  const [bestStatistic, setBestStatistic] = useState()
  const [loading, setLoading] = useState(true)

  const getBestStatistic = useCallback(() => handleGetBestStatistic(), [])
  const handleGetBestStatistic = async () => {
    try {
      const data = await statisticApi.getBestStatistic()
      setBestStatistic(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBestStatistic()
  }, [])
  return (
    <>
      <Grid item xs={12} md={4}>
        <GlassBox>
          <Stack gap={1}>
            <Typography variant='h3'>Tổng doanh thu</Typography>
            <AutoGraph sx={{ fontSize: '45px' }} color='secondary' />
            {loading ? (
              <Skeleton width='100%' height={20} />
            ) : (
              <Typography variant='h2' color='primary'>
                {formatPrice(bestStatistic?.totalRevenue)}
              </Typography>
            )}
          </Stack>
        </GlassBox>
      </Grid>
      <Grid item xs={12} md={4}>
        <GlassBox>
          <Stack gap={1}>
            <Typography variant='h3'>Dịch vụ doanh thu cao nhất</Typography>
            <Stack gap={1}>
              {loading ? (
                <ServiceSkeleton />
              ) : (
                <Stack gap={1} direction='row' alignItems='center'>
                  <Avatar
                    src={bestStatistic?.maxPriceService.service.image}
                    sx={{ width: '50px', height: '50px' }}
                  />
                  <Typography variant='h2' color='text.secondary'>
                    {bestStatistic?.maxPriceService.service.name}
                  </Typography>
                </Stack>
              )}
              {loading ? (
                <Skeleton width='100%' height={20} />
              ) : (
                <Typography variant='h2' color='primary'>
                  {formatPrice(bestStatistic?.maxPriceService.total)}
                </Typography>
              )}
            </Stack>
          </Stack>
        </GlassBox>
      </Grid>
      <Grid item xs={12} md={4}>
        <GlassBox>
          <Stack gap={1}>
            <Typography variant='h3'>Dịch vụ sử dụng nhiều nhất</Typography>
            <Stack gap={1}>
              {loading ? (
                <ServiceSkeleton />
              ) : (
                <Stack gap={1} direction='row' alignItems='center'>
                  <Avatar
                    src={bestStatistic?.maxUsedService.service.image}
                    sx={{ width: '50px', height: '50px' }}
                  />
                  <Typography variant='h2' color='text.secondary'>
                    {bestStatistic?.maxUsedService.service.name}
                  </Typography>
                </Stack>
              )}
              {loading ? (
                <Skeleton width='100%' height={20} />
              ) : (
                <Typography variant='h2' color='primary'>
                  Số lượng: {bestStatistic?.maxUsedService.countUsed} lần
                </Typography>
              )}
            </Stack>
          </Stack>
        </GlassBox>
      </Grid>
    </>
  )
}

export default BestStatistic
