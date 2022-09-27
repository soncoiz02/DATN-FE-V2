import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import storeApi from '../../../api/store'
import StoreHero from '../../../sections/client/detail-store/StoreHero'
import StoreTabs from '../../../sections/client/detail-store/StoreTabs'

const DetailStore = () => {
  // const { id } = useParams();
  // console.log(id);
  // const [storeDetail, setStoreDetail] = useState();

  // const getOneStore = async (id) => {
  //   try {
  //     const data = await storeApi.getOne(id);
  //     setStoreDetail(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getOneStore(id)
  //   console.log(storeDetail)
  // }, [id])

  return (
    <Box>
      <StoreHero />
      <StoreTabs />
    </Box>
  )
}

export default DetailStore
