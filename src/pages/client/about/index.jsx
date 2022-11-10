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
      <center>
        <iframe
          width='900'
          height='506'
          src='https://www.youtube.com/embed/br3ig82_SgI'
          title='Four Seasons Milan - Luxury Spa Breaks Await'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
          item='center'
        ></iframe>
      </center>
      <Staff />
      <CustomerReview />
      <Contact />
    </Box>
  )
}

export default AboutPage
