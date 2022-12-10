import { Grid, Stack } from '@mui/material'
import React from 'react'
import ListOrder from './ListOrder'
import UserRated from './UserRated'
import UserRevenue from './UserRevenue'

const DetailUserSection = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <ListOrder />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack gap={2}>
          <UserRevenue />
          <UserRated />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default DetailUserSection
