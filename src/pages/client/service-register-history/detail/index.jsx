import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab'
import {
  Avatar,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import calendarApi from '../../../../api/calendar'
import GlassBox from '../../../../components/GlassBox'
import { getStatusColor } from '../../../../utils/aboutColor'
import { dateFormat, formatDateToHour } from '../../../../utils/dateFormat'
import formatPrice from '../../../../utils/formatPrice'
import { Link as RouterLink } from 'react-router-dom'

const DetailServiceRegistered = () => {
  const [detailOrder, setDetailOrder] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const handleGetDetailOrder = async (id) => {
    try {
      const data = await calendarApi.getDetailOrder(id)

      let totalPrice = data.servicesRegistered
        .map((item) => item.service.price)
        .reduce((prev, next) => prev + next)

      if (data.voucher) {
        totalPrice = totalPrice - (totalPrice * data.voucher.discount) / 100
      }
      setTotalPrice(totalPrice)
      setDetailOrder(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetDetailOrder(id)
  }, [id])

  return (
    <Container maxWidth='xl' sx={{ py: 3 }}>
      <Stack gap={2}>
        <Link component={RouterLink} to='/service-register-history?page=1' underline='none'>
          {' '}
          {'< '} Quay lại
        </Link>
        <Typography variant='h2'> Chi tiết lịch đặt</Typography>
        {loading ? (
          <Stack sx={{ height: '80vh' }} justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <GlassBox>
                <Stack gap={2}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Stack gap={1}>
                      <Typography variant='h3'>Thông tin cá nhân</Typography>
                      <Stack>
                        <Typography variant='body1'>Họ tên: {detailOrder.infoUser.name}</Typography>
                        <Typography variant='body1'>
                          Số điện thoại: {detailOrder.infoUser.phone}
                        </Typography>
                        <Typography variant='body1'>
                          Ngày đăng ký: {dateFormat(detailOrder.startDate)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Chip
                      label={detailOrder.status.name}
                      color={getStatusColor(detailOrder.status.type)}
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Typography variant='h3'>Dịch vụ đăng ký</Typography>
                    <Stack gap={2}>
                      {detailOrder.servicesRegistered.map((item) => (
                        <Stack gap={1}>
                          <Stack direction='row' gap={1.5}>
                            <Avatar
                              src={item.service.image}
                              sx={{
                                width: { xs: '40px', md: '55px' },
                                height: { xs: '40px', md: '55px' },
                              }}
                            />
                            <Stack>
                              <Typography variant='h3' color='text.secondary'>
                                {item.service.name}
                              </Typography>
                              <Typography variant='body1' color='primary'>
                                {formatPrice(item.service.price)}
                              </Typography>
                              <Typography variant='body2'>
                                Giờ làm: {formatDateToHour(item.timeStart)}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack direction='row' gap={1.5} ml={3}>
                            <Divider orientation='vertical' flexItem />
                            <Avatar
                              src={item.staff.avt}
                              sx={{
                                width: { xs: '35px', md: '45px' },
                                height: { xs: '35px', md: '45px' },
                              }}
                            />
                            <Stack>
                              <Typography variant='h3' color='text.secondary'>
                                {item.staff.name}
                              </Typography>
                              <Typography variant='body1'>Nhân viên</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <Stack gap={1}>
                    <Typography variant='h3'>Voucher</Typography>
                    {detailOrder.voucher ? (
                      <Chip
                        label={`${detailOrder.title} - ${detailOrder.discount}%`}
                        color='primary'
                        variant='outlined'
                      />
                    ) : (
                      <Typography variant='h4'>Không có voucher nào được sử dụng</Typography>
                    )}
                  </Stack>
                  <Divider />
                  <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                    <Typography variant='h3' color='primary'>
                      Tổng: {formatPrice(totalPrice)}
                    </Typography>
                  </Stack>
                </Stack>
              </GlassBox>
            </Grid>
            <Grid item xs={12} md={5}>
              <GlassBox>
                <Stack gap={2}>
                  <Typography variant='h3'>Lịch sử hoạt động</Typography>
                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                      },
                    }}
                  >
                    {detailOrder.activityLog.map((item) => (
                      <TimelineItem>
                        <TimelineOppositeContent>
                          <Stack>
                            <Typography>{dateFormat(item.createdAt)}</Typography>
                            <Typography>{formatDateToHour(item.createdAt)}</Typography>
                          </Stack>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Stack direction='row' gap={1}>
                            <Avatar src={item.userId.avt} sx={{ width: '35px', height: '35px' }} />
                            <Stack>
                              <Typography variant='h3'>{item.userId.name}</Typography>
                              <Typography variant='body1'>{item.content}</Typography>
                            </Stack>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Stack>
              </GlassBox>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Container>
  )
}

export default DetailServiceRegistered
