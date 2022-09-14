import React from 'react'
import { Menu, CheckCircle, NotInterested, FilterAlt } from '@mui/icons-material'
import GlassBox from '../../../components/GlassBox'
import { Box, Stack, styled, Typography } from '@mui/material'
import { green, pink, red, yellow } from '@mui/material/colors'

const StatusTab = () => {
  return (
    <BoxStatus>
      <GlassBox sx={{ p: '5px 15px', borderRadius: '10px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' gap={2} alignItems='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <Menu sx={{ color: yellow[600], fontSize: '20px' }} />
              <Typography variant='body1'>Chưa hoàn thành</Typography>
            </Stack>
            <Stack direction='row' gap={1} alignItems='center'>
              <CheckCircle sx={{ color: green[600], fontSize: '20px' }} />
              <Typography variant='body1'>Đã hoàn thành</Typography>
            </Stack>
            <Stack direction='row' gap={1} alignItems='center'>
              <NotInterested sx={{ color: red[600], fontSize: '20px' }} />
              <Typography variant='body1'>Đã hủy</Typography>
            </Stack>
          </Stack>
          <FilterAlt sx={{ color: pink[600], fontSize: '30px' }} />
        </Stack>
      </GlassBox>
    </BoxStatus>
  )
}

const BoxStatus = styled(Box)`
  padding: 24px;
`

export default StatusTab
