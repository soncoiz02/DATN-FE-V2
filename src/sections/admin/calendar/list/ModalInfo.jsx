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
import { dateFormat } from '../../../../utils/dateFormat'
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
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
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
              <Typography variant='h2' color='text.secondary'>
                Thông tin lịch đặt
              </Typography>
              <Stack gap={1}>
                <Typography variant='h3' color='text.primaryChannel'>
                  Thông tin khách hàng
                </Typography>
                <Stack>
                  <Typography variant='body1'>
                    Họ tên: <PrimaryText>{registeredServiceInfo.infoUser.name}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Số điện thoại: <PrimaryText>{registeredServiceInfo.infoUser.phone}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Thời gian: {renderDateFormated(registeredServiceInfo.startDate)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={1}>
                <Typography variant='h3' color='text.primaryChannel'>
                  Dịch vụ đăng ký
                </Typography>
                <Stack direction='row' gap={2}>
                  <Avatar
                    src={registeredServiceInfo.serviceId.image}
                    variant='rounded'
                    sx={{ width: '80px', height: '80px' }}
                  />
                  <Stack gap={1}>
                    <Typography variant='h3' color='primary'>
                      {registeredServiceInfo?.serviceId.name}
                    </Typography>
                    <Typography variant='h4' color='primary'>
                      {formatPrice(registeredServiceInfo.serviceId.price)}
                    </Typography>
                  </Stack>
                </Stack>
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
