import { FilterAlt, Search, Star } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import MainButton from '../../../../components/MainButton'
import formatPrice from '../../../../utils/formatPrice'

const TabServices = ({ services }) => {
  const theme = useTheme()
  let servicesStore = []
  if (services) {
    servicesStore = services
  }
  console.log(servicesStore)
  const ButtonCate = styled(Button)`
    background-color: ${theme.palette.primary.main};
    color: #fff;
    padding: 0px 40px;
    border-radius: 30px;
    font-size: 18px;
    height: 50px;
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(0);
    &:hover {
      background-color: ${theme.palette.primary.main};
      color: #fff;
    }
  `
  const ButtonCateSelected = styled(Button)`
    background-color: rgba(255, 255, 255, 0.3);
    color: ${theme.palette.text.primary};
    padding: 0px 40px;
    border-radius: 30px;
    font-size: 18px;
    height: 50px;
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(0);
  `
  const ButtonFuncTabServices = styled(IconButton)`
    background-color: #fff;
    color: ${theme.palette.primary.main};
    border-radius: 50%;
    font-size: 18px;
    height: 50px;
    width: 50px;
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(0);
  `
  const xs450px = useMediaQuery(theme.breakpoints.between(0, 450))

  return (
    <Box sx={{ padding: '0 0 0 0', margin: '40px 0' }}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={4}>
            <ButtonCate>Tất cả</ButtonCate>
            <ButtonCateSelected>Massage Mặt</ButtonCateSelected>
          </Stack>
          <Box>
            <Stack direction='row' spacing={3}>
              <ButtonFuncTabServices>
                <Search />
              </ButtonFuncTabServices>
              <ButtonFuncTabServices>
                <FilterAlt />
              </ButtonFuncTabServices>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ marginTop: '40px', minHeight: 1 }}>
        <Grid container spacing={{ xs: 2, sm: 5 }}>
          {servicesStore?.map((item, index) => (
            <Grid item xs={xs450px ? 12 : 6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 1,
                  borderRadius: '20px',
                  boxShadow:
                    '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                  minHeight: 1,
                  display: { xs: 'flex', sm: 'block' },
                  flexDirection: { xs: 'column', sm: 'none' },
                  justifyContent: { xs: 'space-between' },
                }}
              >
                <CardActionArea sx={{}}>
                  <CardMedia
                    component='img'
                    sx={{
                      height: { xs: '100px', sm: '200px' },
                    }}
                    image={item.image}
                    alt='green iguana'
                  />
                </CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: { xs: '1', sm: '1' } }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent='space-between'
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                    >
                      <Typography
                        sx={{ fontSize: { xs: '15px' }, flex: { xs: '1', sm: '1' } }}
                        variant='h3'
                      >
                        {item.name}
                      </Typography>
                      <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Typography variant='h3'>{item.rated.avg}</Typography>
                        <Star sx={{ color: '#FFAC30' }} />
                      </Stack>
                    </Stack>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Thời gian: {item.duration} phút
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Tổng số bước: {item.steps.length}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ flex: 1, padding: '0 21px 21px 21px' }}>
                    <MainButton
                      sx={{ margin: { xs: '0 auto', sm: '0 0 0 auto' } }}
                      colorType='primary'
                    >
                      {formatPrice(item.price)}
                    </MainButton>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default TabServices
