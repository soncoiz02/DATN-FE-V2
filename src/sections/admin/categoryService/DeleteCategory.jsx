import { Container, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import categoryApi from '../../../api/category'
import { toast } from 'react-toastify'
import { useState } from 'react'

const DeleteCategory = ({ openModalDelete, onCloseModal, registerId, title, confirm }) => {
  const [loading, setLoading] = useState(false)
  const deleteItem = async (id) => {
    try {
      await categoryApi.delete(id)
      onCloseModal()
      toast.dark('Xóa thành công')
      setLoading(false)
      confirm()
    } catch (error) {
      toast.dark('Xóa thất bại')
    }
  }

  const handleDelete = () => {
    setLoading(true)
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
              <MainButton colorType='primary' disabled={loading} onClick={handleDelete}>
                Xác nhận
              </MainButton>
            </Stack>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

export default DeleteCategory
