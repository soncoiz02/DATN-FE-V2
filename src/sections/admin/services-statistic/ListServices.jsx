import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Grid, IconButton, Typography } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import GlassBox from '../../../components/GlassBox'

const ListServices = () => {
  return (
    <GlassBox
      sx={{
        overflowX: 'auto',
        margin: '25px 0 0',
        padding: { xs: '15px', sm: '30px' },
        height: '800px',
      }}
    >
      <Grid container paddingBottom={{ md: '10px', xs: '15px' }}>
        <Grid item xs={10} md={6}>
          <Typography variant='h2' color='text.secondary'>
            Thống kê dịch vụ
          </Typography>
        </Grid>

        <Grid
          item
          xs={2}
          md={6}
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <IconButton>
            <FilterAlt fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </GlassBox>
  )
}
export default ListServices
