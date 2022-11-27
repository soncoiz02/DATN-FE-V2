import { Container } from '@mui/material'
import React from 'react'
import ListService from '../../../sections/client/service-register-history/ListService'
import StatusTab from '../../../sections/client/service-register-history/StatusTab'
import TextHead from '../../../sections/client/service-register-history/TextHead'

const ServiceRegister = () => {
  return (
    <Container maxWidth='xl'>
      <TextHead />
      <StatusTab />
      <ListService />
    </Container>
  )
}

export default ServiceRegister
