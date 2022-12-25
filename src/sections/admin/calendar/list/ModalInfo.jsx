import { Close } from '@mui/icons-material'
import {
  Avatar,
  Chip,
  Container,
  IconButton,
  Modal,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import serviceApi from '../../../../api/service'
import GlassBox from '../../../../components/GlassBox'
import { getStatusColor } from '../../../../utils/aboutColor'
import { dateFormat, formatDateToHour } from '../../../../utils/dateFormat'
import formatPrice from '../../../../utils/formatPrice'

const ModalInfo = ({ openModal, onCloseModal, registerId }) => {
  const [registeredServiceInfo, setRegisteredServiceInfo] = useState()
  const handleGetRegisteredServiceInfo = async (id) => {
    try {
      const data = await serviceApi.getRegisteredService(id)
      setRegisteredServiceInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    if (registerId) handleGetRegisteredServiceInfo(registerId)
  }, [registerId])

  return (
    <Modal open={openModal} onClose={onCloseModal} sx={{ py: 2, overflowY: 'auto' }}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {registeredServiceInfo && (
          <GlassBox opacity={1} sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }}>
            <IconButton
              onClick={onCloseModal}
              sx={{ position: 'absolute', right: '20px', top: '20px' }}
            >
              <Close />
            </IconButton>
            <Stack gap={2}>
              <Typography variant='h2'>Thông tin lịch đặt</Typography>
              <Stack gap={1}>
                <Typography variant='h3'>Thông tin khách hàng</Typography>
                <Stack>
                  <Typography variant='body1'>
                    Họ tên: {registeredServiceInfo.infoUser.name}
                  </Typography>
                  <Typography variant='body1'>
                    Số điện thoại: {registeredServiceInfo.infoUser.phone}
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={1}>
                <Typography variant='h3'>Dịch vụ đăng ký</Typography>
                <Stack direction='row' gap={5}>
                  {registeredServiceInfo &&
                    registeredServiceInfo.servicesRegistered.map((item) => (
                      <Stack direction='row' gap={2}>
                        <Avatar
                          src={item.service.image}
                          variant='rounded'
                          sx={{ width: '60px', height: '60px' }}
                        />
                        <Stack>
                          <Typography variant='h4'>{item.service.name}</Typography>
                          <Typography variant='body2' color='primary'>
                            {formatPrice(item.service.price)}
                          </Typography>
                          <Typography variant='body2'>
                            {formatDateToHour(item.timeStart)} - {formatDateToHour(item.timeEnd)}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Stack>
              <Stack gap={0.5}>
                <Typography variant='h3'>Voucher</Typography>
                {registeredServiceInfo.voucher ? (
                  <Chip
                    sx={{ alignSelf: 'flex-start' }}
                    variant='outlined'
                    label={`${registeredServiceInfo.voucher.title} - Giảm ${registeredServiceInfo.voucher.discount}%`}
                    color='primary'
                  />
                ) : (
                  <Typography variant='body2'>Không có voucher nào được sử dụng</Typography>
                )}
              </Stack>
              <Stack gap={1}>
                <Typography variant='h3'>Lịch sử hoạt động</Typography>
                {registeredServiceInfo &&
                  registeredServiceInfo.activityLog.map((item) => (
                    <Stack direction='row' gap={2}>
                      <Avatar src={item.userId.avt} sx={{ width: '30px', height: '30px' }} />
                      <Stack>
                        <Typography variant='h4'>{item.userId.name}</Typography>
                        <Typography variant='body2'>{item.content}</Typography>
                        {item.createdAt && (
                          <Typography variant='body2'>{`${formatDateToHour(
                            item.createdAt,
                          )} - ${dateFormat(item.createdAt)}`}</Typography>
                        )}
                      </Stack>
                    </Stack>
                  ))}
              </Stack>
              <Chip
                label={registeredServiceInfo.status.name}
                color={getStatusColor(registeredServiceInfo.status.type)}
                sx={{ alignSelf: 'flex-end' }}
              />
            </Stack>
          </GlassBox>
        )}
      </Container>
    </Modal>
  )
}

const PrimaryText = styled('span')(
  ({ theme }) => `
    font-weight: 700;
    color: ${theme.palette.primary.main}; 
`,
)

export default ModalInfo
