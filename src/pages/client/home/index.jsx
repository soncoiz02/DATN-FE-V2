import React from 'react'
import { Box } from '@mui/material'
import SlideHeader from '../../../sections/client/home/SlideHeader'
import Introducetion from '../../../sections/client/home/Introducetion'
import Produce from '../../../sections/client/home/Produce'
import ListService from '../../../sections/client/home/ListService'
import New from '../../../sections/client/home/New'

const HomePage = () => {
  return (
    <Box>
      <SlideHeader />
      <Introducetion />
      <ListService />
      <Produce />
      <New />
    </Box>
  )
}

export default HomePage
