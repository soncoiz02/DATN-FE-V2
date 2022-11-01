import React, { useState, useEffect } from 'react'
import { Close, Grade } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { yellow } from '@mui/material/colors'
import GlassBox from '../../../components/GlassBox'
import orderApi from '../../../api/order'
import formatPrice from '../../../utils/formatPrice'
import { dateFormat, formatHourMinuteSecond } from '../../../utils/dateFormat'

const ModalInfo = ({ openModal, onCloseModal, orderId }) => {
  const [orderServiceInfo, setOrderServiceInfo] = useState()

  const handleGetOrderService = async (id) => {
    try {
      const data = await orderApi.getOne(id)
      setOrderServiceInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (orderId) handleGetOrderService(orderId)
  }, [orderId])

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        {orderServiceInfo && (
          <GlassBox opacity={1} sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }}>
            <IconButton
              onClick={onCloseModal}
              sx={{ position: 'absolute', right: '20px', top: '20px' }}
            >
              <Close />
            </IconButton>
            <Stack gap={1} direction='row' alignItems='center'>
              <Box
                sx={{
                  height: { xs: '60px', sm: '80px' },
                  width: { xs: '60px', sm: '80px' },
                  border: '5px solid #fff',
                  borderRadius: '50%',
                }}
              >
                <Avatar
                  src='https://spamamgao.com/wp-content/uploads/2018/08/dsc0459-1024x682.jpg'
                  sx={{ width: 1, height: 1 }}
                />
              </Box>
              <Stack>
                <Typography variant='h2'>
                  {orderServiceInfo?.serviceId?.categoryId?.storeId?.name}
                </Typography>
                <Typography variant='subtitle2'>
                  {orderServiceInfo?.serviceId?.categoryId?.storeId?.address}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack gap={1}>
              <Typography variant='h2' sx={{ paddingTop: '15px' }}>
                Thông tin lịch đặt
              </Typography>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Stack direction='column' gap={1}>
                    <Typography variant='h3'>Dịch vụ đã đặt</Typography>
                    <Stack gap={2} direction='row' alignItems='center'>
                      <Avatar
                        src={orderServiceInfo.serviceId.image}
                        variant='rounded'
                        sx={{ width: '80px', height: '80px' }}
                      />
                      <Stack gap={1}>
                        <Stack gap={0.5}>
                          <Typography variant='h3'>{orderServiceInfo.serviceId.name}</Typography>
                          <Typography variant='body1' lineHeight={1}>
                            Giá tiền: {formatPrice(orderServiceInfo.serviceId.price)}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                          <Typography variant='body1'>Đánh giá trung bình: 3</Typography>
                          <Grade sx={{ color: yellow[600] }} />
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction='column' gap={1}>
                    <Typography variant='h3'>Thông tin người đặt</Typography>
                    <Stack gap={0.5}>
                      <Typography variant='body1' lineHeight={1}>
                        Họ tên: {orderServiceInfo.infoUser.name}
                      </Typography>
                      <Typography variant='body1' lineHeight={1}>
                        Số điện thoại: {orderServiceInfo.infoUser.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction='column' gap={1} sx={{ marginTop: '10px' }}>
                    <Typography variant='h3'>Nhân viên</Typography>
                    <Stack gap={2} direction='row' alignItems='center'>
                      <Avatar
                        src={orderServiceInfo?.staff?.avt}
                        variant='rounded'
                        sx={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          boxShadow:
                            '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                        }}
                      />
                      <Stack direction='column' spacing={0.5}>
                        <Typography variant='subtitle1' lineHeight={1}>
                          {orderServiceInfo?.staff?.name}
                        </Typography>
                        <Typography variant='body1' lineHeight={1}>
                          Nhân viên Massage
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction='column' justifyContent='flex-start' sx={{ marginTop: '10px' }}>
              <Typography variant='h3'>Chi tiết chỉnh sửa </Typography>
              <Timeline sx={{ maxHeight: '200px', overflowY: 'scroll', margin: '0', padding: '0' }}>
                {orderServiceInfo.activityLog &&
                  orderServiceInfo.activityLog.map((item) => (
                    <TimelineItem sx={{ padding: '0' }}>
                      <TimelineOppositeContent sx={{ flex: 0.5, paddingLeft: '0' }}>
                        <Typography variant='h6' component='span'>
                          {formatHourMinuteSecond(new Date(item.userId.createdAt))} -{' '}
                          {dateFormat(new Date(item.userId.createdAt))}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant='h6'>{item.userId.username}</Typography>
                        <Typography> {item.content}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </Stack>
          </GlassBox>
        )}
      </Container>
    </Modal>
  )
}

export default ModalInfo
