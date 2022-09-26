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
import React from 'react'
import GlassBox from '../../../../components/GlassBox'
import formatPrice from '../../../../utils/formatPrice'

const ModalInfo = ({ openModal, onCloseModal }) => {
  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
      >
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
                  Họ tên: <PrimaryText>Trần Bảo Sơn</PrimaryText>
                </Typography>
                <Typography variant='body1'>
                  Số điện thoại: <PrimaryText>0911998563</PrimaryText>
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography variant='h3' color='text.primaryChannel'>
                Dịch vụ đăng ký
              </Typography>
              <Stack direction='row' gap={2}>
                <Avatar variant='rounded' sx={{ width: '80px', height: '80px' }} />
                <Stack gap={1}>
                  <Typography variant='h3' color='primary'>
                    Massage chân
                  </Typography>
                  <Typography variant='h4' color='primary'>
                    {formatPrice(500000)}
                  </Typography>
                  <Typography variant='body1'>10:00 - hôm nay</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Chip label='Đang chờ xác nhận' color='warning' sx={{ alignSelf: 'flex-start' }} />
          </Stack>
        </GlassBox>
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
