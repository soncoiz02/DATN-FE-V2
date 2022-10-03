import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import GlassBox from '../../../components/GlassBox'
import TabInfo from './TabsItem/TabInfo'
import TabPost from './TabsItem/TabPost'
import TabRate from './TabsItem/TabRate'
import TabServices from './TabsItem/TabServices'

const StoreTabs = ({ props, services }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const storeDesc = props?.desc
  const location = useLocation()
  const { id } = useParams()
  //Tablist
  const tabList = [
    { name: 'Thông tin', element: <TabInfo storeDesc={storeDesc} />, link: 'info' },
    { name: 'Dịch vụ', element: <TabServices services={services} />, link: 'services' },
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
    paramItemSelected = `/store/${id}/${linkItem}`
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
    <Box sx={{ width: '100%', padding: '0' }}>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            marginTop: '-1px',
            w: 1,
            padding: '0 20px',
            '& button': {
              width: '200px',
              height: '60px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              textTransform: 'uppercase',
              fontSize: '18px',
              transition: '0.3s',
              fontWeight: '700',
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
