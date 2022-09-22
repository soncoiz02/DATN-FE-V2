import React from 'react'
import ListService from '../../../sections/client/service-register-history/ListService'
import StatusTab from '../../../sections/client/service-register-history/StatusTab'
import TextHead from '../../../sections/client/service-register-history/TextHead'

const ServiceRegister = () => {
  return (
    <div>
      <TextHead />
      <StatusTab />
      <ListService />
    </div>
  )
}

export default ServiceRegister
