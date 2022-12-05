import { Delete, Edit, FilterAlt } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import categoryApi from '../../../api/category'
import userApis from '../../../api/user'
import DataGridCustom from '../../../components/DataGridCustom'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'
import { RHFAutoComplete } from '../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import { dateFormat } from '../../../utils/dateFormat'

const DEFAULT_VALUE = {
  name: '',
  email: '',
  phone: '',
  category: '',
  birthday: null,
}

const ListStaff = () => {
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [categoryOpts, setCategoryOpts] = useState([])
  const [params, setParams] = useState(null)

  const methods = useForm({
    defaultValues: DEFAULT_VALUE,
  })

  const { handleSubmit, reset } = methods

  const cols = [
    {
      field: 'no',
      headerName: 'STT',
      width: 50,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      renderCell: (params) => {
        const value = params.row
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar src={value.avt} sx={{ width: '40px', height: '40px' }} />
            <Typography variant='body1'>{value.name}</Typography>
          </Stack>
        )
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    ,
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
    },
    {
      field: 'birthday',
      headerName: 'Năm sinh',
      width: 150,
      valueGetter: (params) => {
        return params.value ? dateFormat(params.value) : ''
      },
    },
    {
      field: 'position',
      headerName: 'Vị trí',
      flex: 1,
      valueGetter: (params) => {
        return `Nhân viên "${params.value}"`
      },
    },
    ,
    {
      field: 'action',
      headerName: 'Hành động',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack direction='row'>
            <IconButton color='secondary'>
              <Edit />
            </IconButton>
            <IconButton color='primary'>
              <Delete />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  const onSubmit = (value) => {
    setLoading(true)
    const { name, email, phone, category, birthday } = value
    const filter = {
      ...(name && {
        name,
      }),
      ...(email && {
        email,
      }),
      ...(phone && {
        phone,
      }),
      ...(category && {
        category: category.value,
      }),
      ...(birthday && {
        birthday,
      }),
    }
    setParams(filter)
  }

  const handlePageChange = (page) => {
    setLoading(true)
    setPage(page + 1)
  }

  const handleCancelFilter = () => {
    if (!params) return
    setLoading(true)
    reset()
    setParams(null)
  }

  const handleGetStaff = async (page, params) => {
    try {
      const data = await userApis.getStaffPerPage(page, params)
      const staffs = data.data.map((item, index) => ({
        id: item._id,
        no: index + 1,
        name: item?.name,
        avt: item.avt,
        email: item.email,
        phone: item.phone,
        birthday: item.birthday,
        position: item.category?.name,
      }))
      setRows(staffs)
      setRowCount(data.total)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetCategory = async () => {
    try {
      const data = await categoryApi.getAll()
      const cateOpts = data
        .filter((item) => item._id !== '63518497a3ca43d2916000cc' && item.status !== 0)
        .map((item) => ({
          label: `Nhân viên "${item.name}"`,
          value: item._id,
        }))
      setCategoryOpts(cateOpts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCategory()
  }, [])

  useEffect(() => {
    handleGetStaff(page, params)
  }, [params, page])

  return (
    <GlassBox>
      <Stack gap={2}>
        <Stack gap={1}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h3'>Lọc</Typography>
            <IconButton color='primary' sx={{ display: { xs: 'flex', md: 'none' } }}>
              <FilterAlt />
            </IconButton>
          </Stack>
          <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 1, md: 3 }}>
              <Grid item xs={12} sm={4} lg={2.4}>
                <RHFTextField name='name' label='Tìm theo tên' />
              </Grid>
              <Grid item xs={12} sm={4} lg={2.4}>
                <RHFTextField name='phone' label='Số điện thoại' />
              </Grid>
              <Grid item xs={12} sm={4} lg={2.4}>
                <RHFTextField name='email' label='Email' />
              </Grid>
              <Grid item xs={12} sm={6} lg={2.4}>
                <RHFDatePicker name='birthday' label='Ngày sinh' />
              </Grid>
              <Grid item xs={12} sm={6} lg={2.4}>
                <RHFAutoComplete options={categoryOpts} name='category' label='Vị trí' />
              </Grid>
              <Grid item xs={12}>
                <Stack direction='row' justifyContent='flex-end' gap={1}>
                  <MainButton
                    onClick={handleCancelFilter}
                    colorType='neutral'
                    sx={{ borderRadius: '50px', px: 3 }}
                  >
                    Hủy lọc
                  </MainButton>
                  <MainButton
                    type='submit'
                    colorType='primary'
                    sx={{ px: 5, borderRadius: '50px' }}
                  >
                    Lọc
                  </MainButton>
                </Stack>
              </Grid>
            </Grid>
          </RHFProvider>
        </Stack>
        <Box sx={{ height: '800px' }}>
          <DataGridCustom
            columns={cols}
            rows={rows}
            pageSize={10}
            page={page - 1}
            paginationMode='server'
            pagination
            rowsPerPageOptions={[10]}
            onPageChange={(page) => handlePageChange(page)}
            rowCount={rowCount}
            loading={loading}
          />
        </Box>
      </Stack>
    </GlassBox>
  )
}

export default ListStaff
