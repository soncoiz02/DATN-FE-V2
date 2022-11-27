import React from 'react'
import { Box, Typography, Container, Stack, Grid } from '@mui/material'
import styled from 'styled-components'

const Produce = () => {
  return (
    <Box
      component='div'
      sx={{
        backgroundImage: 'url(https://an-spa.vn/frontend/img/background/bg_grey_dichvu.jpg)',
        padding: { md: '70px 0', xs: '50px 0' },
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
          textAlign: 'center',
        }}
      >
        <Box>
          <Stack sx={{ marginBottom: { xs: '15px', sm: '30px' } }}>
            <Typography variant='enText'>Achievement</Typography>
            <Typography variant='viText'>Các thành tựu đạt được</Typography>
          </Stack>
          <Grid container rowSpacing={{ xs: 2, md: 0 }} columnSpacing={{ xs: 1, sm: 3, md: 12 }}>
            <CustomGrid container item xs={6} md={3}>
              <Box>
                <NumProduce>12</NumProduce>
                <DesProduce>CHUYÊN GIA</DesProduce>
              </Box>
            </CustomGrid>
            <CustomGrid container item xs={6} md={3}>
              <Box>
                <NumProduce>500+</NumProduce>
                <DesProduce>KHÁCH HÀNG</DesProduce>
              </Box>
            </CustomGrid>
            <CustomGrid container item xs={6} md={3}>
              <Box>
                <NumProduce>62</NumProduce>
                <DesProduce>ĐIỀU TRỊ</DesProduce>
              </Box>
            </CustomGrid>
            <CustomGrid container item xs={6} md={3}>
              <Box>
                <NumProduce>18+</NumProduce>
                <DesProduce>SỐ NĂM KINH NGHIỆM</DesProduce>
              </Box>
            </CustomGrid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

const NumProduce = styled(Typography)`
  font-size: 50px;
  font-weight: 500;
  color: #ff6073;
  @media (max-width: 768px) {
    font-size: 40px;
  }
  @media (max-width: 425px) {
    font-size: 35px;
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
    letter-spacing: 2px;
    margin-top: 0px;
    font-size: 13px;
  }
  @media (max-width: 425px) {
    letter-spacing: 1px;
  }
`
const CustomGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`

export default Produce
