import React, { useState } from 'react'
import GlassBox from '../../../components/GlassBox'
import categoryApi from '../../../api/category'
import { useEffect } from 'react'
import {
  IconButton,
  Stack,
  useMediaQuery,
  Typography,
  Grid,
  InputBase,
  useTheme,
  Switch,
  MenuItem,
} from '@mui/material'
import { Delete, ModeEditOutline, Search } from '@mui/icons-material'
import DataGridCustom from '../../../components/DataGridCustom'
import EditCategoryService from '../../../sections/admin/categoryService/EditForm'
import MainButton from '../../../components/MainButton'
import ModalRegisterForm from '../../../sections/admin/categoryService/ModalRegisterForm'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import DeleteCategory from './DeleteCategory'

const CategoryServicesTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
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
      field: 'infoCategory',
      headerName: 'Tên danh mục',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return `${params.row.name}`
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.row
        if (cellData.status == 0) {
          return <Switch disabled />
        } else {
          return <Switch disabled checked />
        }
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={2}>
            <MenuItem
              onClick={() => {
                setRegisterId(params.id)
                setDialogTitle('Bạn có chắc muốn xóa danh mục này không?')
                setOpenModalDelete(true)
              }}
              disabled={params.row.isUsed === true}
            >
              <Delete color='primary' />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setRegisterId(params.id)
                setOpenModal(true)
              }}
            >
              <ModeEditOutline color='secondary' />
            </MenuItem>
          </Stack>
        )
      },
    },
  ]

  const handleGetCateforyServicesRegister = async () => {
    try {
      const data = await categoryApi.getAll()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
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
      const data = await categoryApi.search(keyword)
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
      handleGetCateforyServicesRegister()
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
                  placeholder='Tìm kiếm danh mục dịch vụ...'
                  inputProps={{ 'aria-label': 'Tìm kiếm danh mục dịch vụ' }}
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
        <EditCategoryService
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          registerId={registerId}
          resetCategory={() => setRegisterId(null)}
          confirm={handleGetCateforyServicesRegister}
        />
      )}
      {openModalRegister && (
        <ModalRegisterForm
          openModalRegister={openModalRegister}
          onCloseModal={() => setOpenModalRegister(false)}
          confirm={handleGetCateforyServicesRegister}
        />
      )}
      {openModalDelete && (
        <DeleteCategory
          openModalDelete={openModalDelete}
          onCloseModal={() => setOpenModalDelete(false)}
          registerId={registerId}
          resetCategory={() => setRegisterId(null)}
          title={dialogTitle}
          confirm={handleGetCateforyServicesRegister}
        />
      )}
    </Stack>
  )
}

export default CategoryServicesTable
