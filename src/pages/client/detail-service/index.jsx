import { Box, Stack, styled, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import GlassBox from '../../../components/GlassBox'
import DescriptionTab from '../../../sections/client/detail-services/DescriptionTab'
import RatedTab from '../../../sections/client/detail-services/RatedTab'
import ServiceInfo from '../../../sections/client/detail-services/ServiceInfo'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const DetailService = () => {
  const [tabValue, setTabValue] = useState(0)
  return (
    <Stack gap={4}>
      <ServiceInfo />
      <GlassBox opacity={0.8}>
        <Stack gap={3}>
          <CustomTab value={tabValue} onChange={(e, value) => setTabValue(value)}>
            <Tab label='Tổng quan' id='tab-0' aria-controls='tab-panel-0' />
            <Tab label='Đánh giá' id='tab-1' aria-controls='tab-panel-1' />
          </CustomTab>
          <DescriptionTab value={tabValue} index={0} />
          <RatedTab value={tabValue} index={1} />
        </Stack>
      </GlassBox>
    </Stack>
  )
}

const CustomTab = styled(Tabs)(({ theme }) => ({
  '.MuiButtonBase-root': {
    borderRadius: '10px',
    transition: '0.3s',
    '&.Mui-selected': {
      color: 'white',
    },
  },
  '.MuiTabs-indicator': {
    height: '100%',
    borderRadius: '10px',
    zIndex: -1,
  },
}))

export default DetailService
