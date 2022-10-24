import { Container, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import voucherApi from '../../../api/voucher'

const DeleteVoucher = ({ openModalDelete, onCloseModal, registerId, title }) => {
  const deleteItem = async (id) => {
    try {
      await voucherApi.delete(id)
      onCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = () => {
    if (registerId) return deleteItem(registerId)
    onCloseModal()
  }

  return (
    <Modal open={openModalDelete} onClose={onCloseModal}>
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
        <GlassBox opacity={1}>
          <Stack gap={2}>
            <Typography variant='h3'>{title}</Typography>
            <Stack direction='row' justifyContent='space-between'>
              <MainButton colorType='neutral' onClick={onCloseModal}>
                Hủy
              </MainButton>
              <MainButton colorType='primary' onClick={handleNext}>
                Xác nhận
              </MainButton>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default DeleteVoucher
