import { Box } from '@mui/material'
import React from 'react'
import Contact from '../../../sections/client/about/Contact'
import CustomerReview from '../../../sections/client/about/CustomerReview'
import Header from '../../../sections/client/about/Header'
import Intro from '../../../sections/client/about/Intro'
import Staff from '../../../sections/client/about/Staff'

const AboutPage = () => {
  return (
    <Box>
      <Header />
      <Intro />
      <Staff />
      {/* <CustomerReview /> */}
      <Contact />
    </Box>
  )
}

export default AboutPage
