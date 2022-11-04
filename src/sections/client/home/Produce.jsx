import React from 'react'
import { Box, Typography, Container, Stack } from '@mui/material'
import styled from 'styled-components'

const Produce = () => {
  return (
    <Box
      component='div'
      sx={{
        backgroundImage: 'url(https://an-spa.vn/frontend/img/background/bg_grey_dichvu.jpg)',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '70px 0',
          textAlign: 'center',
        }}
      >
        <Box>
          <Stack sx={{ marginBottom: '60px' }}>
            <Typography variant='enText'>Achievement</Typography>
            <Typography variant='viText'>Các thành tựu đạt được</Typography>
          </Stack>
          <Stack direction='row' spacing={30}>
            <Box>
              <NumProduce>12</NumProduce>
              <DesProduce>CHUYÊN GIA</DesProduce>
            </Box>
            <Box>
              <NumProduce>500+</NumProduce>
              <DesProduce>KHÁCH HÀNG</DesProduce>
            </Box>
            <Box>
              <NumProduce>62</NumProduce>
              <DesProduce>ĐIỀU TRỊ</DesProduce>
            </Box>
            <Box>
              <NumProduce>18+</NumProduce>
              <DesProduce>SỐ NĂM KINH NGHIỆM</DesProduce>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

const NumProduce = styled(Typography)`
  font-size: 50px;
  font-weight: 400;
  color: #ff6073;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const DesProduce = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 13px;
  letter-spacing: 3px;
  font-weight: lighter;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default Produce
