import React from 'react'
import { useState } from 'react'
import ListService from '../../../sections/client/service-register-history/ListService'
import StatusTab from '../../../sections/client/service-register-history/StatusTab'

const ServiceRegister = () => {
  const [tabValue, setTabValue] = useState(0)

  return (
    <div>
      <StatusTab />
      <ListService />
    </div>
  )
}

export default ServiceRegister
