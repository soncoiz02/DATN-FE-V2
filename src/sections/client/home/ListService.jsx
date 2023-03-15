import React from 'react'
import { Box, Typography, Container, Grid, Stack, Paper } from '@mui/material'
import styled from 'styled-components'

import service1 from '../../../assets/img/service-1.jpg'
import service2 from '../../../assets/img/service-2.jpg'
import service3 from '../../../assets/img/service-3.jpg'
import service4 from '../../../assets/img/service-4.jpg'
import service5 from '../../../assets/img/service-5.jpg'
import service6 from '../../../assets/img/service-6.jpg'

const ListService = () => {
  return (
    <Box sx={{ padding: { md: '70px 0', xs: '50px 0' } }}>
      <Container
        maxWidth='xl'
        sx={{
          textAlign: 'center',
        }}
      >
        <Stack>
          <Typography variant='enText'>SERVICES</Typography>
          <Typography variant='viText'>Các dịch vụ của chúng tôi</Typography>
        </Stack>
        {/* All service */}
        <Box
          sx={{
            flexGrow: 1,
            marginTop: { lg: '60px', md: '50px', sx: '40px', xs: '20px' },
          }}
        >
          <Grid container>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service1} />
                <DesService>Làm đẹp</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service2} />
                <DesService>Làm sạch</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={3}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service3} />
                <DesService>Thư giãn</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service4} />
                <DesService>Đắp mặt nạ</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service5} />
                <DesService>Chăm sóc tóc</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src={service6} />
                <DesService>Làm thơm</DesService>
              </Item>
            </Grid>
          </Grid>
        </Box>
        {/* End All service */}

        {/* Most service favorite */}
        <Box
          sx={{
            flexGrow: 1,
            marginTop: { lg: '60px', xs: '35px' },
          }}
        >
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1 }}>
            <Grid
              container
              item
              xs={6}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ItemMostService>
                <ImgService src='https://static.hotdeal.vn/images/1541/1540927/60x60/350274-sieu-combo-massage-body-dong-y-massage-cham-soc-mat-chuyen-sau-tai-moc-an-spa-relax.jpg' />
                <NameService>Massage body</NameService>
                <PriceService>500.000 VNĐ</PriceService>
              </ItemMostService>
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ItemMostService>
                <ImgService src='https://trangha.com.vn/wp-content/uploads/2017/07/ch%C4%83m-s%C3%B3c-da-m%E1%BA%B7t-c%C6%A1-b%E1%BA%A3n-2.jpg' />
                <NameService>Chăm sóc da mặt</NameService>
                <PriceService>200.000 VNĐ</PriceService>
              </ItemMostService>
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ItemMostService>
                <ImgService src='https://vinmec-prod.s3.amazonaws.com/images/20200905_021858_949316_krn1552053427.max-1800x1800.jpg' />
                <NameService>Giác hơi</NameService>
                <PriceService>200.000 VNĐ</PriceService>
              </ItemMostService>
            </Grid>
          </Grid>
        </Box>
        {/* End Most service favorite */}
      </Container>
    </Box>
  )
}

const IconService = styled('img')`
  padding: 15px 20px;
  max-width: 120px;
  @media (max-width: 768px) {
    max-width: 110px;
  }
  @media (max-width: 425px) {
    max-width: 100px;
  }
`

const PriceService = styled(Typography)`
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (max-width: 425px) {
    letter-spacing: 2px;
  }
`

const NameService = styled(Typography)`
  font-size: 25px;
  line-height: 25px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 21px;
  }
  @media (max-width: 425px) {
    line-height: 20px;
    margin-top: 5px;
    font-size: 19px;
  }
`
const ImgService = styled('img')`
  width: 100%;
  border-radius: 10px;
`

const Item = styled(Paper)`
  box-shadow: none;
`
const ItemMostService = styled(Paper)`
  padding: 0px 30px;
  box-shadow: none;
  @media (max-width: 1024px) {
    padding: 0px 10px;
  }
  @media (max-width: 768px) {
    padding: 0px 5px;
  }
`
const DesService = styled(Typography)`
  text-align: center;
  font-size: 13px;
  line-height: 13px;
  letter-spacing: 3px;
  font-weight: normal;
  color: #727475;
  text-transform: uppercase;
`

export default ListService
