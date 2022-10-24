import { Box, Stack, styled, Typography } from '@mui/material'
import { SnackbarContent, SnackbarProvider } from 'notistack'
import React from 'react'
import { forwardRef } from 'react'

const SnackbarNotify = forwardRef((props, ref) => {
  console.log(props)
  return (
    <SnackbarContent ref={ref}>
      <CustomNotify>
        <Stack>
          <Typography variant='h3' sx={{ color: (theme) => theme.palette.info.main }}>
            Thông báo
          </Typography>
          <Typography variant='body1'>{props.message}</Typography>
        </Stack>
      </CustomNotify>
    </SnackbarContent>
  )
})

const Notistack = ({ children }) => {
  return (
    <SnackbarProvider
      Components={{
        notify: SnackbarNotify,
      }}
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {children}
    </SnackbarProvider>
  )
}

const CustomNotify = styled(Box)(
  ({ theme }) => `
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  border-left: 5px solid ${theme.palette.info.main};
  padding: 10px 30px;
  max-width: 300px;
  min-width: 300px;
`,
)

export default Notistack
