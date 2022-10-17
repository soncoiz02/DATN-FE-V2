import React from 'react'
import { Box, IconButton, Grid, Typography, Card, Stack, Button } from '@mui/material'
import { ArrowUpward, Equalizer, PieChart, TrendingUp } from '@mui/icons-material'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import GlassBox from '../../../components/GlassBox'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Doanh thu năm nay',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => randomNumberInRange(0, 1000)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const Dashboard = () => {
  return (
    <>
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
      ,
      <GlassBox>
        <Line options={options} data={data} />
        <Stack
          direction={{ xs: 'row' }}
          justifyContent='flex-start'
          alignItems={{ xs: 'start' }}
          sx={{ marginTop: '10px' }}
        >
          <Button
            variant='secondary'
            onClick={(e) => {
              e.currentTarget.getAttribute('data-button-key')
            }}
            data-button-key='day'
          >
            Ngày
          </Button>
          <Button
            variant='secondary'
            onClick={(e) => {
              e.currentTarget.getAttribute('data-button-key')
            }}
            data-button-key='week'
          >
            Tuần
          </Button>
          <Button
            variant='secondary'
            onClick={(e) => {
              e.currentTarget.getAttribute('data-button-key')
            }}
            data-button-key='month'
          >
            Tháng
          </Button>
        </Stack>
      </GlassBox>
    </>
  )
}

export default Dashboard
