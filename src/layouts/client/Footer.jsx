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
import { LocalPhone, Mail } from '@mui/icons-material'
import styled from 'styled-components'

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          borderTop: '6px solid #FF6073',
          backgroundColor: '#3B3B3B',
          padding: '70px 0',
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={3} sx={{ padding: '15px' }}>
            <Grid container item xs={12} sm={6} md={3}>
              <Stack>
                <Box>
                  <LogoFooter src='../../../logo.svg' />
                </Box>
                <MainText>
                  Spa massage ấn huyệt trị liệu ứng dụng khí công và y học cổ truyền.
                </MainText>
                <MainText sx={{ marginTop: '20px' }}>Địa chỉ: Quận Nam Từ Liêm, Hà Nội</MainText>
              </Stack>
            </Grid>
            <Grid container item xs={12} sm={6} md={3}>
              <Box>
                <FooterTitle>LIÊN HỆ</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: '30px',
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
            <Grid container item xs={12} sm={6} md={3}>
              <Box>
                <FooterTitle>Thời gian mở cửa</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: '30px',
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
            <Grid container item xs={12} sm={6} md={3}>
              <Box>
                <FooterTitle>Menu</FooterTitle>
                <Divider
                  sx={{
                    width: '100%',
                    backgroundColor: ' #FFF',
                    opacity: '0.3',
                    marginBottom: '30px',
                  }}
                />
                <Stack>
                  <MainText>Cửa hàng</MainText>
                  <MainText>Về chúng tôi</MainText>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: '#2D2D2D',
          padding: '10px 0',
          textAlign: 'center',
        }}
      >
        <Typography variant='subtitle2' sx={{ color: '#DADADA' }}>
          @All right copy 2022
        </Typography>
      </Box>
    </>
  )
}

const LogoFooter = styled('img')`
  width: 100%;
  @media (max-width: 768px) {
    height: 150px;
  }
`
const FooterTitle = styled(Typography)`
  margin: 20px 00 10px 0;
  font-family: Prata;
  font-size: 20px;
  line-height: 27px;
  text-transform: uppercase;
  font-weight: 500;
  color: #ff6073;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const MainText = styled(Typography)`
  font-size: 16px;
  line-height: 26px;
  color: #dadada;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const SubtitleFooter = styled(Typography)`
  color: #ff6073;
  font-size: 15px;
  line-height: 13px;
  letter-spacing: 3px;
  font-weight: lighter;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default Footer
