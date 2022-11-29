import { Breadcrumbs, CircularProgress, Grid, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import GlassBox from '../../../components/GlassBox'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import categoryApi from '../../../api/category'
import { useState } from 'react'
import { RHFAutoComplete } from '../../../components/ReactHookForm/RHFAutoComplete'
import { useEffect } from 'react'
import MainButton from '../../../components/MainButton'
import userApis from '../../../api/user'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

const DEFAULT_VALUE = {
  username: '',
  name: '',
  phone: '',
  birthday: null,
  category: null,
  email: '',
}

const StaffForm = () => {
  const [categoryOpts, setCategoryOpts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Vui lòng nhập username đăng nhập')
      .min(6, 'Tên có ít nhất 6 ký tự')
      .max(12, 'Tên có tối đa 12 ký tự'),
    name: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên đăng nhập')
      .min(5, 'Tên có ít nhất 5 ký tự')
      .matches(
        /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
        'Tên không hợp lệ',
      ),
    birthday: yup.date().typeError('Vui lòng chọn ngày sinh').required('Vui lòng nhập ngày sinh'),
    email: yup
      .string()
      .trim()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Vui lòng nhập email đăng nhập'),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    category: yup.object().nullable('Vui lòng chọn vị trí').required('Vui lòng chọn vị trí'),
  })

  const methods = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, setError } = methods

  const onSubmit = (values) => {
    setLoading(true)
    const userData = {
      username: values.username,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      email: values.email,
      password: 'Nhanvien1',
      roleId: '6336719e9f0cdce7e66cba16',
    }

    const submitData = {
      cateId: values.category.value,
      userData,
    }

    handleCreateStaff(submitData)
  }

  const handleCreateStaff = async (data) => {
    try {
      const response = await userApis.createStaff(data)
      toast.dark(response.message)
      setTimeout(() => {
        setLoading(false)
        navigate('/admin/staff')
      }, 2000)
    } catch (error) {
      const responseError = error.response.data
      setError(responseError.field, { message: responseError.message })
    }
  }

  const handleGetCategory = async () => {
    try {
      const data = await categoryApi.getAll()
      const cateOpts = data
        .filter((item) => item._id !== '63518497a3ca43d2916000cc' && item.status !== 0)
        .map((item) => ({ label: `Nhân viên "${item.name}"`, value: item._id }))
      setCategoryOpts(cateOpts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCategory()
  }, [])

  return (
    <Stack gap={2} sx={{ pb: 3 }}>
      <Breadcrumbs separator='/'>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/dashboard'>
          Dashboard
        </Link>
        <Link underline='none' color='GrayText' component={RouterLink} to='/admin/staff'>
          Nhân viên
        </Link>
        <Typography variant='body1' color='primary'>
          Tạo mới
        </Typography>
      </Breadcrumbs>
      <Typography variant='h2' color='text.secondary'>
        Tạo mới nhân viên
      </Typography>
      <GlassBox>
        <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name='username' label='Tên đăng nhập' disabled={loading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name='name' label='Họ và tên' disabled={loading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name='phone' label='Số điện thoại' disabled={loading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name='email' label='Email' disabled={loading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDatePicker name='birthday' label='Ngày sinh' disabled={loading} disableFuture />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFAutoComplete
                options={categoryOpts}
                name='category'
                disabled={loading}
                label='Vị trí'
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction='row' justifyContent='flex-end' gap={2}>
                <MainButton
                  component={RouterLink}
                  to='/admin/staff'
                  colorType='neutral'
                  sx={{ px: 3 }}
                  disabled={loading}
                >
                  Hủy
                </MainButton>
                {loading ? (
                  <LoadingButton loading={loading} variant='outlined' disabled sx={{ px: 3 }}>
                    disabled
                  </LoadingButton>
                ) : (
                  <MainButton type='submit' colorType='primary' sx={{ px: 3 }}>
                    Tạo mới
                  </MainButton>
                )}
              </Stack>
            </Grid>
          </Grid>
        </RHFProvider>
      </GlassBox>
    </Stack>
  )
}

export default StaffForm
