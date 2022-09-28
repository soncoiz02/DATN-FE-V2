import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import GlassBox from '../../../components/GlassBox'
import TabInfo from './TabsItem/TabInfo'
import TabPost from './TabsItem/TabPost'
import TabRate from './TabsItem/TabRate'
import ListServicesByStore from './TabsItem/TabServices'

const StoreTabs = ({ props }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const storeDesc = props?.desc
  const location = useLocation()
  const { id } = useParams()
  //Tablist
  const tabList = [
    { name: 'Thông tin', element: <TabInfo storeDesc={storeDesc} />, link: 'info' },
    { name: 'Dịch vụ', element: <ListServicesByStore />, link: 'services' },
    { name: 'Bài viết', element: <TabPost />, link: 'post' },
    { name: 'Đánh giá', element: <TabRate />, link: 'rate' },
  ]
  //TabPanel
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
  let linkItemSelected = ''
  let paramItemSelected = ''
  const tabChange = (linkItem) => {
    linkItemSelected = linkItem
    // console.log(linkItem);
    // console.log(number);
    paramItemSelected = `/store/${id}/${linkItem}`
    console.log(paramItemSelected)
    navigate(linkItem)
  }

  useEffect(() => {
    if (location.pathname == `/store/${id}/info`) {
      setValue(0)
    }
    if (location.pathname == `/store/${id}/services`) {
      setValue(1)
    }
    if (location.pathname == `/store/${id}/post`) {
      setValue(2)
    }
    if (location.pathname == `/store/${id}/rate`) {
      setValue(3)
    }
  }, [linkItemSelected])

  return (
    <Box sx={{ width: '100%', padding: '0', marginTop: '-66px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            w: 1,
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            padding: '0 20px',
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
          {tabList.map((item, index) => (
            <Tab
              label={item.name}
              {...a11yProps(index)}
              key={index}
              onClick={() => tabChange(item.link)}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ padding: '0 20px' }}>
        {tabList.map((item, index) => (
          <TabPanel key={index} value={value} index={index} sx={{ padding: '0' }}>
            {item.element}
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

export default StoreTabs
