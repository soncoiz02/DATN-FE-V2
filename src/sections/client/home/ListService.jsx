import React from 'react'
import { Box, Typography, Container, Grid, Stack, Paper } from '@mui/material'
import styled from 'styled-components'

const ListService = () => {
  return (
    <Box>
      <Container
        maxWidth='xl'
        sx={{
          padding: '70px 0',
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
            marginTop: '60px',
          }}
        >
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-1.png' />
                <DesService>Làm đẹp</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-2.png' />
                <DesService>Làm sạch</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-3.png' />
                <DesService>Thư giãn</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-4.png' />
                <DesService>Đắp mặt nạ</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-5.png' />
                <DesService>Chăm sóc tóc</DesService>
              </Item>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={4}
              md={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Item>
                <IconService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/service-6.png' />
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
            marginTop: '60px',
          }}
        >
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={2}
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
              xs={2}
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
              xs={2}
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
  max-width: 150px;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const PriceService = styled(Typography)`
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const NameService = styled(Typography)`
  font-size: 25px;
  line-height: 25px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ImgService = styled('img')`
  padding: 15px 40px;
  width: 100%;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const Item = styled(Paper)`
  box-shadow: none;
  @media (max-width: 768px) {
    height: 150px;
  }
`
const ItemMostService = styled(Paper)`
  box-shadow: none;
  @media (max-width: 768px) {
    height: 150px;
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
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default ListService
