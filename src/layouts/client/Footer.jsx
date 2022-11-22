import React from 'react'
import {
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
} from '@mui/material'
import {
  Facebook,
  Instagram,
  LocalPhone,
  Mail,
  Pinterest,
  Twitter,
  YouTube,
} from '@mui/icons-material'
import styled from 'styled-components'

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          borderTop: '6px solid #FF6073',
          backgroundColor: '#3B3B3B',
          padding: { md: '50px 0', xs: '50px 0' },
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={4}>
            <Grid container item xs={12} sm={6} md={4}>
              <Stack>
                <Box>
                  <LogoFooter src='https://khangviet.net/media/7UF7HqhXPfhDq1r_KDtxnIHH7ABD4QKl4StzLS8CrOQlr4Ea4PI_beniCvt3aHlH.png' />
                </Box>
                <MainText sx={{ marginLeft: '30px' }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book.
                </MainText>
                <Box sx={{ marginLeft: '30px', marginTop: '20px' }}>
                  <Facebook
                    sx={{
                      width: '35px',
                      height: '35px',
                      color: '#000',
                      marginRight: ' 10px',
                      backgroundColor: '#FFC0CB',
                      borderRadius: '6px',
                    }}
                  ></Facebook>
                  <Instagram
                    sx={{
                      width: '35px',
                      height: '35px',
                      color: '#000',
                      marginRight: ' 10px',
                      backgroundColor: '#FFC0CB',
                      borderRadius: '6px',
                    }}
                  ></Instagram>
                  <Twitter
                    sx={{
                      width: '35px',
                      height: '35px',
                      color: '#000',
                      marginRight: ' 10px',
                      backgroundColor: '#FFC0CB',
                      borderRadius: '6px',
                    }}
                  ></Twitter>
                  <YouTube
                    sx={{
                      width: '35px',
                      height: '35px',
                      color: '#000',
                      marginRight: ' 10px',
                      backgroundColor: '#FFC0CB',
                      borderRadius: '6px',
                    }}
                  ></YouTube>
                  <Pinterest
                    sx={{
                      width: '35px',
                      height: '35px',
                      color: '#000',
                      marginRight: ' 10px',
                      backgroundColor: '#FFC0CB',
                      borderRadius: '6px',
                    }}
                  ></Pinterest>
                </Box>
              </Stack>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} sx={{ marginTop: '40px' }}>
              <Box sx={{ alignItems: 'center', alignContent: 'center', paddingLeft: '80px' }}>
                <FooterTitle>Menu</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: { xs: '20px', md: '30px' },
                  }}
                />
                <Stack>
                  <MainText>Cửa hàng</MainText>
                  <MainText>Dịch vụ</MainText>
                  <MainText>Về chúng tôi</MainText>
                  <MainText>Đánh giá</MainText>
                </Stack>
              </Box>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} sx={{ marginTop: '40px' }}>
              <Box sx={{ paddingLeft: '55px' }}>
                <FooterTitle>Danh mục</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: { xs: '20px', md: '30px' },
                  }}
                />
                <Stack>
                  <MainText>Massage</MainText>
                  <MainText>Dưỡng da</MainText>
                  <MainText>Trị liệu</MainText>
                  <MainText>Tẩy tế bào chết</MainText>
                </Stack>
              </Box>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} sx={{ marginTop: '40px' }}>
              <Box sx={{ paddingLeft: '40px' }}>
                <FooterTitle>Thời gian mở cửa</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: { xs: '20px', md: '30px' },
                  }}
                />
                <Box>
                  <MainText>
                    Mỗi ngày từ <SubtitleFooter>8h00 – 22h00</SubtitleFooter>
                  </MainText>
                  <MainText>Kể cả ngày lễ và Tết</MainText>
                </Box>
              </Box>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} sx={{ marginTop: '40px' }}>
              <Box sx={{ paddingLeft: '40px' }}>
                <FooterTitle>LIÊN HỆ</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: { xs: '10px', md: '30px' },
                  }}
                />
                <Box sx={{ marginTop: '20px' }}>
                  <Box sx={{ marginTop: '20px' }}>
                    <Stack
                      direction='row'
                      spacing={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton sx={{ padding: '0px' }}>
                        <LocalPhone color='primary' />
                      </IconButton>
                      <SubtitleFooter>Phone</SubtitleFooter>
                    </Stack>
                    <MainText>0966244499</MainText>
                  </Box>
                  <Box sx={{ marginTop: '20px' }}>
                    <Stack
                      direction='row'
                      spacing={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton sx={{ padding: '0px' }}>
                        <Mail color='primary' />
                      </IconButton>
                      <SubtitleFooter>Email</SubtitleFooter>
                    </Stack>
                    <MainText>support@gmail.com</MainText>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const LogoFooter = styled('img')`
  width: 40%;
  @media (max-width: 768px) {
    height: 150px;
  }
`
const FooterTitle = styled(Typography)`
  margin: 20px 00 10px 0;
  font-size: 18px;
  line-height: 27px;
  text-transform: uppercase;
  font-weight: 700;
  color: #ff6073;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 18px;
  }
`
const MainText = styled(Typography)`
  font-size: 16px;
  line-height: 26px;
  color: #dadada;
`
const SubtitleFooter = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 13px;
  letter-spacing: 3px;
  font-weight: lighter;
`

export default Footer
