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
import styled from 'styled-components'
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
              <CardMedia component='img' alt='green iguana' height='140' image={item.coverImg} />
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
                      src={item.avt}
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
                      <StyleTypoNameSpa
                        variant='h3'
                        sx={{ margin: { xs: '0 auto', sm: '0 auto', md: '0 0 0 132px' } }}
                        color={theme.palette.text.secondary}
                      >
                        {item.name}
                      </StyleTypoNameSpa>
                      <Stack direction={{ xs: 'column-reverse', md: 'column' }}>
                        <Rating
                          name='size-small'
                          sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                          readOnly
                          defaultValue={5}
                        ></Rating>
                        <StyleTypoAddress
                          sx={{ margin: { xs: '0 auto', md: '0 0 0 132px' } }}
                          variant='subtitle2'
                        >
                          Địa chỉ: {item.address}
                        </StyleTypoAddress>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                <Box sx={{ marginTop: { xs: '10px', md: '20px' } }}>
                  <StyleTypoDesc variant='subtitle2'>{item.desc}</StyleTypoDesc>
                </Box>
              </CardContent>
              <CardActions sx={{ padding: { xs: '0 15px 15px 15px', md: '0 30px 30px 30px' } }}>
                <Typography variant='subtitle2' color='#00BC6D'>
                  Đang mở cửa
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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
const StyleTypoNameSpa = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export default ListStore
