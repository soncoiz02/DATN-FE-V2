import { Block, Visibility } from '@mui/icons-material'
import { Container, IconButton, Modal, Stack, Switch, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userApis from '../../../api/user'
import DataGridCustom from '../../../components/DataGridCustom'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'

const ListUser = () => {
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const [banTitle, setBanTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [banId, setBanId] = useState('')

  const navigate = useNavigate()

  const cols = [
    {
      field: 'no',
      headerName: 'STT',
      width: 80,
    },
    {
      field: 'username',
      headerName: 'Tên người dùng',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Họ tên',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'birthday',
      headerName: 'Sinh nhật',
      flex: 1,
      valueGetter: (params) => {
        const value = params.value
        return value ? value : 'Chưa cập nhật'
      },
    },
    {
      field: 'totalOrder',
      headerName: 'Số lịch đặt',
      flex: 1,
    },
    {
      field: 'isBanned',
      headerName: 'Bị khóa',
      flex: 1,
      renderCell: (params) => {
        return <Switch value={params.value} disabled />
      },
    },
    {
      field: 'action',
      headerName: 'Hành động',
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Tooltip title='Chi tiết' placement='top'>
              <IconButton
                color='secondary'
                onClick={() => navigate(`/admin/users-management/${params.id}`)}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title='Khóa tài khoản' placement='top'>
              <IconButton color='primary'>
                <Block />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      },
    },
  ]

  const handlePageChange = (page) => {
    handleGetListUser(page + 1)
  }

  const onCloseModal = () => setOpenModal(false)

  const handleBanUser = (value, id) => {
    setBanId(id)
    if (value) {
      setBanTitle('Bạn có chắc muốn hủy cấm người này')
    } else {
      setBanTitle('Bạn có chắc muốn cấm người này')
    }
    setOpenModal(true)
  }

  const handleGetListUser = async (page) => {
    try {
      const data = await userApis.getListUser(page)
      setRows(data.data.map((item, index) => ({ ...item, id: item._id, no: index + 1 })))
      setRowCount(data.total)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListUser(page)
  }, [])

  return (
    <GlassBox
      sx={{
        overflowX: 'auto',
        overflowY: 'none',
        padding: { xs: '15px', sm: '30px' },
        height: '850px',
      }}
    >
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
          <GlassBox opacity={1}>
            <Stack gap={2}>
              <Typography variant='h3'>{banTitle}</Typography>
              <Stack direction='row' justifyContent='space-between'>
                <MainButton colorType='neutral' onClick={onCloseModal}>
                  Hủy
                </MainButton>
                <MainButton colorType='primary' disabled={isLoading}>
                  Xác nhận
                </MainButton>
              </Stack>
            </Stack>
          </GlassBox>
        </Container>
      </Modal>
      <DataGridCustom
        rows={rows}
        columns={cols}
        loading={isLoading}
        pageSize={10}
        page={page - 1}
        paginationMode='server'
        pagination
        rowsPerPageOptions={[10]}
        onPageChange={(page) => handlePageChange(page)}
        rowCount={rowCount}
      />
    </GlassBox>
  )
}

export default ListUser
