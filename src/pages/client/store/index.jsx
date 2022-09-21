import { Box, Grid } from '@mui/material'
import React from 'react'
import ListStore from '../../../sections/client/store/ListStore'
import FilterStore from '../../../sections/client/store/FilterStore'
import FilterStoreMobile from '../../../sections/client/store/FilterStoreMobile'
import FunctionBar from '../../../sections/client/store/FunctionBar'

const Store = (props) => {
  return (
    <Box>
      <FilterStoreMobile />
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <FilterStore />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Box sx={{ padding: { xs: '0 10px', md: '80px 20px' } }}>
            <FunctionBar />
            <ListStore />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Store
