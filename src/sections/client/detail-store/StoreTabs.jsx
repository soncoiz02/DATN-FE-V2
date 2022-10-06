import { Article, Info, List, Poll } from '@mui/icons-material'
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TabInfo from './TabsItem/TabInfo'
import TabPost from './TabsItem/TabPost'
import TabRate from './TabsItem/TabRate'
import TabServices from './TabsItem/TabServices'

const StoreTabs = ({ props, services }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const storeInfo = props
  const location = useLocation()
  const { id } = useParams()
  //Tablist
  const tabList = [
    { name: 'Thông tin', icon: <Info />, element: <TabInfo storeInfo={storeInfo} />, link: 'info' },
    {
      name: 'Dịch vụ',
      icon: <List />,
      element: <TabServices services={services} />,
      link: 'services',
    },
    { name: 'Bài viết', icon: <Article />, element: <TabPost />, link: 'post' },
    { name: 'Đánh giá', icon: <Poll />, element: <TabRate />, link: 'rate' },
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

  // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

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
    <Box sx={{ marginTop: { xs: '24px', sm: '0' }, width: '100%', padding: '0' }}>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
          scrollButtons={false}
          sx={{
            marginTop: '-2px',
            padding: { xs: '0', sm: '0 20px' },
            justifyContent: { xs: 'center', sm: 'start' },
            '& button': {
              width: { xs: '120px', sm: '150px', md: '200px' },
              height: { xs: '30px', sm: '60px' },
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              textTransform: 'uppercase',
              fontSize: { xs: '12px', sm: '18px' },
              transition: '0.3s',
              fontWeight: '700',
              background: '#fff',
            },
            '& button:hover': { background: '#0000001a' },
            '& button.Mui-selected': { backgroundColor: theme.palette.primary.main, color: '#fff' },
          }}
        >
          {tabList.map((item, index) => (
            <Tab
              sx={{}}
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
