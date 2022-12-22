import React, { useEffect, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, MenuItem, Stack, styled, Typography } from '@mui/material'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'

import categoryApi from '../../../api/category'
import serviceApi from '../../../api/service'

import { useForm } from 'react-hook-form'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'
import RHFSelect from '../../../components/ReactHookForm/RHFSelect'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from '../../../components/EditorToolbar'

import { useNavigate, useParams } from 'react-router-dom'
import { uploadImage } from '../../../utils/uploadImage'
import { toast } from 'react-toastify'

const defaultFormValues = {
  name: '',
  category: '',
  price: '',
  duration: '',
  totalStaff: 5,
  status: 0,
  image: '',
}
const listStatus = [
  { label: 'Đang hoạt động', value: 1 },
  { value: 0, label: 'Chưa hoạt động' },
]

const ServiceForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [imgUpload, setImgUpload] = useState()
  const [options, setOptions] = useState([])

  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên dịch vụ'),
    category: yup.string().trim().required('Vui lòng chọn danh mục'),
    price: yup
      .string()
      .trim()
      .required('Vui lòng nhập giá')
      .matches(/^[1-9]+[0-9]*00000/, 'Bạn phải nhập giá trị là số và là bội của 100000'),
    duration: yup
      .string()
      .trim()
      .required('Vui lòng nhập thời gian')
      .matches(/^[1-9]\d*$/, 'Bạn phải nhập giá trị là số'),
    status: yup.string().trim().required('Vui lòng chọn trạng thái'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const handleCalculateTimeSlot = (duration) => {
    const start = 8
    const end = 22

    const listTimeSlot = []
    listTimeSlot.push(start)
    let timeSlot = start
    let i = 1
    while (i > 0) {
      timeSlot = timeSlot + (15 + duration) / 60
      if (timeSlot + (15 + duration) / 60 > end) break
      listTimeSlot.push(timeSlot)
    }

    return listTimeSlot
  }

  const onSubmit = async (values) => {
    const timeSlot = handleCalculateTimeSlot(+values.duration)
    if (imgUpload) {
      const imgURL = await uploadImage(imgUpload)
      setImgUpload(null)
      setImg('')
      if (id) {
        return handleUpdateService(id, {
          ...values,
          categoryId: values.category,
          image: imgURL,
          desc: description,
          timeSlot,
        })
      } else {
        return handleAddService({
          ...values,
          categoryId: values.category,
          image: imgURL,
          desc: description,
          timeSlot,
        })
      }
    } else {
      if (id) {
        return handleUpdateService(id, {
          ...values,
          categoryId: values.category,
          desc: description,
          timeSlot,
        })
      } else {
        alert('Bạn vui lòng chọn ảnh dịch vụ')
      }
    }
  }

  const handleAddService = async (service) => {
    try {
      const data = await serviceApi.create(service)
      toast.dark('Thêm mới thành công')
      setTimeout(() => {
        navigate('/admin/services-management')
      }, 2000)
    } catch (error) {
      toast.dark('Thêm mới thất bại')
    }
  }

  const handleUpdateService = async (id, service) => {
    try {
      const data = await serviceApi.update(id, service)
      toast.dark('Cập nhật thành công')
      setTimeout(() => {
        navigate('/admin/services-management')
      }, 2000)
    } catch (error) {
      toast.dark('Cập nhật thất bại')
    }
  }
  const handleGetOneService = async (id) => {
    try {
      const data = await serviceApi.getOne(id)
      setDescription(data.desc)
      setImg(data.image)
      reset({
        ...data,
        category: data.categoryId?._id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetCategory = async () => {
    try {
      const data = await categoryApi.getAll()
      const options = data.map((category) => ({ id: category._id, label: category.name }))
      setOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  const previewFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
      setImgUpload(file)
    }
  }

  useEffect(() => {
    if (id) {
      handleGetOneService(id)
    }
    handleGetCategory()
  }, [id])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <GlassBox>
          <Stack
            height={{ sm: '300px', lg: '400px' }}
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={2}
          >
            <CustomBox
              height={{ xs: '100px', sm: '150px', lg: '200px' }}
              width={{ xs: '100px', sm: '150px', lg: '200px' }}
              sx={{ background: '#f5f5f5', border: '5px solid #fff' }}
            >
              <IconButton
                aria-label='upload picture'
                component='label'
                sx={{ width: 1, height: 1, padding: 0 }}
              >
                {img ? (
                  <Avatar alt='' src={img} sx={{ width: 1, height: 1 }} />
                ) : (
                  <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                    <PhotoCamera fontSize='large' />
                    <Typography variant='subtitle2'>Tải ảnh lên</Typography>
                  </Stack>
                )}
                <input
                  hidden
                  name='image'
                  accept='image/*'
                  type='file'
                  onChange={(e) => {
                    previewFile(e)
                  }}
                />
              </IconButton>
            </CustomBox>
            <Typography variant='subtitle2' sx={{ textAlign: 'center' }}>
              Cho phép định dạng *.jpg, *.jpeg, *.png và kích thước &lt; 3MB{' '}
            </Typography>
          </Stack>
        </GlassBox>
      </Grid>
      <Grid item xs={12} sm={8}>
        <GlassBox>
          <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <RHFTextField name='name' label='Tên dịch vụ' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelect name='category' label='Danh mục'>
                  {options.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {' '}
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField name='price' label='Giá tiền' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField name='duration' label='Thời gian sử dụng' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelect name='status' label='Trạng thái' variant='outlined'>
                  {listStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={18}>Mô tả</Typography>
                <ReactQuill
                  style={{
                    height: '200px',
                    maxHeight: '200px',
                  }}
                  theme='snow'
                  placeholder={'Viết mô tả...'}
                  modules={modules}
                  formats={formats}
                  defaultValue={description}
                  value={description}
                  onChange={setDescription}
                />
              </Grid>

              <Grid item xs={12} marginTop={{ xs: '80px', sm: '60px', lg: '60px' }}>
                <Stack direction='row' gap={2} justifyContent='flex-end'>
                  <MainButton
                    type='button'
                    colorType='neutral'
                    onClick={() => navigate('/admin/services-management')}
                  >
                    Hủy
                  </MainButton>
                  <MainButton type='submit' colorType='primary'>
                    Xác nhận
                  </MainButton>
                </Stack>
              </Grid>
            </Grid>
          </RHFProvider>
        </GlassBox>
      </Grid>
    </Grid>
  )
}

const CustomBox = styled(Box)`
  border-radius: 50%;
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
`

export default ServiceForm
