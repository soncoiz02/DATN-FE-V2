import { Close } from '@mui/icons-material'
import { Chip, Container, IconButton, Modal, Stack, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import voucherApi from '../../../api/voucher'
import GlassBox from '../../../components/GlassBox'
import { dateFormat } from '../../../utils/dateFormat'

const ModalInfo = ({ openModal, onCloseModal, registerId }) => {
  const [oneVoucher, setOneVoucher] = useState()
  const handleGetOneVoucher = async (id) => {
    try {
      const data = await voucherApi.getOne(id)
      setOneVoucher(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (registerId) handleGetOneVoucher(registerId)
  }, [registerId])

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
      >
        {oneVoucher && (
          <GlassBox opacity={1} sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }}>
            <IconButton
              onClick={onCloseModal}
              sx={{ position: 'absolute', right: '20px', top: '20px' }}
            >
              <Close />
            </IconButton>
            <Stack gap={2}>
              <Typography variant='h2' color='text.secondary'>
                Thông tin chi tiết Voucher
              </Typography>
              <Stack gap={1}>
                <Stack>
                  <Typography variant='body1'>
                    Tên: <PrimaryText>{oneVoucher.title}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Subject: <PrimaryText>{oneVoucher.subject}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Giảm: <PrimaryText>{oneVoucher.discount} %</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Mô tả: <PrimaryText>{oneVoucher.description}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Ngày bắt đầu:{' '}
                    <PrimaryText>{dateFormat(new Date(oneVoucher.startDate))}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Ngày kết thúc:{' '}
                    <PrimaryText>{dateFormat(new Date(oneVoucher.endDate))}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Người dùng: <PrimaryText>{oneVoucher.userId}</PrimaryText>
                  </Typography>
                  <Typography variant='body1'>
                    Trạng thái:{' '}
                    <Chip
                      label={oneVoucher.isUsed === true ? 'Đã sử dụng' : 'Chưa sử dụng'}
                      color={oneVoucher.isUsed === true ? 'success' : 'warning'}
                    />
                  </Typography>
                </Stack>
              </Stack>
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
