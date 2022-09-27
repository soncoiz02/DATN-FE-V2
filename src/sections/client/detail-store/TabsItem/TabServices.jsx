import { Star } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'
import formatPrice from '../../../../utils/formatPrice'

const ListServicesByStore = () => {
  const theme = useTheme()
  const arrayServiceTest = [1, 2, 3, 4, 12, 12, 41, 24, 1, 24]
  const arrayCateTest = [1, 2, 3, 5, 4]

  return (
    <Box sx={{ padding: '0', margin: '40px 0' }}>
      <Grid container spacing={5}>
        {arrayTest.map((item, index) => (
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
                <CardMedia
                  component='img'
                  height='200'
                  image='https://31massage.vn/uploads/editer/images/massage-ha-noi.jpg'
                  alt='green iguana'
                />
                <CardContent>
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h3'>Mát xa toàn thân</Typography>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='h3'>4.5</Typography>
                      <Star sx={{ color: '#FFAC30' }} />
                    </Stack>
                  </Stack>
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Thời gian: 60 phút
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Tổng số bước: 03
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ padding: '0 21px 21px 21px' }}>
                <MainButton sx={{ marginLeft: 'auto' }} colorType='primary'>
                  {formatPrice(500000)}
                </MainButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ListServicesByStore
