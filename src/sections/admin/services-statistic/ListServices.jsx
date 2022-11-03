import React, { useState } from 'react'
import { Button, Grid, Typography, Divider, MenuItem, Menu, Popper } from '@mui/material'
import GlassBox from '../../../components/GlassBox'
import {
  Archive,
  Edit,
  Equalizer,
  KeyboardArrowDown,
  MoreHoriz,
  Weekend,
} from '@mui/icons-material'
import { Bar } from 'react-chartjs-2'
import { useEffect } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

const ListServices = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  const [anchorEl, setAnchorEl] = useState()
  const [] = useState()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl()
  }
  const [chart, setChart] = useState({})
  var baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10'
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var apiKey = 'coinrankingbcfe6e59b020fbe0e471b2a060949d7d4eea1d79c111d2b7'

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data)
              setChart(json.data)
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchData()
  }, [baseUrl, proxyUrl, apiKey])

  console.log(chart)

  const data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: `lowVolume`,
        data: chart?.coins?.map((x) => x.marketCap),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: `sparkline`,
        data: chart?.coins?.map((x) => x.listedAt),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      stacked: false,
      title: {
        display: true,
        text: 'Chart Dịch Vụ',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  }
  return (
    <GlassBox
      sx={{
        overflowX: 'auto',
        margin: '25px 0 0',
        padding: { xs: '15px', sm: '30px' },
        height: '800px',
      }}
    >
      <Grid container justifyContent='space-between' paddingBottom={{ md: '10px', xs: '15px' }}>
        <Grid item xs={10} md={6}>
          <Typography variant='h2' color='text.secondary'>
            Thống kê dịch vụ
          </Typography>
        </Grid>

        <Button
          item
          xs={2}
          md={4}
          sx={{ display: 'flex', alignItems: 'center', padding: '7px 7px' }}
          id='demo-customized-button'
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          variant='contained'
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
        >
          Options
        </Button>
        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          id='demo-customized-menu'
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            TUẦN
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} disableRipple>
            THÁNG
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} disableRipple>
            NĂM
          </MenuItem>
        </Menu>
      </Grid>
      <Divider />
      <Bar options={options} data={data} />
    </GlassBox>
  )
}
export default ListServices
