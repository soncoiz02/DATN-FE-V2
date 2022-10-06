import { Typography } from '@mui/material'
import React from 'react'
import GlassBox from '../../../../components/GlassBox'

const TabInfo = ({ storeInfo }) => {
  const desc = storeInfo?.desc

  return (
    <GlassBox sx={{ padding: '24px', borderRadius: '20px', backdropFilter: 'unset' }}>
      <Typography variant='h2' textTransform='uppercase'>
        giới thiệu
      </Typography>
      <Typography sx={{ marginTop: '15px' }} variant='subtitle1'>
        {desc}
      </Typography>
    </GlassBox>
  )
}

export default TabInfo
