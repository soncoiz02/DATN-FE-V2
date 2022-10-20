import { Close } from '@mui/icons-material'
import {
  Avatar,
  Chip,
  Container,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import calendarApi from '../../../../../api/calendar'
import GlassBox from '../../../../../components/GlassBox'
import MainButton from '../../../../../components/MainButton'
import useAuth from '../../../../../hook/useAuth'
import { dateFormat, formatDateToHour } from '../../../../../utils/dateFormat'
import formatPrice from '../../../../../utils/formatPrice'
import { getHtmlTemplate } from './htmlTemplate'

const ModalPay = ({ openModal, onCloseModal, orderId, getListOrder }) => {
  const [detailOrder, setDetailOrder] = useState()

  const { userInfo } = useAuth()

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleAcceptPay = () => {
    const storeInfo = detailOrder.serviceId.categoryId.storeId
    const serviceUsed = detailOrder.serviceId
    const user = detailOrder.userId

    const htmlTemplate = getHtmlTemplate({ storeInfo, serviceUsed, user })

    const billData = {
      order: orderId,
      store: userInfo.storeId,
      user: detailOrder.userId,
    }

    const activityLog = {
      content: 'Đã thanh toán hóa đơn',
      orderId,
      userId: userInfo._id,
    }

    const emailOption = {
      from: userInfo.email,
      to: detailOrder.userId.email,
      subject: `${storeInfo.name} gửi bạn hóa đơn. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.`,
      html: htmlTemplate,
    }

    handleCreateBill({ billData, activityLog, emailOption })
  }

  const handleCreateBill = async (data) => {
    try {
      await calendarApi.createBill(data)
      getListOrder()
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetDetailOrder = async () => {
    try {
      const data = await calendarApi.getDetailOrder(orderId)
      setDetailOrder(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (orderId) handleGetDetailOrder()
  }, [orderId])

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          py: { xs: '15px', md: '30px' },
        }}
      >
        <GlassBox opacity={1} sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }}>
          <Stack gap={3}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Divider sx={{ width: '100%' }}>
                <Chip
                  color='primary'
                  label={<Typography variant='h3'>Thông tin hóa đơn</Typography>}
                />
              </Divider>
              <IconButton
                onClick={handleCloseModal}
                sx={{ position: 'absolute', right: '10px', top: '10px' }}
              >
                <Close />
              </IconButton>
            </Stack>
            {detailOrder && (
              <Stack gap={3}>
                <Stack gap={1}>
                  <Typography variant='h4'>Thông tin người dùng</Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 0, sm: 5 }}>
                    <Stack>
                      <Typography variant='body2'>Họ tên: {detailOrder.infoUser.name}</Typography>
                      <Typography variant='body2'>
                        Số điện thoại: {detailOrder.infoUser.phone}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant='body2'>
                        Ngày làm: {dateFormat(new Date(detailOrder.startDate))}
                      </Typography>
                      <Typography variant='body2'>
                        Thời gian: {formatDateToHour(detailOrder.startDate)} -{' '}
                        {formatDateToHour(detailOrder.endDate)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack gap={1.5}>
                  <Typography variant='h4'>Dịch vụ sử dụng</Typography>
                  <Stack>
                    <Stack direction='row' gap={1}>
                      <Avatar
                        sx={{ width: '50px', height: '50px' }}
                        variant='rounded'
                        src={detailOrder.serviceId.image}
                      />
                      <Stack gap={0.5}>
                        <Typography variant='h4' color='primary'>
                          {detailOrder.serviceId.name}
                        </Typography>
                        <Typography variant='body2'>
                          {formatPrice(detailOrder.serviceId.price)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack gap={1}>
                  <Typography variant='h4'>Voucher sử dụng</Typography>
                  <Typography variant='body2' textAlign='center'>
                    Không có voucher nào được sử dụng
                  </Typography>
                </Stack>
                <Stack gap={1}>
                  <Typography variant='h4'>Thành tiền</Typography>
                  <Stack>
                    <Stack direction='row' gap={1} justifyContent='space-between'>
                      <Typography variant='body2'>Tổng tiền dịch vụ: </Typography>
                      <Typography variant='body2'>
                        {formatPrice(detailOrder.serviceId.price)}
                      </Typography>
                    </Stack>
                    <Stack direction='row' gap={1} justifyContent='space-between'>
                      <Typography variant='body2'>Voucher áp dụng: </Typography>
                      <Typography variant='body2'>- {formatPrice(0)}</Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack direction='row' gap={1} justifyContent='space-between'>
                      <Typography variant='h3'>Tổng</Typography>
                      <Typography variant='h4' color='primary'>
                        {formatPrice(detailOrder.serviceId.price)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            )}

            <Stack direction='row' justifyContent='space-between' sx={{ mt: 3 }}>
              <MainButton
                colorType='neutral'
                onClick={handleCloseModal}
                sx={{ px: 3, background: 'rgba(0,0,0,0.05)' }}
              >
                <Typography variant='body1'>Hủy</Typography>
              </MainButton>
              <MainButton colorType='primary' onClick={handleAcceptPay}>
                <Typography variant='body1'>Thanh toán</Typography>
              </MainButton>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default ModalPay