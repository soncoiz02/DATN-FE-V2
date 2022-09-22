import { Search } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  ListSubheader,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import storeApi from '../../../api/store'
import GlassBox from '../../../components/GlassBox'

const ListStore = () => {
  const theme = useTheme()
  const [storeSpa, setStoreSpa] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({})

  const { register, handleSubmit } = useForm()

  const keyword = searchParams.get('keyword')

  const onSubmit = (data) => {
    setSearchParams({ keyword: data.keyword })
  }

  const getDataStoreSpa = async () => {
    try {
      const data = await storeApi.getAll()
      setStoreSpa(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getDataStoreByKeyWord = async (word) => {
    try {
      const data = await storeApi.search(word)
      setStoreSpa(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (searchParams.get('keyword')) {
      getDataStoreByKeyWord(keyword)
    } else {
      getDataStoreSpa()
    }
  }, [keyword])

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
              <GlassBox
                component='div'
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
                  {...register('keyword')}
                />
                <IconButton
                  type='submit'
                  sx={{ p: '10px', backgroundColor: theme.palette.primary.main, color: '#fff' }}
                  aria-label='search'
                >
                  <Search />
                </IconButton>
              </GlassBox>
            </form>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: { xs: '0', md: '0 50px' }, marginTop: '38px' }}>
        <Grid container spacing={{ xs: 1, md: 6 }}>
          {storeSpa.map((item, index) => (
            <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
              <Card
                sx={{
                  maxWidth: 1,
                  position: 'relative',
                  boxShadow:
                    '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                }}
              >
                {/* Background */}
                <CardMedia
                  component='img'
                  alt='green iguana'
                  height='140'
                  image={item.coverImg}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                />
                <CardContent
                  sx={{ padding: { xs: '10px 10px 5px 10px', md: '4px 30px 30px 30px' } }}
                >
                  {/* sm< */}
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Stack
                      alignItems='center'
                      justifyContent='flex-start'
                      direction='row'
                      spacing={1}
                    >
                      {/* Avatar */}
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                        src={item.avt}
                      />
                      <Box>
                        <Stack direction='column'>
                          {/* Name */}
                          <StyleTypoNameSpaMobile variant='h4' color={theme.palette.text.secondary}>
                            {item.name}
                          </StyleTypoNameSpaMobile>
                          {/* Rating */}
                          <Rating name='size-small' readOnly size='small' defaultValue={5}></Rating>
                        </Stack>
                      </Box>
                    </Stack>
                    <StyleTypoAddressMobile sx={{ fontSize: '10px' }} variant=''>
                      Địa chỉ: {item.address}
                    </StyleTypoAddressMobile>
                  </Box>

                  {/* >sm */}
                  <Stack
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
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
                        src={item.avt}
                      />
                    </Box>
                    {/* Infor SPA */}
                    <Box
                      sx={{
                        marginLeft: '132px',
                        overflow: 'hidden',
                        margin: { sm: '50px auto 0 auto', md: '0' },
                        textAlign: { sm: 'center', md: 'left' },
                      }}
                    >
                      <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={0}
                      >
                        <StyleTypoNameSpa
                          variant='h3'
                          sx={{ margin: { sm: '0 auto', md: '0 0 0 132px' } }}
                          color={theme.palette.text.secondary}
                        >
                          {item.name}
                        </StyleTypoNameSpa>
                        <Stack
                          direction={{ sm: 'column-reverse', md: 'column' }}
                          justifyContent='center'
                          sx={{ width: 1 }}
                        >
                          <Rating
                            name='size-small'
                            sx={{ margin: { sm: '0 auto', md: '0 0 0 132px' } }}
                            readOnly
                            defaultValue={5}
                          ></Rating>
                          <StyleTypoAddress
                            sx={{ margin: { sm: '0 auto', md: '0 0 0 132px' } }}
                            variant='subtitle2'
                          >
                            Địa chỉ: {item.address}
                          </StyleTypoAddress>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                  {/* DESC */}
                  <Box sx={{ marginTop: { xs: '0', md: '20px' } }}>
                    <StyleTypoDesc variant='subtitle2'>{item.desc}</StyleTypoDesc>
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: { xs: '0 10px 10px 10px', md: '0 30px 30px 30px' } }}>
                  <Typography variant='subtitle2' color='#00BC6D'>
                    Đang mở cửa
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

const StyleTypoDesc = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const StyleTypoAddress = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const StyleTypoAddressMobile = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const StyleTypoNameSpaMobile = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const StyleTypoNameSpa = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default ListStore
