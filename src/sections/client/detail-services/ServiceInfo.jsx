import { Avatar, Box, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'
import { Star } from '@mui/icons-material'
import { yellow } from '@mui/material/colors'
import MainButton from '../../../components/MainButton'
const ServiceInfo = () => {
  const theme = useTheme()
  return (
    <GlassBox>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <ServiceImage sx={{ width: { md: '80%' } }}>
            <img
              src='https://vimed.org/wp-content/uploads/2020/06/spa-cham-soc-da-mat-uy-tin-o-ha-noi-1.jpg'
              alt=''
            />
          </ServiceImage>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack gap={1} height='100%'>
            <Typography variant='h2' color={theme.palette.text.secondary}>
              Massage Chân
            </Typography>
            <Stack direction='row' gap={1}>
              <Stack direction='row' gap={0.5}>
                <Star sx={{ color: yellow[600] }} />
                <Star sx={{ color: yellow[600] }} />
                <Star sx={{ color: yellow[600] }} />
                <Star sx={{ color: yellow[600] }} />
                <Star sx={{ color: yellow[600] }} />
              </Stack>
              <Typography variant='subtitle2'>(100 đánh giá)</Typography>
            </Stack>
            <Typography variant='h3' color='primary'>
              500,000 đ
            </Typography>
            <Stack>
              <Typography variant='body1'>Thời gian: 60 phút</Typography>
              <Typography variant='body1'>Tổng số bước: 03</Typography>
            </Stack>
            <MainButton
              colorType='secondary'
              sx={{ alignSelf: 'center', marginTop: 'auto', padding: '10px 40px' }}
            >
              Đăng ký dịch vụ
            </MainButton>
          </Stack>
        </Grid>
      </Grid>
    </GlassBox>
  )
}

const ServiceImage = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

export default ServiceInfo
