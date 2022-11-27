import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const Staff = () => {
  return (
    <Box
      sx={{
        background: '#FFF0F5',
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
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack>
          <TitleIntroduce>Beauty Paradise</TitleIntroduce>
          <TextStaff>ĐỘI NGŨ NHÂN VIÊN</TextStaff>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '60px',
          }}
        >
          <Stack>
            <Grid container spacing={5} justifyContent='center' alignContent='center'>
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
                  width: '500px',
                  alignContent: 'center',
                }}
              >
                <ItemMostStaff>
                  <ImgService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/team-4.jpg' />
                  <NameStaff>Jane Mcallister</NameStaff>
                  <Position padding='10px'>Chuyên gia chăm sóc da</Position>
                  <Descriptions padding='10px'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                    portitor.
                  </Descriptions>
                  <ButtonCustom>Đặt Lịch Ngay</ButtonCustom>
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
                  width: '500px',
                }}
              >
                <ItemMostStaff>
                  <ImgService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/team-2.jpg' />
                  <NameStaff>Mandy Johnson</NameStaff>
                  <Position padding='10px'>Thai Massage trị liệu</Position>
                  <Descriptions padding='10px'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                    portitor.
                  </Descriptions>
                  <ButtonCustom>Đặt Lịch Ngay</ButtonCustom>
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
                  width: '500px',
                }}
              >
                <ItemMostStaff>
                  <ImgService src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/team-1.jpg' />
                  <NameStaff>Hanna Zafron</NameStaff>
                  <Position padding='10px'>Chuyên gia thảo dược</Position>
                  <Descriptions padding='10px'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                    portitor.
                  </Descriptions>
                  <ButtonCustom>Đặt Lịch Ngay</ButtonCustom>
                </ItemMostStaff>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
const TitleIntroduce = styled(Typography)`
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
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
const ItemMostStaff = styled(Paper)`
  box-shadow: none;
  @media (max-width: 768px) {
    height: 300px;
  }
`
const ImgService = styled('img')`
  width: 100%;
  height: 350px;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const Position = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Descriptions = styled(Typography)`
  color: #00000;
  font-size: 12px;
  line-height: 20px;
  font-family: Times New Roman;
  letter-spacing: 1px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const NameStaff = styled(Typography)`
  font-size: 25px;
  line-height: 25px;
  font-weight: 700;
  font-family: Times New Roman;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  fontSize: '13px',
  padding: '10px 15px',
  margin: '25px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#FF6073',
  color: '#FF6073',
  borderRadius: '30px',
  boxSizing: 'border-box',
  letterSpacing: '1px',
  display: 'flex',
  justifyContent: 'flex-start',
  width: 'fit-content',
  transition: 'all .3s',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#FF6073',
    borderColor: '#FF6073',
    color: '#fff',
  },
})
export default Staff
