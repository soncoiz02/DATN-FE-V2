import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'
import TabInfo from './TabsItem/TabInfo'
import ListServicesByStore from './TabsItem/TabServices'

const StoreTabs = () => {
  const theme = useTheme()

  function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 0, marginTop: '24px' }}>{children}</Box>}
      </div>
    )
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', padding: '0 20px', marginTop: '-66px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            '& button': {
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              textTransform: 'uppercase',
              fontSize: '18px',
              transition: '0.3s',
            },
            '& button:hover': { background: '#0000001a' },
            '& button.Mui-selected': { backgroundColor: theme.palette.primary.main, color: '#fff' },
          }}
        >
          <Tab label='Thông tin' {...a11yProps(0)} />
          <Tab label='Dịch vụ' {...a11yProps(1)} />
          <Tab label='Bài viết' {...a11yProps(2)} />
          <Tab label='Đánh giá' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{ padding: '0' }}>
        <TabInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListServicesByStore />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Bài viết
      </TabPanel>
      <TabPanel value={value} index={3}>
        Đánh giá
      </TabPanel>
    </Box>
  )
}

export default StoreTabs
