import React from 'react'
import { Box, IconButton, Grid, Typography, Card, Stack } from '@mui/material'
import { ArrowUpward, Equalizer, PieChart, TrendingUp } from '@mui/icons-material'

const Dashboard = () => {
  return (
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
              <Typography variant='body2' color='text.secondary'>
                Doanh thu tuần này
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
              color='text.secondary'
              sx={{ marginTop: '9px', lineHeight: '32.63px' }}
            >
              12,315,000 VNĐ
            </Typography>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ display: 'flex', justifyContent: 'end', color: '#229B16', marginTop: '8px' }}
            >
              12% <ArrowUpward />
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
              <Typography variant='body2' color='text.secondary'>
                Tổng dịch vụ được đăng ký
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
              color='text.secondary'
              sx={{ marginTop: '9px', lineHeight: '32.63px' }}
            >
              50
            </Typography>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ display: 'flex', justifyContent: 'end', color: '#229B16', marginTop: '8px' }}
            >
              12% <ArrowUpward />
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
              <Typography variant='body2' color='text.secondary'>
                Số người dùng mới
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
              color='text.secondary'
              sx={{ marginTop: '9px', lineHeight: '32.63px' }}
            >
              12
            </Typography>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ display: 'flex', justifyContent: 'end', color: '#229B16', marginTop: '8px' }}
            >
              12% <ArrowUpward />
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
