import {
  Grid,
  Stack,
  styled,
  Box,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  CircularProgress,
} from '@mui/material'
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
import { uploadAvatarImage } from '../../utils/uploadImage'
import { LoadingButton } from '@mui/lab'

const Accountinfo = () => {
  const { userInfo, token, updateInfo } = useAuth()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [imgPreview, setImgPreview] = useState('')
  const [imgUpload, setImgUpload] = useState()

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

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods

  const onSubmit = async (values) => {
    setIsLoading(true)
    if (imgUpload) {
      const imgLink = await uploadAvatarImage(imgUpload)
      setImgUpload(null)
      setImgPreview('')
      return handleUpdateUser({ ...values, avt: imgLink })
    }
    handleUpdateUser({ ...values })
  }

  const handleUpdateUser = async (userData) => {
    try {
      const data = await userApis.userUpdate(token, userData)
      reset({
        ...data,
      })
      updateInfo(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const previewFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setImgUpload(file)
    }
  }

  const checkDataChange = () => {
    return imgUpload || !formState.isDirty
  }

  useEffect(() => {
    fillUserData()
  }, [])

  return (
    <Box>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={4}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Avatar
              src={imgPreview ? imgPreview : userInfo.avt}
              sx={{ width: 200, height: 200 }}
            ></Avatar>

            <MainButton sx={{ m: 'auto' }} colorType='primary' component='label'>
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={(event) => {
                  previewFile(event)
                }}
              />
              Thay đổi ảnh mới
            </MainButton>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' mb={1}>
                  Họ và tên
                </Typography>
                <RHFTextField name='name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' mb={1}>
                  Số điện thoại
                </Typography>
                <RHFTextField name='phone' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' mb={1}>
                  Email
                </Typography>
                <RHFTextField name='email' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' mb={1}>
                  Ngày sinh
                </Typography>
                <RHFDatePicker name='birthday' />
              </Grid>

              <Grid item mt={3} xs={12}>
                <Stack>
                  {isLoading ? (
                    <LoadingButton
                      loading
                      variant='contained'
                      sx={{
                        alignSelf: 'center',
                        px: '30px',
                        height: '45px',
                        width: '150px',
                        borderRadius: '10px',
                      }}
                    ></LoadingButton>
                  ) : (
                    <MainButton
                      type='submit'
                      colorType='primary'
                      sx={{ alignSelf: 'center', px: '30px' }}
                      disabled={!isDirty && !imgUpload}
                    >
                      Cập Nhật
                    </MainButton>
                  )}
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
