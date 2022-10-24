import React, { useState } from 'react'
import GlassBox from '../../../components/GlassBox'
import voucherApi from '../../../api/voucher'
import { useEffect } from 'react'
import { IconButton, Stack, useMediaQuery, useTheme, Chip } from '@mui/material'
import { Delete, ModeEditOutline, RemoveRedEye } from '@mui/icons-material'
import DataGridCustom from '../../../components/DataGridCustom'
import EditVoucher from '../../../sections/admin/voucher/EditVoucher'
import { dateFormat } from '../../../utils/dateFormat'
import ModalInfo from './ModalInfo'

const VoucherTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [registerId, setRegisterId] = useState()

  const deleteItem = async (id) => {
    try {
      await voucherApi.delete(id)
      handleGetCateforyServicesRegister()
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'title',
      headerName: 'Tên voucher',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return `${params.row.title}`
      },
    },
    {
      field: 'discount',
      headerName: 'Giảm',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return `${params.row.discount}%`
      },
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return dateFormat(new Date(params.row.startDate))
      },
    },
    {
      field: 'endDate',
      headerName: 'Ngày kết thúc',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return dateFormat(new Date(params.row.endDate))
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.row.isUsed
        if (cellData === true) return <Chip label='Đã sử dụng' color='success' />
        if (cellData === false) return <Chip label='Chưa sử dụng' color='warning' />
        return
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={3}>
            <IconButton
              onClick={() => {
                setRegisterId(params.id)
                setOpenModal(true)
              }}
            >
              <RemoveRedEye color='secondary' />
            </IconButton>
            <IconButton
              onClick={() => {
                setRegisterId(params.id)
                setOpenModalEdit(true)
              }}
            >
              <ModeEditOutline color='secondary' />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteItem(params.id)
                setOpenModalDelete(true)
              }}
            >
              <Delete color='primary' />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  const handleGetCateforyServicesRegister = async () => {
    try {
      const data = await voucherApi.getAll()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
        time: {
          startDate: item.startDate,
          endDate: item.endDate,
        },
      }))
      setRows(rowData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetCateforyServicesRegister()
  }, [])

  return (
    <Stack gap={2}>
      <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
        <DataGridCustom rows={rows} columns={columns} />
      </GlassBox>
      {openModal && (
        <ModalInfo
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          registerId={registerId}
        />
      )}
      {openModalEdit && (
        <EditVoucher
          openModalEdit={openModalEdit}
          onCloseModal={() => setOpenModalEdit(false)}
          registerId={registerId}
          resetVoucher={() => setRegisterId(null)}
        />
      )}
      {openModalDelete && (
        <EditVoucher
          openModalDelete={openModalDelete}
          onCloseModal={() => setOpenModalDelete(false)}
          registerId={registerId}
          resetVoucher={() => setRegisterId(null)}
        />
      )}
    </Stack>
  )
}

export default VoucherTable
