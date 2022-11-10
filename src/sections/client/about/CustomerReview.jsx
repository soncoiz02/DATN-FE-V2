import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const CustomerReview = () => {
  return (
    <Box
      sx={{
        background: '#FFBC99',
        padding: '70px 0',
        margin: '0 0 30px',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <NameSpa justifyContent='center' padding='45px 20px 20px 20px'>
              Beauty Paradise
            </NameSpa>
            <DescriptTion1>
              Đầu tư vào mái tóc của bạn bởi vì nó là vương miện mà bạn không bao giờ cởi ra!
            </DescriptTion1>
          </Grid>
          <Divider orientation='vertical' flexItem xs></Divider>
          <Grid item xs>
            <Stack>
              <ImageTool src='http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/07/ic2.png' />
              <TitleIntroduce>Skin & Foot Care</TitleIntroduce>
              <Divider
                sx={{
                  margin: '10px',
                  width: '100px',
                  backgroundColor: ' #000',
                  marginBottom: '20px',
                }}
              />
              <DescriptTion>
                Tẩy lông toàn thân, làm móng tay, móng chân, móng tay điêu khắc và Podiatry.
              </DescriptTion>
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack>
              <ImageTool src='http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/07/ic11.png' />
              <TitleIntroduce>Hair & Facials</TitleIntroduce>
              <Divider
                sx={{
                  margin: '10px',
                  width: '100px',
                  backgroundColor: ' #000',
                  marginBottom: '20px',
                }}
              />
              <DescriptTion>
                Nhuộm tóc, gội đầu, điều hòa, uốn tóc và tất cả các loại mặt
              </DescriptTion>
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack>
              <ImageTool src='http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/07/ic12.png' />
              <TitleIntroduce>Aromatherapy</TitleIntroduce>
              <Divider
                sx={{
                  margin: '10px',
                  width: '100px',
                  backgroundColor: ' #000',
                  marginBottom: '20px',
                }}
              />
              <DescriptTion>
                Liệu pháp massage và hương liệu để chăm sóc cơ thể, tâm trí & tâm hồn.
              </DescriptTion>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
const TitleIntroduce = styled(Typography)`
  text-align: left;
  font-size: 25px;
  line-height: 20px;
  font-weight: 800;
  color: #00000;
  text-transform: uppercase;
  margin: 10px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const ImageTool = styled('img')`
  padding: 10px
  height: 80px;
  width: 80px;
  color: #00000;
`
const DescriptTion = styled(Typography)`
  text-align: justify;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  font-weight: 600;
  color: #464646;
  margin: 10px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const DescriptTion1 = styled(Typography)`
  text-align: justify;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  justify-content: center;
  font-weight: 500;
  color: #464646;
  margin: 10px 10px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const NameSpa = styled(Typography)`
  font-size: 30px;
  font-family: Display;
  font-style: italic;
  line-height: 30px;
  justify-content: center;
  font-weight: 400;
  color: #ff6073;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default CustomerReview
