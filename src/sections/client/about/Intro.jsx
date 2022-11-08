import React from 'react'
import { Box, Typography, Grid, Container, Stack, Divider, Button, Link } from '@mui/material'
import styled from 'styled-components'

const Intro = () => {
  return (
    <Box
      sx={{
        background: '#FFBC97',
        padding: '70px 0',
        margin: '0 0 30px',
      }}
    >
      <Container maxWidth='xl' sx={{ padding: '0' }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
          <Grid
            item
            xs={3}
            sx={{
              paddingLeft: '0',
            }}
          >
            <StyleBackground src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/parallax-10.jpg' />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              paddingLeft: '0',
            }}
          >
            <StyleBackground src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/parallax-9.jpg' />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              paddingLeft: '0',
            }}
          >
            <Stack
              sx={{
                backgroundColor: '#fff',
                paddingTop: '0px',
                width: '100%',
                height: '100%',
                padding: '60px',
              }}
            >
              <TitleIntroduce>Beauty Paradise</TitleIntroduce>
              <Divider
                sx={{
                  width: '150px',
                  backgroundColor: ' #FF6073',
                  marginBottom: '20px',
                }}
              />
              <DescriptTion>
                Hãy chăm sóc cơ thể của bạn, nơi duy nhất bạn phải sống! Đó là một ngôi đền sống.
                Hãy tôn trọng nó, chăm sóc nó và tận hưởng cuộc sống của bạn để phát huy hết khả
                năng của nó … Beauty Paradise chỉ giúp bạn làm điều đó! <br />
                <br />
                Với các bài massage ứng dụng khí công và day ấn huyệt, đặc biệt là massage đầu có 1
                không 2 tại Việt Nam, được nghiên cứu bởi chuyên gia trên 25 năm kinh nghiệm trong
                ngành, Beauty Paradaise sẽ đáp ứng đa dạng nhu cầu của bạn từ thư giãn đến điều trị
                bệnh lý. Đội ngũ của Beauty Paradaise luôn tận tâm, hết lòng vì sự hài lòng, sức
                khoẻ và sắc đẹp của khách hàng.
              </DescriptTion>
              <Linnk href='/'>Xem chi tiết</Linnk>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const StyleBackground = styled('img')`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const TitleIntroduce = styled(Typography)`
  font-size: 30px;
  @font-face {
    src: url(font/KolkerBrush-Regular.ttf);
  }
  font-family: Display;
  font-style: italic;
  line-height: 30px;
  font-weight: 400;
  color: #ff6073;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const DescriptTion = styled(Typography)`
  font-size: 16px;
  line-height: 35px;
  font-weight: 400;
  color: #464646;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const Linnk = styled(Link)({
  fontStyle: 'italic',
  boxShadow: 'none',
  fontSize: '16px',
  padding: '15px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  color: '#FF6073',
  borderRadius: '10px',
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
  },
})

export default Intro
