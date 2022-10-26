import { Container, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'

const DialogConfirm = ({ openDialog, closeDialog, next, title }) => {
  const handleNext = () => {
    next()
    closeDialog()
  }

  return (
    <Modal open={openDialog} onClose={closeDialog}>
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
              <MainButton colorType='neutral' onClick={closeDialog}>
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

export default DialogConfirm
