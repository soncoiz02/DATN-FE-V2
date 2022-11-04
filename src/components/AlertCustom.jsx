import { Cancel, CheckCircle, Close, Info, Warning } from '@mui/icons-material'
import { Box, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const AlertStyleProp = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const ALERTTYPE = [
  {
    status: 'info',
    icon: <Info sx={{ ...AlertStyleProp, color: '#017dc7' }} fontSize='large' />,
    title: 'Thông tin',
  },
  {
    status: 'success',
    icon: <CheckCircle sx={{ ...AlertStyleProp, color: '#50b65f' }} fontSize='large' />,
    title: 'Thành công',
  },
  {
    status: 'warning',
    icon: <Warning sx={{ ...AlertStyleProp, color: '#f48322' }} fontSize='large' />,
    title: 'Cảnh báo',
  },
  {
    status: 'error',
    icon: <Cancel sx={{ ...AlertStyleProp, color: '##fd0100' }} fontSize='large' />,
    title: 'Lỗi',
  },
]

const AlertCustom = ({ open, children, status, message, time, onClose, ...other }) => {
  const findAlertType = ALERTTYPE.find((ALERTTYPE) => {
    return ALERTTYPE.status === status
  })
  return (
    <>
      {findAlertType && (
        <StyleSnackBar
          sx={{ maxWidth: '600px' }}
          autoHideDuration={time}
          open={open}
          onClose={onClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Stack alignItems='center' justifyContent='space-between'>
            <StyleBoxIcon>{findAlertType.icon}</StyleBoxIcon>
            <Box
              sx={{
                marginRight: '15px',
              }}
            >
              <StyleTitleAlert>{findAlertType.title}</StyleTitleAlert>
              <StyleContentAlert>{message}</StyleContentAlert>
            </Box>
            <IconButton aria-label='close' color='inherit' sx={{ p: 0.5 }} onClick={onClose}>
              <StyleClose fontSize='large' />
            </IconButton>
          </Stack>
        </StyleSnackBar>
      )}
    </>
  )
}

const commonStyleSnackBar = {
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '35px',
  minHeight: '60px',
  padding: '5px 10px',
  background: '#fff',
}
const StyleSnackBar = styled(Snackbar)(({ theme }) => ({
  '& > div': {
    ...commonStyleSnackBar,
    'box-shadow':
      '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
  },
}))

const StyleBoxIcon = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '10px',
  background: '#fdf4ea',
  marginRight: '15px',
  height: '60px',
  width: '60px',
  borderRadius: '50%',
}))

const StyleTitleAlert = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
}))

const StyleContentAlert = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
}))

const StyleClose = styled(Close)(({ theme }) => ({
  color: '#dbdbdb',
}))

export default AlertCustom
