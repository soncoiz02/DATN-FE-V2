import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StoreHero from '../../../sections/client/detail-store/StoreHero'
import StoreTabs from '../../../sections/client/detail-store/StoreTabs'
import storeApi from '../../../api/store'
import styled from 'styled-components'

const DetailStore = () => {
  const { id } = useParams()
  const [detailStore, setDetailStore] = useState()
  const getDetailStore = async () => {
    try {
      const data = await storeApi.getOne(id)
      setDetailStore(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDetailStore()
  }, [id])

  return (
    <Container>
      <StyleBox>
        <StoreHero props={detailStore} />
        <StoreTabs props={detailStore} />
      </StyleBox>
    </Container>
  )
}

const StyleBox = styled(Box)``

export default DetailStore
