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
  Avatar,
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
import Logo from '../../assets/img/logo.png'

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          borderTop: '6px solid #FF6073',
          backgroundColor: 'white',
          padding: { md: '50px 0', xs: '50px 0' },
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Stack gap={1}>
                <Stack direction='row' gap={1} alignItems='center'>
                  <Avatar src={Logo} sx={{ width: '50px', height: '50px' }} />
                  <Typography variant='h2' color='primary'>
                    Beauty Paradise
                  </Typography>
                </Stack>
                <MainText>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book.
                </MainText>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ alignItems: 'center', alignContent: 'center' }}>
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
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
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
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
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
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
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
                        <MainText>beautyparadise@gmail.com</MainText>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

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
  color: #333333;
`
const SubtitleFooter = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 13px;
  letter-spacing: 3px;
  font-weight: lighter;
`

export default Footer
