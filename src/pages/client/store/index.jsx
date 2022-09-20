import { Global } from '@emotion/react'
import { ExpandLess, ExpandMore, KeyboardArrowDown, Search, StarBorder } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Rating,
  Select,
  Skeleton,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import GlassBox from '../../../components/GlassBox'

const Store = (props) => {
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  const theme = useTheme()

  const [openFilter, setOpenFilter] = React.useState(false)

  const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: '#fff',
  }))

  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
  }))

  const drawerBleeding = 56

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }))

  const { window } = props
  const toggleDrawer = (newOpen) => () => {
    setOpenFilter(newOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box>
      {/* Filter Mobile */}
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <Box sx={{ textAlign: 'center', pt: 1, display: { xs: 'none', md: 'none' } }}>
          <Button onClick={toggleDrawer(true)}>Bộ lọc</Button>
        </Box>
        <SwipeableDrawer
          sx={{ display: { xs: 'block', md: 'none' } }}
          container={container}
          anchor='bottom'
          open={openFilter}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
              borderTop: '1px solid ##e0e0e0',
            }}
          >
            <Puller />
            <Typography variant='h3' textAlign='center' sx={{ p: 3 }}>
              Lọc cửa hàng
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                display: { xs: 'block', md: 'block' },
                paddingTop: '15px',
                height: 1,
                borderRadius: 0,
              }}
            >
              <Box>
                <Box>
                  <Typography textAlign='center' variant='h3' color={theme.palette.text.secondary}>
                    Bộ lọc
                  </Typography>
                </Box>
                <Divider sx={{ margin: '20px 0' }} />
                <Box>
                  <List
                    sx={{ width: '100%', maxWidth: 1, padding: '0' }}
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                      <ListSubheader sx={{ padding: 0 }} component='div' id='nested-list-subheader'>
                        <Typography
                          textAlign='left'
                          variant='h3'
                          color={theme.palette.text.secondary}
                        >
                          Khu vực
                        </Typography>
                      </ListSubheader>
                    }
                  >
                    <Box>
                      <Divider sx={{ margin: '10px 0' }} color={theme.palette.primary.main} />
                      <ListItemButton onClick={handleClick} sx={{ padding: '0 10px' }}>
                        <ListItemText primary={'Hà Nội'} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          <ListItemButton sx={{ p: '0 15px' }}>
                            <ListItemText primary='Mỹ Đình' />
                          </ListItemButton>
                          <ListItemButton sx={{ p: '0 15px' }}>
                            <ListItemText primary='Thanh Xuân' />
                          </ListItemButton>
                          <ListItemButton sx={{ p: '0 15px' }}>
                            <ListItemText primary='Cầu Giấy' />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </Box>
                    <Box>
                      <Divider sx={{ margin: '10px 0' }} color={theme.palette.primary.main} />
                      <ListItemButton onClick={handleClick} sx={{ padding: '0 10px' }}>
                        <ListItemText primary={'Quảng Ninh'} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          <ListItemButton sx={{ p: '0 15px' }}>
                            <ListItemText primary='Uông Bí' />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </Box>
                  </List>
                  <Divider sx={{ margin: '20px 0' }} />
                  <Box>
                    <Box>
                      <Typography
                        textAlign='left'
                        variant='h3'
                        color={theme.palette.text.secondary}
                      >
                        Đánh giá
                      </Typography>
                    </Box>
                    <Box>
                      <Stack
                        direction='row'
                        sx={{ margin: '10px 0' }}
                        justifyContent='space-between'
                      >
                        <Rating name='size-medium' readOnly defaultValue={5} />
                        <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                          Trở xuống
                        </Typography>
                      </Stack>
                      <Stack
                        direction='row'
                        sx={{ margin: '10px 0' }}
                        justifyContent='space-between'
                      >
                        <Rating name='size-medium' readOnly defaultValue={4} />
                        <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                          Trở xuống
                        </Typography>
                      </Stack>
                      <Stack
                        direction='row'
                        sx={{ margin: '10px 0' }}
                        justifyContent='space-between'
                      >
                        <Rating name='size-medium' readOnly defaultValue={3} />
                        <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                          Trở xuống
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
      {/* End Filter Mobile */}
      <Grid container spacing={5}>
        {/* AsideMenu */}
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <GlassBox
            sx={{
              display: { xs: 'none', md: 'block' },
              paddingTop: '94px',
              height: 1,
              borderRadius: 0,
            }}
          >
            <Box>
              <Box>
                <Typography textAlign='center' variant='h3' color={theme.palette.text.secondary}>
                  Bộ lọc
                </Typography>
              </Box>
              <Divider sx={{ margin: '20px 0' }} />
              <Box>
                <List
                  sx={{ width: '100%', maxWidth: 1, padding: '0' }}
                  component='nav'
                  aria-labelledby='nested-list-subheader'
                  subheader={
                    <ListSubheader sx={{ padding: 0 }} component='div' id='nested-list-subheader'>
                      <Typography
                        textAlign='left'
                        variant='h3'
                        color={theme.palette.text.secondary}
                      >
                        Khu vực
                      </Typography>
                    </ListSubheader>
                  }
                >
                  <Box>
                    <Divider sx={{ margin: '10px 0' }} color={theme.palette.primary.main} />
                    <ListItemButton onClick={handleClick} sx={{ padding: '0 10px' }}>
                      <ListItemText primary={'Hà Nội'} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Mỹ Đình' />
                        </ListItemButton>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Thanh Xuân' />
                        </ListItemButton>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Cầu Giấy' />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </Box>
                  <Box>
                    <Divider sx={{ margin: '10px 0' }} color={theme.palette.primary.main} />
                    <ListItemButton onClick={handleClick} sx={{ padding: '0 10px' }}>
                      <ListItemText primary={'Quảng Ninh'} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Uông Bí' />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </Box>
                </List>
                <Divider sx={{ margin: '20px 0' }} />
                <Box>
                  <Box>
                    <Typography textAlign='left' variant='h3' color={theme.palette.text.secondary}>
                      Đánh giá
                    </Typography>
                  </Box>
                  <Box>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={5} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={4} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={3} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </GlassBox>
        </Grid>
        {/* MainContent */}
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Box sx={{ padding: { xs: '0 10px', md: '80px 20px' } }}>
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
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Card sx={{ maxWidth: 1, position: 'relative' }}>
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      height='140'
                      image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                    />
                    <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                        {/* Avatar */}
                        <Box>
                          <Avatar
                            sx={{
                              width: 100,
                              height: 100,
                              position: 'absolute',
                              top: 110,
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
                            margin: { xs: '80px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
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
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Card sx={{ maxWidth: 1, position: 'relative' }}>
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      height='140'
                      image='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                    />
                    <CardContent sx={{ padding: '4px 30px 30px 30px' }}>
                      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }}>
                        {/* Avatar */}
                        <Box>
                          <Avatar
                            sx={{
                              width: 100,
                              height: 100,
                              position: 'absolute',
                              top: 110,
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
                            margin: { xs: '80px auto 0 auto', sm: '80px auto 0 auto', md: '0' },
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

const ResponsiveTitleCard = {
  border: '',
}

export default Store
