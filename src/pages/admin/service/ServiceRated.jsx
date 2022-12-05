import { Star } from '@mui/icons-material'
import {
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Avatar,
  Rating,
  Button,
  Box,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import serviceApi from '../../../api/service'
import MainButton from '../../../components/MainButton'
import { CustomProgress } from '../../../sections/client/detail-services/RatedTab'
import { dateFormat, formatDateToHour } from '../../../utils/dateFormat'

const ServiceRated = () => {
  const [page, setPage] = useState(1)
  const [serviceRated, setServiceRated] = useState()
  const [listRated, setListRated] = useState([])

  const serviceId = useParams().id

  const handleGetServiceRated = async (page) => {
    try {
      const data = await serviceApi.getServiceRatedPerPage(page, serviceId)
      setServiceRated({
        service: data.service,
        total: data.total,
        avg: data.avg,
        detailRated: data.detailRated,
      })
      setListRated([...listRated, ...data.listRated])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServiceRated(page)
  }, [page, serviceId])

  return (
    <Stack gap={2}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Link
          underline='none'
          color='GrayText'
          component={RouterLink}
          to='/admin/services-management'
        >
          Dịch vụ
        </Link>
        <Typography variant='body1' color='primary'>
          Đánh giá
        </Typography>
      </Breadcrumbs>
      <Stack gap={2} sx={{ pb: 5 }}>
        <Typography variant='h2' color='text.secondary'>
          Đánh giá dịch vụ "{serviceRated?.service.name}"
        </Typography>
        <Divider />
        {serviceRated?.total > 0 ? (
          <>
            <Stack gap={1}>
              <Typography component={Stack} direction='row' gap={1} variant='h3'>
                Tổng số:{' '}
                <Typography variant='h3' color='primary'>
                  {serviceRated?.total}
                </Typography>
                đánh giá
              </Typography>
              <Typography component={Stack} direction='row' alignItems='flex-end' variant='h3'>
                Đánh giá trung bình:{' '}
                <Typography variant='h3' ml={1} color='primary'>
                  {+serviceRated?.avg?.toFixed(1)}
                </Typography>
                /5 <Star color='warning' />
              </Typography>
            </Stack>
            <Stack gap={2}>
              <Typography variant='h3'>Chi tiết:</Typography>
              {serviceRated?.detailRated.map((info) => (
                <Stack direction='row' gap={1.5} alignItems='center' key={info.star}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitile1'>{info.star}</Typography>
                    <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                  </Stack>
                  <Box sx={{ width: '100%' }}>
                    <CustomProgress variant='determinate' value={info.count * 10} />
                  </Box>
                  <Typography variant='subtitile1'>{info.count}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack gap={2}>
              <Typography variant='h3'>Danh sách:</Typography>
              {listRated?.map((item) => (
                <Stack direction='row' gap={2} key={item._id}>
                  <Avatar
                    src={item.userId.avt}
                    sx={{ width: { xs: '35px', md: '50px' }, height: { xs: '35px', md: '50px' } }}
                  />
                  <Stack>
                    <Stack direction='row' gap={1} alignItems='center'>
                      <Typography variant='h3'>{item.userId.name}</Typography>
                      <Typography variant='body1'>
                        {formatDateToHour(item.createdAt)} - {dateFormat(item.createdAt)}
                      </Typography>
                    </Stack>
                    <Rating value={item.rate} readOnly />
                    <Typography variant='body1' mt={1}>
                      {item.content}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
              {listRated?.lenght < serviceRated?.total && (
                <MainButton
                  onClick={() => setPage(page + 1)}
                  sx={{ alignSelf: 'center', px: 3 }}
                  colorType='primary'
                >
                  Xem thêm
                </MainButton>
              )}
            </Stack>
          </>
        ) : (
          <Typography variant='h3'>Chưa có đánh giá nào</Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default ServiceRated
