import { Grid, Stack, styled, Box, Typography, Snackbar, Alert, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import userApis from '../../api/user'
import MainButton from '../../components/MainButton'
import RHFProvider from '../../components/ReactHookForm/RHFProvider'
import RHFTextField from '../../components/ReactHookForm/RHFTextField'
import useAuth from '../../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import RHFDatePicker from '../../components/ReactHookForm/RHFDatePicker'

const Accountinfo = () => {
  const { userInfo } = useAuth()
  console.log(userInfo)
  const id = userInfo._id
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [imgPreview, setimgPreview] = useState('')
  const [imgUpload, setimgUpload] = useState('')
  const [data, setData] = useState('')
  const [url, setUrl] = useState('')

  const userInforSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('Vui lòng nhập tên đăng nhập')
      .min(5, 'Tên có ít nhất 5 ký tự')
      .matches(
        /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
        'Tên không hợp lệ',
      ),
    phone: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    email: yup
      .string()
      .trim()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Vui lòng nhập email'),
    birthday: yup.string().trim().required('Vui lòng nhập ngày sinh'),
  })

  const fillUserData = () => {
    reset({
      avt: userInfo?.avt,
      name: userInfo?.name,
      phone: userInfo?.phone,
      email: userInfo?.email,
      birthday: userInfo?.birthday,
    })
  }

  useEffect(() => {
    fillUserData()
  }, [])

  const methods = useForm({
    defaultValues: {
      avt: '',
      name: '',
      phone: '',
      email: '',
      birthday: '',
    },
    resolver: yupResolver(userInforSchema),
  })
  const updateData = (event) => {
    setData(event.target.values)
  }
  const { handleSubmit, reset } = methods
  const onSubmit = (values) => {
    const usserData = {
      avt: values.avt,
      name: values.name,
      phone: values.phone,
      email: values.email,
      birthday: values.birthday,
    }
    handleUpdateUser(id, usserData)
  }

  const handleUpdateUser = async (id, usserData) => {
    try {
      const data = await userApis.userUpdate(id, usserData)
      console.log(data)

      setOpen(true)
      setTimeout(() => {
        navigate('/account-setting/account-info')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviwe = (event) => {
    setimgPreview(URL.createObjectURL(event.target.files[0]))
  }

  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imgUpload)
    formData.append('upload_preset', 'dxrqjome')
    fetch('https://api.cloudinary.com/v1_1/djultth5g/image/upload', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.json())
      .then((formData) => {
        setUrl(formData.url)
        console.log(formData.url)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Box>
      <Grid container spacing={2} mt={4}>
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity='success'>Cập nhật thành công</Alert>
        </Snackbar>
        <Grid item xs={4}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Avatar
              src={imgPreview ? imgPreview : userInfo.avt}
              sx={{ width: 200, height: 200 }}
            ></Avatar>

            <MainButton
              onChange={handlePreviwe}
              sx={{ m: 'auto' }}
              colorType='primary'
              component='label'
            >
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={(event) => {
                  setimgUpload(event.target.files[0])
                }}
              />
              Thay đổi ảnh mới
            </MainButton>
            {/* <img src={imgFile} width="250" height="250" /> */}
          </Stack>
        </Grid>
        <Grid item xs={8} mt={2} onChange={(e) => updateData(e)}>
          <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid style={{ width: '315px' }} xs={4}>
                <Typography variant='h4' mb={1}>
                  Họ và tên
                </Typography>
                <RHFTextField name='name' />
              </Grid>
              <Grid style={{ width: '315px' }} ml={4}>
                <Typography variant='h4' mb={1}>
                  Số điện thoại
                </Typography>
                <RHFTextField name='phone' />
              </Grid>
              <Grid style={{ width: '315px' }} xs={4} mt={2}>
                <Typography variant='h4' mb={1}>
                  Email
                </Typography>
                <RHFTextField name='email' />
              </Grid>
              <Grid style={{ width: '315px' }} ml={4} mt={2}>
                <Typography variant='h4' mb={1}>
                  Ngày sinh
                </Typography>
                <RHFDatePicker name='birthday' />
              </Grid>

              <Grid style={{ width: '180px' }} m={15}>
                <Stack>
                  <MainButton
                    disabled={imgPreview ? false : true || data ? true : false}
                    type='submit'
                    colorType='primary'
                    onClick={uploadImage}
                  >
                    Cập Nhật
                  </MainButton>
                </Stack>
              </Grid>
            </Grid>
          </RHFProvider>
        </Grid>
      </Grid>
    </Box>
  )
}
const CustomBox = styled(Box)`
  border-radius: 50%;
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
`

export default Accountinfo
