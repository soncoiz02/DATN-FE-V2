import { FilterAlt, Search } from '@mui/icons-material'
import { Box, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import calendarApi from '../../../../api/calendar'
import serviceApi from '../../../../api/service'
import userApis from '../../../../api/user'
import {
  RHFAutoComplete,
  RHFAutoCompleteRenderImg,
} from '../../../../components/ReactHookForm/RHFAutoComplete'
import RHFProvider from '../../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../../components/ReactHookForm/RHFTextField'
import RHFDatePicker from '../../../../components/ReactHookForm/RHFDatePicker'
import useAuth from '../../../../hook/useAuth'
import { getStatusColor } from '../../../../utils/aboutColor'
import MainButton from '../../../../components/MainButton'
import { useLocation } from 'react-router-dom'

const FilterForm = ({ currentParams, setQueryParams, onLoading }) => {
  const { userInfo } = useAuth()
  const [serviceOptions, setServiceOptions] = useState([])
  const [staffOptions, setStaffOptions] = useState([])
  const [statusOptions, setStatusOptions] = useState([])

  const [isCollapse, setIsCollapse] = useState(false)

  const { pathname } = useLocation()

  const methods = useForm({
    defaultValues: {
      service: '',
      staff: '',
      status: '',
      date: null,
      search: '',
    },
  })
  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    onLoading()
    const queryParams = {
      ...(values.service && { serviceId: values.service.id }),
      ...(values.staff && { staffId: values.staff.id }),
      ...(values.status && { status: values.status.id }),
      ...(values.search && { search: values.search }),
      ...(values.date && { date: values.date.toISOString() }),
    }
    setQueryParams({
      ...currentParams,
      ...queryParams,
    })
  }

  const handleResetFilter = () => {
    onLoading()
    reset()
    setQueryParams(pathname.includes('calendar-list') ? { page: 1, limit: 10 } : null)
  }

  const handleGetStatus = async () => {
    try {
      const data = await calendarApi.getListStatus()
      const options = data.map((item) => ({
        id: item._id,
        label: item.name,
        type: item.type,
      }))
      setStatusOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetListService = async () => {
    try {
      const data = await serviceApi.getAll()
      const options = data.map((item) => ({
        id: item._id,
        label: item.name,
        image: item.image,
      }))
      setServiceOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStaff = async () => {
    try {
      const data = await userApis.getStoreStaff(userInfo.storeId)
      const options = data.map((item) => ({
        id: item._id,
        image: item.avt,
        label: item.name,
      }))
      setStaffOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetListService()
    handleGetStaff()
    handleGetStatus()
  }, [])

  return (
    <Box sx={{ mb: { md: 3, xs: 0 } }}>
      <Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h2'>Lọc</Typography>
          <IconButton
            size='small'
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={() => setIsCollapse(!isCollapse)}
          >
            <FilterAlt />
          </IconButton>
        </Stack>
        <Box
          sx={{
            overflow: { xs: 'hidden', sm: 'visible' },
            height: { xs: isCollapse ? '400px' : '0px', sm: '270px', md: '200px' },
            transition: '0.5s',
            mt: { xs: isCollapse ? 2 : 0, sm: 2 },
          }}
        >
          <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField
                  name='search'
                  label='Tên hoặc số điện thoại'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={pathname.includes('calendar-list') ? 6 : 4}
                md={pathname.includes('calendar-list') ? 3 : 4}
              >
                <RHFAutoCompleteRenderImg name='service' label='Dịch vụ' options={serviceOptions} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={pathname.includes('calendar-list') ? 6 : 4}
                md={pathname.includes('calendar-list') ? 3 : 4}
              >
                <RHFAutoCompleteRenderImg name='staff' label='Nhân viên' options={staffOptions} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={pathname.includes('calendar-list') ? 6 : 4}
                md={pathname.includes('calendar-list') ? 3 : 4}
              >
                <RHFAutoComplete
                  name='status'
                  label='Trạng thái'
                  options={statusOptions}
                  renderOption={(props, option) => (
                    <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: (theme) => theme.palette[getStatusColor(option.type)]?.main,
                          mr: 1,
                        }}
                      >
                        {' '}
                      </Box>
                      {option.label}
                    </Box>
                  )}
                />
              </Grid>
              {pathname.includes('calendar-list') && (
                <Grid item xs={12} sm={6} md={3}>
                  <RHFDatePicker name='date' label='Chọn ngày' />
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack direction='row' justifyContent='flex-end' gap={1}>
                  <MainButton
                    colorType='primary'
                    type='submit'
                    sx={{ px: 6, borderRadius: '50px' }}
                  >
                    Lọc
                  </MainButton>
                  <MainButton
                    colorType='primary'
                    sx={{ px: 6, borderRadius: '50px' }}
                    variant='outlined'
                    onClick={handleResetFilter}
                  >
                    Hủy lọc
                  </MainButton>
                </Stack>
              </Grid>
            </Grid>
          </RHFProvider>
        </Box>
      </Stack>
    </Box>
  )
}

export default FilterForm
