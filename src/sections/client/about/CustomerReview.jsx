import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const CustomerReview = () => {
  return (
    <Box
      sx={{
        background: '#FFCC99',
        padding: '70px 0',
        margin: '0 0 30px',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          padding: '10px 0',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack>
          <TitleIntroduce>Beauty Paradise</TitleIntroduce>
          <TextStaff>SỨ MỆNH/TẦM NHÌN</TextStaff>
        </Stack>
      </Container>
    </Box>
  )
}
const TitleIntroduce = styled(Typography)`
  font-size: 30px;
  @font-face {
    src: url(font/KolkerBrush-Regular.ttf);
  }
  font-family: Display;
  font-style: italic;
  line-height: 30px;
  font-weight: 600;
  color: #ff6073;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const TextStaff = styled(Typography)`
  font-size: 40px;
  @font-face {
    src: url(font/KolkerBrush-Regular.ttf);
  }
  font-family: Times New Roman Times;
  line-height: 40px;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default CustomerReview
