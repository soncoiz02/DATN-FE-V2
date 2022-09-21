import {
  Avatar,
  Box,
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
import React, { useEffect, useState } from 'react'
import storeApi from '../../../api/store'
const ListStore = () => {
  const theme = useTheme()
  const [storeSpa, setStoreSpa] = useState([])
  const getDataStoreSpa = async () => {
    try {
      const data = await storeApi.getAll()
      setStoreSpa(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataStoreSpa()
  }, [])

  return (
    <Box sx={{ padding: { xs: '0', md: '0 50px' }, marginTop: '38px' }}>
      <Grid container spacing={{ xs: 1, md: 6 }}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Card
            sx={{
              maxWidth: 1,
              position: 'relative',
              boxShadow:
                '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
            }}
          >
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
            />
            <CardContent sx={{ padding: { xs: '2px 15px 10px 15px', md: '4px 30px 30px 30px' } }}>
              <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                {/* Avatar */}
                <Box>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      top: { xs: 90, md: 110 },
                      left: { xs: '50%', sm: '50%', md: 30 },
                      transform: {
                        xs: 'translateX(-50%)',
                        sm: 'translateX(-50%)',
                        md: 'none',
                      },
                    }}
                    src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                  />
                </Box>
                {/* Infor SPA */}
                <Box
                  sx={{
                    marginLeft: '132px',
                    overflow: 'hidden',
                    margin: { xs: '50px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  }}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='flex-start'
                    spacing={0}
                  >
                    <Typography
                      variant='h3'
                      sx={{ margin: { xs: '0 auto', sm: '0 auto', md: '0 0 0 132px' } }}
                      color={theme.palette.text.secondary}
                    >
                      Excellence Spa Đỗ Quang
                    </Typography>
                    <Stack direction={{ xs: 'column-reverse', md: 'column' }}>
                      <Rating
                        name='size-small'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        readOnly
                        defaultValue={5}
                      ></Rating>
                      <Typography
                        component='div'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        variant='subtitle2'
                      >
                        Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Box sx={{ marginTop: { xs: '10px', md: '20px' } }}>
                <Typography variant='subtitle2'>
                  Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên. Trong hơn
                  19 năm qua, Excellence đã giúp hơn 285 ngàn...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ padding: { xs: '0 15px 15px 15px', md: '0 30px 30px 30px' } }}>
              <Typography variant='subtitle2' color='#00BC6D'>
                Đang mở cửa
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Card
            sx={{
              maxWidth: 1,
              position: 'relative',
              boxShadow:
                '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
            }}
          >
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
            />
            <CardContent sx={{ padding: { xs: '2px 15px 10px 15px', md: '4px 30px 30px 30px' } }}>
              <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                {/* Avatar */}
                <Box>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      top: { xs: 90, md: 110 },
                      left: { xs: '50%', sm: '50%', md: 30 },
                      transform: {
                        xs: 'translateX(-50%)',
                        sm: 'translateX(-50%)',
                        md: 'none',
                      },
                    }}
                    src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                  />
                </Box>
                {/* Infor SPA */}
                <Box
                  sx={{
                    marginLeft: '132px',
                    overflow: 'hidden',
                    margin: { xs: '50px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  }}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='flex-start'
                    spacing={0}
                  >
                    <Typography
                      variant='h3'
                      sx={{ margin: { xs: '0 auto', sm: '0 auto', md: '0 0 0 132px' } }}
                      color={theme.palette.text.secondary}
                    >
                      Excellence Spa Đỗ Quang
                    </Typography>
                    <Stack direction={{ xs: 'column-reverse', md: 'column' }}>
                      <Rating
                        name='size-small'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        readOnly
                        defaultValue={5}
                      ></Rating>
                      <Typography
                        component='div'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        variant='subtitle2'
                      >
                        Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Box sx={{ marginTop: { xs: '10px', md: '20px' } }}>
                <Typography variant='subtitle2'>
                  Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên. Trong hơn
                  19 năm qua, Excellence đã giúp hơn 285 ngàn...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ padding: { xs: '0 15px 15px 15px', md: '0 30px 30px 30px' } }}>
              <Typography variant='subtitle2' color='#00BC6D'>
                Đang mở cửa
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Card
            sx={{
              maxWidth: 1,
              position: 'relative',
              boxShadow:
                '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
            }}
          >
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
            />
            <CardContent sx={{ padding: { xs: '2px 15px 10px 15px', md: '4px 30px 30px 30px' } }}>
              <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                {/* Avatar */}
                <Box>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      top: { xs: 90, md: 110 },
                      left: { xs: '50%', sm: '50%', md: 30 },
                      transform: {
                        xs: 'translateX(-50%)',
                        sm: 'translateX(-50%)',
                        md: 'none',
                      },
                    }}
                    src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                  />
                </Box>
                {/* Infor SPA */}
                <Box
                  sx={{
                    marginLeft: '132px',
                    overflow: 'hidden',
                    margin: { xs: '50px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  }}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='flex-start'
                    spacing={0}
                  >
                    <Typography
                      variant='h3'
                      sx={{ margin: { xs: '0 auto', sm: '0 auto', md: '0 0 0 132px' } }}
                      color={theme.palette.text.secondary}
                    >
                      Excellence Spa Đỗ Quang
                    </Typography>
                    <Stack direction={{ xs: 'column-reverse', md: 'column' }}>
                      <Rating
                        name='size-small'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        readOnly
                        defaultValue={5}
                      ></Rating>
                      <Typography
                        component='div'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        variant='subtitle2'
                      >
                        Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Box sx={{ marginTop: { xs: '10px', md: '20px' } }}>
                <Typography variant='subtitle2'>
                  Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên. Trong hơn
                  19 năm qua, Excellence đã giúp hơn 285 ngàn...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ padding: { xs: '0 15px 15px 15px', md: '0 30px 30px 30px' } }}>
              <Typography variant='subtitle2' color='#00BC6D'>
                Đang mở cửa
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Card
            sx={{
              maxWidth: 1,
              position: 'relative',
              boxShadow:
                '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
            }}
          >
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
            />
            <CardContent sx={{ padding: { xs: '2px 15px 10px 15px', md: '4px 30px 30px 30px' } }}>
              <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                {/* Avatar */}
                <Box>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      top: { xs: 90, md: 110 },
                      left: { xs: '50%', sm: '50%', md: 30 },
                      transform: {
                        xs: 'translateX(-50%)',
                        sm: 'translateX(-50%)',
                        md: 'none',
                      },
                    }}
                    src='https://i.pinimg.com/236x/f8/28/f0/f828f043932924d093e3e6f2ef227535.jpg'
                  />
                </Box>
                {/* Infor SPA */}
                <Box
                  sx={{
                    marginLeft: '132px',
                    overflow: 'hidden',
                    margin: { xs: '50px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  }}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='flex-start'
                    spacing={0}
                  >
                    <Typography
                      variant='h3'
                      sx={{ margin: { xs: '0 auto', sm: '0 auto', md: '0 0 0 132px' } }}
                      color={theme.palette.text.secondary}
                    >
                      Excellence Spa Đỗ Quang
                    </Typography>
                    <Stack direction={{ xs: 'column-reverse', md: 'column' }}>
                      <Rating
                        name='size-small'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        readOnly
                        defaultValue={5}
                      ></Rating>
                      <Typography
                        component='div'
                        sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                        variant='subtitle2'
                      >
                        Địa chỉ: 138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Box sx={{ marginTop: { xs: '10px', md: '20px' } }}>
                <Typography variant='subtitle2'>
                  Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên. Trong hơn
                  19 năm qua, Excellence đã giúp hơn 285 ngàn...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ padding: { xs: '0 15px 15px 15px', md: '0 30px 30px 30px' } }}>
              <Typography variant='subtitle2' color='#00BC6D'>
                Đang mở cửa
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListStore
