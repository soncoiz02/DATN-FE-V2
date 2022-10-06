import React, { useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import GlassBox from '../../../components/GlassBox'
import MainButton from '../../../components/MainButton'

import { useForm } from 'react-hook-form'
import RHFAutoComplete from '../../../components/ReactHookForm/RHFAutoComplete'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../../components/ReactHookForm/RHFTextField'

import MUIRichTextEditor from 'mui-rte'

const ServiceForm = () => {
  const [img, setImg] = useState()

  const handlePreviewImg = (e) => {
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)
    setImg(file)
    console.log(file)
  }

  const options = [
    { label: 'Dịch vụ triệt lông vĩnh viễn' },
    { label: 'Dịch vụ phun xăm thẩm mỹ' },
    { label: 'Dịch vụ trị nám, tàn nhang' },
    { label: 'Dịch vụ phun xăm thẩm mỹ' },
    { label: 'Dịch vụ trị nám, tàn nhang' },
    { label: 'Dịch vụ phun xăm thẩm mỹ' },
    { label: 'Dịch vụ trị nám, tàn nhang' },
    { label: 'Dịch vụ phun xăm thẩm mỹ' },
    { label: 'Dịch vụ trị nám, tàn nhang' },
  ]

  const status = [{ label: 'Đang hoạt động' }, { label: 'Chưa hoạt động' }]

  const methods = useForm()

  const { handleSubmit, reset } = methods

  const onSubmit = () => {}

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
                <input hidden accept='image/*' type='file' />
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
                <RHFAutoComplete
                  name='category'
                  options={options}
                  label='Danh mục'
                  variant='body1'
                />
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
                <RHFAutoComplete name='status' options={status} label='Trạng thái' />
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={18}>Mô tả</Typography>
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
                    label='Viết ở đây ạ...'
                  />
                </Box>
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
