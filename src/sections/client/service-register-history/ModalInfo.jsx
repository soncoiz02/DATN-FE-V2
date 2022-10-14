import React, { useState, useEffect } from 'react'
import { Grade } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Modal,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import GlassBox from '../../../components/GlassBox'
import orderApi from '../../../api/order'
import formatPrice from '../../../utils/formatPrice'
import { dateFormat } from '../../../utils/dateFormat'

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
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
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
            <Stack gap={2} direction='row' alignItems='center'>
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
                <Typography variant='h2' color='text.primaryChannel'>
                  Mây Beauty & Clinic Spa
                </Typography>
                <Typography variant='subtitle2'>Địa chỉ: 20 Trung Hòa, Cầu Giấy, Hà Nội</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack gap={2}>
              <Typography variant='h2' color='text.secondary' sx={{ paddingTop: '15px' }}>
                Thông tin lịch đặt
              </Typography>
              <Stack direction='column' gap={1.5}>
                <Typography variant='h3' color='text.primaryChannel'>
                  Dịch vụ đã đặt
                </Typography>
                <Stack gap={2} direction='row' alignItems='center'>
                  <Avatar
                    src={orderServiceInfo.serviceId.image}
                    variant='rounded'
                    sx={{ width: '80px', height: '80px' }}
                  />
                  <Stack gap={1}>
                    <Stack gap={0.5}>
                      <Typography variant='h3' color='primary'>
                        {orderServiceInfo.serviceId.name}
                      </Typography>
                      <Typography variant='body1' lineHeight={1}>
                        Giá tiền:{' '}
                        <PrimaryText variant='subtitle1' color='primary'>
                          {formatPrice(orderServiceInfo.serviceId.price)}
                        </PrimaryText>
                      </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='body1'>
                        Đánh giá trung bình:{' '}
                        <PrimaryText variant='subtitle1' color='primary'>
                          3
                        </PrimaryText>
                      </Typography>
                      <Grade sx={{ color: yellow[600] }} />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction='column' gap={1.5}>
                <Typography variant='h3' color='text.primaryChannel'>
                  Thông tin người đặt
                </Typography>
                <Stack gap={0.5}>
                  <Typography variant='body1' lineHeight={1}>
                    Họ tên:{' '}
                    <PrimaryText variant='subtitle1' color='primary'>
                      {orderServiceInfo.infoUser.name}
                    </PrimaryText>
                  </Typography>
                  <Typography variant='body1' lineHeight={1}>
                    Số điện thoại:{' '}
                    <PrimaryText variant='subtitle1' color='primary'>
                      {orderServiceInfo.infoUser.phone}
                    </PrimaryText>
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction='column' gap={1.5}>
                <Typography variant='h3' color='text.primaryChannel'>
                  Nhân viên
                </Typography>
                <Stack gap={2} direction='row' alignItems='center'>
                  <Avatar
                    src='https://i.pinimg.com/474x/c5/fe/7a/c5fe7a4c245cf843b34cea8c53c29924.jpg'
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
                    <Typography variant='subtitle1' color='primary' lineHeight={1}>
                      Trần Bảo Sơn
                    </Typography>
                    <Typography variant='body1' lineHeight={1}>
                      Chức vụ:{' '}
                      <PrimaryText variant='subtitle2' color='primary'>
                        {' '}
                        Nhân viên Massage{' '}
                      </PrimaryText>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ paddingTop: '10px' }}
            >
              <Typography variant='body2'>
                Đã chỉnh sửa:{' '}
                <PrimaryText variant='subtitle2' color='primary'>
                  {renderDateFormated(orderServiceInfo.updatedAt)}
                </PrimaryText>
              </Typography>
              <Chip label='Đang chờ xác nhận' color='primary' />
            </Stack>
          </GlassBox>
        )}
      </Container>
    </Modal>
  )
}

const StyleBackground = styled('img')`
  width: 100%;
  max-width: 100%;
  height: 200px;
  max-height: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 150px;
  }
`

const PrimaryText = styled('span')(
  ({ theme }) => `
        font-weight: 700;
        color: ${theme.palette.primary.main}; 
    `,
)

export default ModalInfo
