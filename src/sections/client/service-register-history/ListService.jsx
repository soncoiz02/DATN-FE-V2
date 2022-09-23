import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Stack, Box, Typography, Rating, useTheme } from '@mui/material'
import GlassBox from '../../../components/GlassBox'
import orderApi from '../../../api/order'
import dateFormat from '../../../utils/dateFormat'
import timeFormat from '../../../utils/timeFormat'

const ListService = () => {
  const theme = useTheme()

  const [order, setOrder] = useState([])

  const getOrder = async () => {
    try {
      const data = await orderApi.getAll()
      setOrder(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrder()
  }, [])

  return (
    <Box sx={{ padding: '0px 24px' }}>
      <Grid container spacing={{ xs: 2, lg: 4 }}>
        {order.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <GlassBox>
              <Stack direction='row' justifyContent='space-start'>
                <Avatar
                  sx={{ height: '100', width: '100' }}
                  alt='Image-service'
                  src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                />
                <Stack
                  sx={{ ml: '10px' }}
                  direction='column'
                  justifyContent='center'
                  alignItems='flex-start'
                  spacing={0}
                >
                  <Typography variant='h3' color={theme.palette.text.secondary}>
                    Excellence Spa Đỗ Quang
                  </Typography>
                  <Rating name='size-small' readOnly defaultValue={5}></Rating>
                </Stack>
              </Stack>
              <Box>
                <Typography variant='subtitle2'>Họ tên: {item.infoUser.name}</Typography>
                <Typography variant='subtitle2'>Số điện thoại: {item.infoUser.phone}</Typography>
                <Typography variant='subtitle2'>Dịch vụ sử dụng: {item.serviceId.name}</Typography>
                <Typography variant='subtitle2'>
                  Thời gian: {timeFormat(item.startDate)} - {dateFormat(new Date(item.createdAt))}
                </Typography>
              </Box>
              <Stack direction='row' justifyContent='flex-end'>
                <Typography variant='subtitle2' color={theme.palette.secondary.main}>
                  Đang mở cửa
                </Typography>
              </Stack>
            </GlassBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ListService
