import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { getStatusColor } from '../utils/aboutColor'
import calculateDayLeft from '../utils/calculateDayLeft'
import { dateFormat } from '../utils/dateFormat'
import GlassBox from './GlassBox'

const UserOrder = ({ detailOrder }) => {
  const renderDateFormated = (data) => {
    const date = new Date(data)
    const currentDate = new Date()
    const hours = date.getHours()
    const dateFormated = dateFormat(date)
    const dateLeft = currentDate.getDate() - date.getDate()
    if (dateLeft === -1) {
      return `${hours > 9 ? hours : '0' + hours}:00 - ngày mai`
    } else if (dateLeft === 0) {
      return `${hours > 9 ? hours : '0' + hours}:00 - hôm nay`
    } else if (dateLeft === 1) {
      return `${hours > 9 ? hours : '0' + hours}:00 - hôm qua`
    }

    return `${hours > 9 ? hours : '0' + hours}:00 - ${dateFormated}`
  }
  return (
    <GlassBox sx={{ '&:hover': { background: '#ffa0a018' }, p: 3 }}>
      <Stack direction='row' justifyContent='space-start'>
        <Avatar
          sx={{ height: '100', width: '100' }}
          alt='Image-service'
          src={detailOrder.servicesRegistered[0].service.image}
        />
        <Stack
          sx={{ ml: '10px' }}
          direction='column'
          justifyContent='center'
          alignItems='flex-start'
          spacing={0}
        >
          <Typography variant='h3' color='text.secondary'>
            {detailOrder.servicesRegistered[0].service.name}
          </Typography>
        </Stack>
      </Stack>
      <Box mt={1}>
        <Typography variant='body1'>Họ tên: {detailOrder.infoUser.name}</Typography>
        <Typography variant='body1'>Số điện thoại: {detailOrder.infoUser.phone}</Typography>
        <Typography variant='body1'>{renderDateFormated(detailOrder.startDate)}</Typography>
      </Box>
      <Stack direction='row' justifyContent='flex-end' mt={1.5}>
        <Chip label={detailOrder.status.name} color={getStatusColor(detailOrder.status.type)} />
      </Stack>
    </GlassBox>
  )
}

export default UserOrder
