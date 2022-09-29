import { Box, Button, Container, Grid, Link, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
function Login() {
  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography mt={25} variant='h1' align='center'>
              Đăng Nhập
            </Typography>
            <Typography variant='h3' mt={3} align='center'>
              Nhập thông tin tài khoản của bạn
            </Typography>
          </Box>
          <Box mt={3} align='center'>
            <Box>
              <TextField
                type='text'
                style={{
                  width: 450,
                  height: 79,
                }}
                label='Nhập tên người dùng'
                variant='outlined'
              />

              <TextField
                type='password'
                style={{
                  width: 450,
                  height: 79,
                }}
                label='Nhập mật khẩu'
                variant='outlined'
              />
            </Box>
          </Box>
          <Stack>
            <Grid container align='center'>
              <Grid item sm>
                <Typography>Duy trì đăng nhập</Typography>
              </Grid>
              <Grid item sm>
                <Link href='#'>{'Quên mật khẩu ?'}</Link>
              </Grid>
            </Grid>
          </Stack>
          <Box mt={3} align='center'>
            <Button variant='contained'>Đăng nhập</Button>
          </Box>
          <Stack mt={6}>
            <Grid container>
              <Grid item>
                <Typography>Bạn chưa có tài khoản?</Typography>
              </Grid>
              <Grid item>
                <Link href='#'>{'Đăng ký ngay'}</Link>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src='https://cpad.ask.fm/450/774/576/-29996968-1tfd7tc-gpggmmc5d0og3a0/original/image.jpg'
            alt=''
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
