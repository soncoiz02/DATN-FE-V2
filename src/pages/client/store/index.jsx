import { Search } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Rating,
  Select,
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
    <Box>
      <Grid container spacing={5}>
        {/* AsideMenu */}
        <Grid item xs={3}></Grid>
        {/* MainContent */}
        <Grid item xs={9}>
          <Box sx={{ paddingTop: '80px', paddingRight: '20px' }}>
            {/* Search & Sort */}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <GlassBox
                  component='form'
                  sx={{
                    p: '5px 5px 5px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 1,
                    height: '50px',
                    borderRadius: '50px',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Tìm kiếm'
                    inputProps={{ 'aria-label': 'Tìm kiếm' }}
                  />
                  <IconButton
                    type='button'
                    sx={{ p: '10px', backgroundColor: theme.palette.primary.main, color: '#fff' }}
                    aria-label='search'
                  >
                    <Search />
                  </IconButton>
                </GlassBox>
              </Grid>
              <Grid item xs={4}>
                {/* <GlassBox sx={{ p: '0', display: 'flex', width: 1, height: '50px', borderRadius: '5px' }}> */}
                <FormControl sx={{ width: 1, maxHeight: 1 }}>
                  <Select
                    defaultValue=''
                    sx={{
                      width: 1,
                      height: '50px',
                      fontSize: '14px',
                      boxShadow:
                        '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '.MuiOutlinedInput-root': {
                        '&:hover': {
                          borderRadius: 50,
                          borderColor: 'red',
                          borderWidth: 10,
                        },
                      },
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    displayEmpty
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value=''>
                      <em>Sắp xếp</em>
                    </MenuItem>
                    <ListSubheader>Tên</ListSubheader>
                    <MenuItem value={1}>A - Z</MenuItem>
                    <MenuItem value={2}>Z - A</MenuItem>
                    <ListSubheader>Đánh giá</ListSubheader>
                    <MenuItem value={3}>Cao - Thấp</MenuItem>
                    <MenuItem value={4}>Thấp - Cao</MenuItem>
                  </Select>
                </FormControl>
                {/* </GlassBox> */}
              </Grid>
            </Grid>
            {/* List Store */}
            <Box sx={{ padding: '0 50px', marginTop: '38px' }}>
              <Grid container spacing={6}>
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
                        {/* Sort   */}
                        <Box
                          sx={{
                            marginLeft: '132px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'noWrap',
                          }}
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
                            <Typography component='div' variant='subtitle2'>
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
                      <Typography variant='subtitle2' color='#00BC6D'>
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
                            <Typography variant='subtitle2' noWrap>
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
                      <Typography variant='subtitle2' color='#FF4848'>
                        Đang đóng cửa
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Store
