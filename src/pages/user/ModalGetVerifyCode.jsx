import { Close } from '@mui/icons-material'
import {
  Box,
  Container,
  IconButton,
  InputBase,
  Modal,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import userApis from '../../api/user'
import GlassBox from '../../components/GlassBox'
import MainButton from '../../components/MainButton'
import useAuth from '../../hook/useAuth'

const ModalGetVerifyCode = ({ open, onClose, changePassword }) => {
  const { userInfo } = useAuth()

  const [verifyCode, setVerifyCode] = useState(null)
  const [verifyValue, setVerifyValue] = useState('')
  const [countDown, setCountDown] = useState(60)

  const closeModal = () => {
    setCountDown(60)
    setVerifyValue('')
    setVerifyCode(null)
    onClose()
  }

  const handleGetVerifyCode = async () => {
    try {
      const data = await userApis.getVerifyCode({ email: userInfo.email })
      setVerifyCode(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleVerifyCode = () => {
    if (+verifyValue !== +verifyCode) {
      return alert('Sai mã xác nhận')
    }
    changePassword()
    closeModal()
  }

  useEffect(() => {
    handleGetVerifyCode()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1)
    }, 1000)

    if (countDown === 0) clearInterval(interval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [countDown])

  return (
    <Modal open={open} onClose={closeModal}>
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          py: { xs: '15px', md: '30px' },
          outline: 'none',
        }}
      >
        <GlassBox opacity={1}>
          <Stack gap={2}>
            <Typography variant='h2'>Mã xác nhận đã được gửi về email của bạn</Typography>
            <Input
              placeholder='Nhập mã xác nhận'
              value={verifyValue}
              onChange={(e) => setVerifyValue(e.target.value)}
            />
            <Stack>
              <Stack direction='row'>
                <Typography variant='body2'>Mã xác nhận hết hạn trong:</Typography>
                <Typography variant='body2' color='primary' ml={1}>
                  {countDown}s
                </Typography>
              </Stack>
              <Stack direction='row'>
                <Typography variant='body2'>Bạn chưa nhận được mã? </Typography>
                <Typography
                  variant='body2'
                  color='primary'
                  ml={1}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleGetVerifyCode()
                    setCountDown(60)
                  }}
                >
                  Gửi lại
                </Typography>
              </Stack>
            </Stack>
            <MainButton colorType='primary' disabled={!verifyValue} onClick={handleVerifyCode}>
              Xác nhận
            </MainButton>
          </Stack>
          <IconButton sx={{ position: 'absolute', top: 0, right: '5px' }} onClick={closeModal}>
            <Close />
          </IconButton>
        </GlassBox>
      </Container>
    </Modal>
  )
}

const Input = styled(InputBase)`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export default ModalGetVerifyCode
