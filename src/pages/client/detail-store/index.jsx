import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StoreHero from '../../../sections/client/detail-store/StoreHero'
import StoreTabs from '../../../sections/client/detail-store/StoreTabs'
import storeApi from '../../../api/store'
import styled from 'styled-components'
import serviceApi from '../../../api/service'

const DetailStore = () => {
  const { id } = useParams()
  const [detailStore, setDetailStore] = useState()
  const [services, setServices] = useState()
  console.log(id)

  const getDetailStore = async () => {
    try {
      const data = await storeApi.getOne(id)
      setDetailStore(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceStore = async (id) => {
    try {
      const data = await serviceApi.getByStore(id)
      console.log(data)
      setServices(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      getServiceStore(id)
    }
    getDetailStore()
  }, [id])

  return (
    <Container maxWidth='xl' sx={{ padding: '0' }}>
      <StyleBox>
        <StoreHero props={detailStore} />
        <StoreTabs props={detailStore} services={services} />
      </StyleBox>
    </Container>
  )
}

const StyleBox = styled(Box)``

export default DetailStore
