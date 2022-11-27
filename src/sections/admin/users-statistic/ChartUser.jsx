import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import GlassBox from '../../../components/GlassBox'
import { Typography } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
}

const ChartUser = () => {
  return (
    <GlassBox
      sx={{
        overflowX: 'auto',
        margin: '25px 0 0',
        padding: { xs: '15px', sm: '30px' },
        height: '500px',
        width: '500px',
      }}
    >
      <Typography variant='h6' color='text.secondary' margin='5px 0 25px'>
        Chart User
      </Typography>
      <Pie data={data} />
    </GlassBox>
  )
}

export default ChartUser
