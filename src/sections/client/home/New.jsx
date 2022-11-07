import React from 'react'
import { Box, Typography, Container, Grid, Paper, Stack, Button } from '@mui/material'
import styled from 'styled-components'

const New = () => {
  return (
    <>
      <Box sx={{ padding: { md: '70px 0', xs: '50px 0' } }}>
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
            <Stack
              sx={{
                marginBottom: { lg: '60px', md: '50px', sx: '40px', xs: '20px' },
                textAlign: 'center',
              }}
            >
              <Typography variant='enText'>Staff</Typography>
              <Typography variant='viText'>Nhân viên</Typography>
            </Stack>
            <Box>
              <Grid container rowSpacing={{ xs: 3, sm: 0 }} columnSpacing={{ xs: 3, md: 4 }}>
                <Grid
                  container
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ItemMostStaff>
                    <ImgStaff src='https://i.vgt.vn/2022/4/2/mikami-yua---nu-hoang-phim-nguoi-lon-bat-khoc-vi-phai-hanh-nghe-voi-nguoi-tuoi-cha-chu-ea6-6383958.jpg' />
                    <NameStaff>Nguyễn Ánh Ngọc</NameStaff>
                    <PriceStaff>Massage</PriceStaff>
                  </ItemMostStaff>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ItemMostStaff>
                    <ImgStaff src='https://i.vgt.vn/2022/4/2/mikami-yua---nu-hoang-phim-nguoi-lon-bat-khoc-vi-phai-hanh-nghe-voi-nguoi-tuoi-cha-chu-ea6-6383958.jpg' />
                    <NameStaff>Nguyễn Ánh Ngọc</NameStaff>
                    <PriceStaff>Massage</PriceStaff>
                  </ItemMostStaff>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ItemMostStaff>
                    <ImgStaff src='https://i.vgt.vn/2022/4/2/mikami-yua---nu-hoang-phim-nguoi-lon-bat-khoc-vi-phai-hanh-nghe-voi-nguoi-tuoi-cha-chu-ea6-6383958.jpg' />
                    <NameStaff>Nguyễn Ánh Ngọc</NameStaff>
                    <PriceStaff>Massage</PriceStaff>
                  </ItemMostStaff>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ItemMostStaff>
                    <ImgStaff src='https://i.vgt.vn/2022/4/2/mikami-yua---nu-hoang-phim-nguoi-lon-bat-khoc-vi-phai-hanh-nghe-voi-nguoi-tuoi-cha-chu-ea6-6383958.jpg' />
                    <NameStaff>Nguyễn Ánh Ngọc</NameStaff>
                    <PriceStaff>Massage</PriceStaff>
                  </ItemMostStaff>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ paddingBottom: { md: '70px', xs: '50px' } }}>
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
          <ItemComeUs>
            <WellComeBigText>Trở thành thành viên để nhận những ưu đãi sớm nhất!</WellComeBigText>
            <WellComeSmallText>
              Đăng ký để không bỏ lỡ bất kỳ thông báo nào về ưu đãi cũng như các thông tin về dịch
              vụ của chúng tôi
            </WellComeSmallText>
            <ButtonCustom>Đặt lịch ngay</ButtonCustom>
          </ItemComeUs>
        </Container>
      </Box>
    </>
  )
}

const PriceStaff = styled(Typography)`
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (max-width: 425px) {
    letter-spacing: 2px;
  }
`

const NameStaff = styled(Typography)`
  font-size: 25px;
  line-height: 25px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
  @media (max-width: 1024px) {
    font-size: 23px;
  }
  @media (max-width: 768px) {
    font-size: 21px;
  }
  @media (max-width: 425px) {
    line-height: 20px;
    margin-top: 5px;
    font-size: 19px;
  }
`
const ImgStaff = styled('img')`
  max-width: 200px;
  border-radius: 50%;
  @media (max-width: 1024px) {
    max-width: 180px;
  }
  @media (max-width: 768px) {
    max-width: 150px;
  }
`
const ItemMostStaff = styled(Paper)`
  padding: 30px;
  box-shadow: none;
  border-radius: 10px;
  background-color: #ffddcb;
  @media (max-width: 1024px) {
    padding: 20px;
  }
  @media (max-width: 768px) {
    padding: 15px;
  }
`
const ItemComeUs = styled(Paper)`
  box-shadow: none;
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
`
const WellComeBigText = styled(Typography)`
  font-size: 35px;
  line-height: 40px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 25px;
    line-height: 30px;
  }
  @media (max-width: 425px) {
    line-height: 25px;
    font-size: 21px;
  }
`
const WellComeSmallText = styled(Typography)`
  font-size: 22px;
  line-height: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    line-height: 20px;
    margin: 10px;
    font-size: 17px;
  }
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  fontSize: '16px',
  padding: '15px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#FF6073',
  backgroundColor: '#FF6073',
  color: '#FFF',
  borderRadius: '10px',
  boxSizing: 'border-box',
  letterSpacing: '2px',
  display: 'flex',
  justifyContent: 'flex-start',
  width: 'fit-content',
  transition: 'all .3s',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#FF6073',
    borderColor: '#FF6073',
    color: '#fff',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
})

export default New
