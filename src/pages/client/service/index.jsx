import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import ServiceHeader from '../../../sections/client/service/header'
import ListCategory from '../../../sections/client/service/header/ListCategory'
import ListService from '../../../sections/client/service/ListService'

const ServicePage = () => {
  return (
    <Container maxWidth='xl' sx={{ pb: 5, pt: 2 }}>
      <Stack gap={{ xs: 2, md: 5 }}>
        <ServiceHeader />
        <ListService />
      </Stack>
    </Container>
  )
}

export default ServicePage
