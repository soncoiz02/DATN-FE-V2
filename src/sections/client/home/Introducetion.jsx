import React from 'react'
import { Box, Typography, Grid, Container, Stack, Divider, Button } from '@mui/material'
import styled from 'styled-components'

const Introducetion = () => {
  return (
    <Box
      sx={{
        background: '#FFBC97',
        padding: { md: '70px 0', xs: '50px 0' },
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              paddingLeft: '0',
            }}
          >
            <StyleBackground src='http://www.nicdarkthemes.com/themes/beauty/wp/demo/beauty-salon/wp-content/uploads/sites/2/2017/01/video-1.jpg?id=114' />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
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
                padding: { lg: '50px', md: '40px', sm: '30px', xs: '25px' },
              }}
            >
              <TitleIntroduce>TRẢI NGHIỆM DỊCH VỤ</TitleIntroduce>
              <Divider
                sx={{
                  width: '150px',
                  backgroundColor: ' #FF6073',
                  marginBottom: '20px',
                }}
              />
              <DescriptTion>
                CHÀO MỪNG BẠN ĐẾN VỚI BEAUTY PARADAISE
                <br />
                Với các bài massage ứng dụng khí công và day ấn huyệt, đặc biệt là massage đầu có 1
                không 2 tại Việt Nam, được nghiên cứu bởi chuyên gia trên 25 năm kinh nghiệm trong
                ngành, Beauty Paradaise sẽ đáp ứng đa dạng nhu cầu của bạn từ thư giãn đến điều trị
                bệnh lý. Đội ngũ của Beauty Paradaise luôn tận tâm, hết lòng vì sự hài lòng, sức
                khoẻ và sắc đẹp của khách hàng.
              </DescriptTion>
              <ButtonCustom>Đặt lịch ngay</ButtonCustom>
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
`

const TitleIntroduce = styled(Typography)`
  font-size: 30px;
  line-height: 30px;
  font-weight: 400;
  color: #ff6073;
  text-transform: uppercase;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    line-height: 28px;
    font-size: 28px;
    margin-bottom: 15px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
    font-size: 20px;
  }
`

const DescriptTion = styled(Typography)`
  font-size: 16px;
  line-height: 35px;
  font-weight: 400;
  color: #464646;
  margin: 0 0 20px 0;
  @media (max-width: 1024px) {
    line-height: 27px;
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 25px;
  }
`

const ButtonCustom = styled(Button)({
  boxShadow: 'none',
  fontSize: '16px',
  padding: '15px 25px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#FF6073',
  color: '#FF6073',
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
  },
})

export default Introducetion
