import React, { useState } from 'react'
import GlassBox from '../../../components/GlassBox'
import voucherApi from '../../../api/voucher'
import { useEffect } from 'react'
import {
  IconButton,
  Stack,
  useMediaQuery,
  Grid,
  InputBase,
  useTheme,
  Chip,
  MenuItem,
  Typography,
} from '@mui/material'
import { Delete, ModeEditOutline, RemoveRedEye, Search } from '@mui/icons-material'
import DataGridCustom from '../../../components/DataGridCustom'
import EditVoucher from '../../../sections/admin/voucher/EditVoucher'
import DeleteVoucher from '../../../sections/admin/voucher/DeleteVoucher'
import { dateFormat } from '../../../utils/dateFormat'
import ModalInfo from './ModalInfo'
import { useForm } from 'react-hook-form'
import MainButton from '../../../components/MainButton'
import ModalRegisterForm from '../../../sections/admin/voucher/ModalRegisterForm'
import { useSearchParams } from 'react-router-dom'

const VoucherTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [registerId, setRegisterId] = useState()
  const { register, handleSubmit } = useForm()
  const [searchParams, setSearchParams] = useSearchParams({})

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
            <MenuItem
              onClick={() => {
                setRegisterId(params.id)
                setOpenModal(true)
              }}
            >
              <RemoveRedEye color='secondary' />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setRegisterId(params.id)
                setOpenModalEdit(true)
              }}
              disabled={params.row.isUsed === true}
            >
              <ModeEditOutline color='secondary' />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setRegisterId(params.id)
                setDialogTitle('Bạn có chắc muốn xóa voucher không?')
                setOpenModalDelete(true)
              }}
              disabled={params.row.isUsed === true}
            >
              <Delete color='primary' />
            </MenuItem>
          </Stack>
        )
      },
    },
  ]

  const handleGetVoucherRegister = async () => {
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

  const key = searchParams.get('key')

  const onSubmit = (data) => {
    setSearchParams({ key: data.key })
  }

  const getVoucherByKey = async (keyword) => {
    try {
      const data = await voucherApi.search(keyword)
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
    if (key) {
      getVoucherByKey(key)
    } else {
      handleGetVoucherRegister()
    }
  }, [key])

  return (
    <Stack gap={2}>
      <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
        <Grid container paddingBottom={{ md: '50px', xs: '15px' }}>
          <Grid item xs={10} md={6}>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
              <GlassBox
                sx={{
                  p: '5px 5px 5px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 1,
                  height: '50px',
                  borderRadius: '10px',
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Tìm kiếm voucher'
                  inputProps={{ 'aria-label': 'Tìm kiếm voucher' }}
                  {...register('key')}
                />
                <IconButton
                  type='submit'
                  sx={{ p: '10px', backgroundColor: theme.palette.primary.main, color: '#fff' }}
                  aria-label='search'
                >
                  <Search />
                </IconButton>
              </GlassBox>
            </form>
          </Grid>
          <Grid
            item
            xs={2}
            md={6}
            sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <MainButton
              colorType='primary'
              sx={{ alignSelf: 'flex-end', padding: '10px 35px' }}
              onClick={() => setOpenModalRegister(true)}
            >
              <Typography variant='h6'>Thêm +</Typography>
            </MainButton>
          </Grid>
        </Grid>
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
          confirm={handleGetVoucherRegister}
        />
      )}
      {openModalDelete && (
        <DeleteVoucher
          openModalDelete={openModalDelete}
          onCloseModal={() => setOpenModalDelete(false)}
          registerId={registerId}
          resetVoucher={() => setRegisterId(null)}
          title={dialogTitle}
          confirm={handleGetVoucherRegister}
        />
      )}
      {openModalRegister && (
        <ModalRegisterForm
          openModalRegister={openModalRegister}
          onCloseModal={() => setOpenModalRegister(false)}
          confirm={handleGetVoucherRegister}
        />
      )}
    </Stack>
  )
}

export default VoucherTable
