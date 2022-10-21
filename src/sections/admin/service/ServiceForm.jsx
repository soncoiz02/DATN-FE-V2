import React, { useEffect, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SliderValueLabel,
  Stack,
  styled,
  Typography,
} from '@mui/material'
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

// import MUIRichTextEditor from 'mui-rte'
import { useNavigate, useParams } from 'react-router-dom'

const defaultFormValues = {
  name: '',
  category: '',
  price: '',
  duration: '',
  totalStaff: '',
  status: 0,
  image: '',
  desc: '',
}
const listStatus = [
  { label: 'Đang hoạt động', value: 1 },
  { value: 0, label: 'Chưa hoạt động' },
]

const ServiceForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // PREVIEW IMAGE
  const [img, setImg] = useState()

  const handlePreviewImg = (e) => {
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)
    setImg(file)
    console.log(file)
  }

  // CATEGORY
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
    totalStaff: yup
      .string()
      .trim()
      .required('Vui lòng nhập số nhân viên')
      .matches(/^[1-9]\d*$/, 'Bạn phải nhập giá trị là số'),
    status: yup.string().trim().required('Vui lòng chọn trạng thái'),
    desc: yup.string().trim().required('Vui lòng nhập thêm mô tả'),
  })

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (values) => {
    const serviceData = {
      name: values.name,
      categoryId: values.category,
      price: values.price,
      duration: values.duration,
      totalStaff: values.totalStaff,
      status: values.status,
      image: 'https://picsum.photos/200/300',
      desc: values.desc,
    }
    if (id) {
      handleUpdateService(id, serviceData)
    } else {
      handleAddService(serviceData)
    }
  }

  const handleAddService = async (service) => {
    try {
      const data = await serviceApi.create(service)
      // console.log(data);
      setTimeout(() => {
        navigate('/admin/services-management')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateService = async (id, service) => {
    try {
      const data = await serviceApi.update(id, service)
      console.log(data)
      setTimeout(() => {
        navigate('/admin/services-management')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
  const handleGetOneService = async (id) => {
    try {
      const data = await serviceApi.getOne(id)
      reset({
        ...data,
        category: data.categoryId._id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetServices = async () => {
    try {
      const data = await categoryApi.getAll()
      const options = data.map((category) => ({ id: category._id, label: category.name }))
      setOptions(options)
      // console.log(options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetServices()
    if (id) handleGetOneService(id)
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
              height={{ sm: '150px', lg: '200px' }}
              width={{ sm: '150px', lg: '200px' }}
              sx={{ background: '#f5f5f5', border: '5px solid #fff' }}
            >
              <IconButton
                aria-label='upload picture'
                component='label'
                sx={{ width: 1, height: 1, padding: 0 }}
                onChange={handlePreviewImg}
              >
                {img ? (
                  <Avatar alt={img.name} src={img.preview} sx={{ width: 1, height: 1 }} />
                ) : (
                  <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                    <PhotoCamera fontSize='large' />
                    <Typography variant='subtitle2'>Tải ảnh lên</Typography>
                  </Stack>
                )}
                <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <input hidden accept='image/*' type='file' name='picture' />
                </RHFProvider>
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
                <RHFTextField name='totalStaff' label='Nhân viên' />
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
                {/* <Typography fontSize={18}>Mô tả</Typography>
                <Box sx={{ border: '1px solid #c9bebe', borderRadius: '4px', padding: '0 10px' }}>
                  <MUIRichTextEditor 
                    controls={[
                      'title',
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'undo',
                      'redo',
                      'link',
                      'media',
                      'numberList',
                      'bulletList',
                      'quote',
                      'code',
                      'clear',
                    ]}

                    defaultValue={text}
                    onChange={onEditorChange}
                    label='Viết ở đây ạ...'
                  />
                </Box> */}
                <RHFTextField name='desc' label='Mô tả' />
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <MainButton sx={{ ml: 'auto' }} type='submit' colorType='primary'>
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
