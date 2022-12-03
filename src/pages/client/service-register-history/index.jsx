import { Container } from '@mui/material'
import React from 'react'
import ListService from '../../../sections/client/service-register-history/ListService'
import TextHead from '../../../sections/client/service-register-history/TextHead'

const ServiceRegister = () => {
  return (
    <Container maxWidth='xl'>
      <TextHead />
      <ListService />
    </Container>
  )
}

export default ServiceRegister
