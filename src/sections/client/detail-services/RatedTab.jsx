import { Edit, Star } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import React from 'react'

const RatedTab = ({ index, value, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box>
        <Stack gap={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems='center'
            justifyContent='center'
            gap={{ xs: 1, md: 6 }}
          >
            <Stack
              sx={{ height: '100%', width: { xs: '100%', md: 'calc(100% / 3)' } }}
              gap={1}
              justifyContent='center'
              alignItems='center'
            >
              <Typography variant='body1'>Đánh giá trung bình</Typography>
              <Stack direction='row' gap={1} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <PrimaryColorText>4.9</PrimaryColorText>
                  <Typography variant='subtitile1'>/5.0</Typography>
                </Stack>
                <Star sx={{ color: yellow[600], fontSize: '30px' }} />
              </Stack>
              <Typography
                variant='body1'
                sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                Tổng <PrimaryColorText>100</PrimaryColorText> đánh giá
              </Typography>
            </Stack>
            <Divider orientation='vertical' variant='middle' flexItem />
            <Stack gap={2} sx={{ width: { xs: '100%', md: 'calc(100% / 3)' } }}>
              <Stack direction='row' gap={1.5} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <Typography variant='subtitile1'>5</Typography>
                  <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <CustomProgress variant='determinate' value={90} />
                </Box>
                <Typography variant='subtitile1'>90</Typography>
              </Stack>
              <Stack direction='row' gap={1.5} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <Typography variant='subtitile1'>4</Typography>
                  <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <CustomProgress variant='determinate' value={10} />
                </Box>
                <Typography variant='subtitile1'>10</Typography>
              </Stack>
              <Stack direction='row' gap={1.5} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <Typography variant='subtitile1'>3</Typography>
                  <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <CustomProgress variant='determinate' value={0} />
                </Box>
                <Typography variant='subtitile1'>0</Typography>
              </Stack>
              <Stack direction='row' gap={1.5} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <Typography variant='subtitile1'>2</Typography>
                  <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <CustomProgress variant='determinate' value={0} />
                </Box>
                <Typography variant='subtitile1'>0</Typography>
              </Stack>
              <Stack direction='row' gap={1.5} alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <Typography variant='subtitile1'>1</Typography>
                  <Star sx={{ color: yellow[600], fontSize: '24px' }} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <CustomProgress variant='determinate' value={0} />
                </Box>
                <Typography variant='subtitile1'>0</Typography>
              </Stack>
            </Stack>
            <Divider orientation='vertical' variant='middle' flexItem />
            <Stack
              sx={{ height: '100%', width: { xs: '100%', md: 'calc(100% / 3)' } }}
              justifyContent='center'
              alignItems='center'
            >
              <CustomOutlineButton startIcon={<Edit />} variant='outlined'>
                Đánh giá của bạn
              </CustomOutlineButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

const PrimaryColorText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '24px',
  fontWeight: 700,
}))

const CustomProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: '50px',
  '.MuiLinearProgress-bar': {
    borderRadius: '50px',
  },
})

const CustomOutlineButton = styled(Button)(({ theme }) => ({
  padding: '15px 45px',
  textAlign: 'center',
  borderRadius: '10px',
  '.MuiButton-startIcon>*:nth-of-type(1)': {
    fontSize: '24px',
  },
}))

export default RatedTab
