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
  useTheme,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import MainButton from '../../../../components/MainButton'
import formatPrice from '../../../../utils/formatPrice'

const TabServices = ({ services }) => {
  const theme = useTheme()
  console.log(services)
  let servicesStore = []
  if (services) {
    servicesStore = services
  }
  const ButtonCate = styled(Button)`
    background-color: ${theme.palette.primary.main};
    color: #fff;
    padding: 0px 40px;
    border-radius: 30px;
    font-size: 18px;
    height: 50px;
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(10px);
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
    backdrop-filter: blur(10px);
  `
  const ButtonFuncTabServices = styled(IconButton)`
    background-color: #fff;
    color: ${theme.palette.primary.main};
    border-radius: 50%;
    font-size: 18px;
    height: 50px;
    width: 50px;
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(10px);
  `

  return (
    <Box sx={{ padding: '0 0 0 0', margin: '40px 0' }}>
      <Box>
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
      <Box sx={{ marginTop: '40px' }}>
        <Grid container spacing={5}>
          {servicesStore?.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                sx={{
                  maxWidth: 1,
                  borderRadius: '20px',
                  boxShadow:
                    '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                }}
              >
                <CardActionArea sx={{}}>
                  <CardMedia component='img' height='200' image={item.image} alt='green iguana' />
                  <CardContent>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <Typography variant='h3'>{item.name}</Typography>
                      <Stack direction='row' alignItems='center'>
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
                </CardActionArea>
                <CardActions sx={{ padding: '0 21px 21px 21px' }}>
                  <MainButton sx={{ marginLeft: 'auto' }} colorType='primary'>
                    {formatPrice(item.price)}
                  </MainButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default TabServices
