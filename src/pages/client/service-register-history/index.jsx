import React from 'react'
import { useState } from 'react'
import ListService from '../../../sections/client/service-register-history/ListService'
// import StatusTabSection from '../../../sections/client/service-register-history/StatusTab'
import StatusTab from '../../../sections/client/service-register-history/StatusTab'

const ServiceRegister = () => {
  return (
    <div>
      <StatusTab />
      <ListService />
    </div>
  )
}

export default ServiceRegister
