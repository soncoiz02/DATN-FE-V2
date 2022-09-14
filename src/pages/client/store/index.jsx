import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'

const Store = () => {
  const theme = useTheme()
  console.log(theme.palette)
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
          <Box sx={{ padding: '0 50px', marginTop: '38px' }}>
            <Grid container spacing={6}>
              {/* List Store */}
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 1, position: 'relative' }}>
                  <CardMedia
                    component='img'
                    alt='green iguana'
                    height='140'
                    image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                  />
                  <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                    <Stack direction='row'>
                      <Box>
                        <Avatar
                          sx={{ width: 100, height: 100, position: 'absolute', top: 110 }}
                          src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                        />
                      </Box>
                      <Box
                        sx={{ marginLeft: '132px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <Stack
                          direction='column'
                          justifyContent='center'
                          alignItems='flex-start'
                          spacing={0}
                        >
                          <Typography variant='h3' color={theme.palette.text.secondary}>
                            Excellence Spa Đỗ Quang
                          </Typography>
                          <Rating name='size-small' readOnly defaultValue={5}></Rating>
                          <Typography variant='subtitle3' noWrap>
                            Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box sx={{ marginTop: '20px' }}>
                      <Typography variant='subtitle2'>
                        Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên.
                        Trong hơn 19 năm qua, Excellence đã giúp hơn 285 ngàn...
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '0 30px 30px 30px' }}>
                    <Typography variant='subtitle2' color={theme.palette.statusStore.open}>
                      Đang mở cửa
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 1, position: 'relative' }}>
                  <CardMedia
                    component='img'
                    alt='green iguana'
                    height='140'
                    image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                  />
                  <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                    <Stack direction='row'>
                      <Box>
                        <Avatar
                          sx={{ width: 100, height: 100, position: 'absolute', top: 110 }}
                          src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                        />
                      </Box>
                      <Box
                        sx={{ marginLeft: '132px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <Stack
                          direction='column'
                          justifyContent='center'
                          alignItems='flex-start'
                          spacing={0}
                        >
                          <Typography variant='h3' color={theme.palette.text.secondary}>
                            Excellence Spa Đỗ Quang
                          </Typography>
                          <Rating name='size-small' readOnly defaultValue={5}></Rating>
                          <Typography variant='subtitle3' noWrap>
                            Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box sx={{ marginTop: '20px' }}>
                      <Typography variant='subtitle2'>
                        Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên.
                        Trong hơn 19 năm qua, Excellence đã giúp hơn 285 ngàn...
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '0 30px 30px 30px' }}>
                    <Typography variant='subtitle2' color={theme.palette.statusStore.open}>
                      Đang mở cửa
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 1, position: 'relative' }}>
                  <CardMedia
                    component='img'
                    alt='green iguana'
                    height='140'
                    image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                  />
                  <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                    <Stack direction='row'>
                      <Box>
                        <Avatar
                          sx={{ width: 100, height: 100, position: 'absolute', top: 110 }}
                          src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                        />
                      </Box>
                      <Box
                        sx={{ marginLeft: '132px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <Stack
                          direction='column'
                          justifyContent='center'
                          alignItems='flex-start'
                          spacing={0}
                        >
                          <Typography variant='h3' color={theme.palette.text.secondary}>
                            Excellence Spa Đỗ Quang
                          </Typography>
                          <Rating name='size-small' readOnly defaultValue={5}></Rating>
                          <Typography variant='subtitle3' noWrap>
                            Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box sx={{ marginTop: '20px' }}>
                      <Typography variant='subtitle2'>
                        Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên.
                        Trong hơn 19 năm qua, Excellence đã giúp hơn 285 ngàn...
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '0 30px 30px 30px' }}>
                    <Typography variant='subtitle2' color={theme.palette.statusStore.open}>
                      Đang mở cửa
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 1, position: 'relative' }}>
                  <CardMedia
                    component='img'
                    alt='green iguana'
                    height='140'
                    image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                  />
                  <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                    <Stack direction='row'>
                      <Box>
                        <Avatar
                          sx={{ width: 100, height: 100, position: 'absolute', top: 110 }}
                          src='https://i.pinimg.com/236x/6a/48/42/6a4842bb9bd1ddb5df3209a385ddfa98.jpg'
                        />
                      </Box>
                      <Box
                        sx={{ marginLeft: '132px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        <Stack
                          direction='column'
                          justifyContent='center'
                          alignItems='flex-start'
                          spacing={0}
                        >
                          <Typography variant='h3' color={theme.palette.text.secondary}>
                            Excellence Spa Đỗ Quang
                          </Typography>
                          <Rating name='size-small' readOnly defaultValue={5}></Rating>
                          <Typography variant='subtitle3' noWrap>
                            Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box sx={{ marginTop: '20px' }}>
                      <Typography variant='subtitle2'>
                        Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên.
                        Trong hơn 19 năm qua, Excellence đã giúp hơn 285 ngàn...
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '0 30px 30px 30px' }}>
                    <Typography variant='subtitle2' color={theme.palette.statusStore.close}>
                      Đang đóng cửa
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Store
