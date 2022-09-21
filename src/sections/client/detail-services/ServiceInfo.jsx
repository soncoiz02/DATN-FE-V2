import { Avatar, Box, Grid, Rating, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'
import { Star } from '@mui/icons-material'
import { yellow } from '@mui/material/colors'
import MainButton from '../../../components/MainButton'
import formatPrice from '../../../utils/formatPrice'
const ServiceInfo = ({ onOpenModal, serviceInfo }) => {
  const theme = useTheme()
  return (
    <GlassBox>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <ServiceImage sx={{ width: { md: '80%' } }}>
            <img src={serviceInfo.image} alt='' />
          </ServiceImage>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack gap={1} height='100%'>
            <Typography variant='h2' color={theme.palette.text.secondary}>
              {serviceInfo.name}
            </Typography>
            <Stack direction='row' gap={1}>
              <Rating value={serviceInfo.rated.avg} readOnly />
              <Typography variant='subtitle2'>({serviceInfo.rated.total} đánh giá)</Typography>
            </Stack>
            <Typography variant='h3' color='primary'>
              {formatPrice(serviceInfo.price)}
            </Typography>
            <Stack>
              <Typography variant='body1'>Thời gian: {serviceInfo.duration} phút</Typography>
              <Typography variant='body1'>Tổng số bước: 03</Typography>
            </Stack>
            <MainButton
              colorType='secondary'
              sx={{ alignSelf: 'center', marginTop: 'auto', padding: '10px 40px' }}
              onClick={onOpenModal}
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
