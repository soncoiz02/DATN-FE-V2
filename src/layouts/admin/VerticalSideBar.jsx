import {
  CalendarMonth,
  Category,
  ExpandLess,
  ExpandMore,
  Home,
  Loyalty,
  Paid,
  PeopleAlt,
  WorkspacePremium,
} from '@mui/icons-material'
import {
  Avatar,
  Backdrop,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import GlassBox from '../../components/GlassBox'
import useAuth from '../../hook/useAuth'

const VERTICAL_ITEMS = [
  {
    key: 'main',
    header: 'Chung',
    role: ['Admin', 'Staff'],
    items: [
      {
        key: 'dashboard',
        title: 'Dashboard',
        icon: <Home />,
        path: '/admin/dashboard',
      },
      {
        key: 'calendar',
        title: 'Lịch đặt',
        icon: <CalendarMonth />,
        children: [
          {
            key: 'schedule',
            title: 'Bảng lịch',
            path: '/admin/calendar-schedule',
          },
          {
            key: 'list',
            title: 'Danh sách',
            path: '/admin/calendar-list',
          },
        ],
      },
    ],
  },
  {
    key: 'management',
    header: 'Quản lý',
    role: ['Admin'],
    items: [
      {
        key: 'category-management',
        title: 'Danh mục dịch vụ',
        icon: <Category />,
        path: '/admin/category-management',
      },
      {
        key: 'services-management',
        title: 'Dịch vụ',
        icon: <WorkspacePremium />,
        path: '/admin/services-management',
      },
      {
        key: 'users-management',
        title: 'Người dùng',
        icon: <PeopleAlt />,
        path: '/admin/users-management',
      },
      {
        key: 'staff',
        title: 'Nhân viên',
        icon: <PeopleAlt />,
        path: '/admin/staff',
      },
      {
        key: 'voucher-management',
        title: 'Voucher',
        icon: <Loyalty />,
        path: '/admin/voucher-management',
      },
    ],
  },
  {
    key: 'statistic',
    header: 'Thống kê',
    role: ['Admin'],
    items: [
      {
        key: 'revenue-statistic',
        title: 'Chung',
        icon: <Paid />,
        path: '/admin/statistic',
      },
      {
        key: 'users-statistic',
        title: 'Người dùng',
        icon: <PeopleAlt />,
        path: '/admin/users-statistic',
      },
    ],
  },
]

const VerticalSideBar = ({ openMenu, onCloseMenu }) => {
  const theme = useTheme()
  const [childOpenedIndex, setChildOpenedIndex] = useState()
  const [activeMainTitle, setActiveMainTitle] = useState()
  const { pathname } = useLocation()
  const { userInfo } = useAuth()

  return (
    <>
      {openMenu && (
        <Backdrop
          sx={{
            display: { xs: 'block', md: 'none' },
            zIndex: 99,
          }}
          open={true}
          onClick={onCloseMenu}
        ></Backdrop>
      )}
      <GradientBackground sx={{ left: { xs: openMenu ? 0 : '-100%', md: 0 } }}>
        <Stack gap={{ xs: 2, sm: 3 }}>
          <Box sx={{ padding: { xs: '15px', sm: '30px 15px' } }}>
            <GlassBox opacity={1} sx={{ padding: '15px' }}>
              <Stack direction='row' gap={2}>
                <Avatar
                  src={userInfo.avt}
                  sx={{
                    width: { xs: '35px', sm: '50px' },
                    height: { xs: '35px', sm: '50px' },
                  }}
                />
                <Stack>
                  <Typography variant='h3' sx={{ color: theme.palette.text.primary }}>
                    {userInfo?.name}
                  </Typography>
                  <Typography variant='body2' sx={{ color: theme.palette.text.primaryChannel }}>
                    {userInfo?.roleId.name === 'Admin' && 'Quản trị viên'}
                    {userInfo?.roleId.name === 'Staff' && 'Nhân viên'}
                  </Typography>
                </Stack>
              </Stack>
            </GlassBox>
          </Box>
          <Stack gap={2}>
            {VERTICAL_ITEMS.map((item) => (
              <div key={item.key}>
                {item.role.includes(userInfo?.roleId.name) && (
                  <List
                    subheader={
                      <Typography
                        variant='h4'
                        sx={{
                          color: theme.palette.text.primaryChannel,
                          textTransform: 'uppercase',
                          padding: '0 15px',
                          mb: 1,
                        }}
                      >
                        {item.header}
                      </Typography>
                    }
                  >
                    {item.items.map((subItem) => (
                      <div key={subItem.key}>
                        {subItem.children ? (
                          <>
                            <CustomListItemButton
                              className={`${activeMainTitle === subItem.key ? 'active' : ''}`}
                              onClick={() =>
                                setChildOpenedIndex(childOpenedIndex ? null : subItem.key)
                              }
                            >
                              <ListItemIcon sx={{ minWidth: '35px' }}>{subItem.icon}</ListItemIcon>
                              <Typography variant='body2'>{subItem.title}</Typography>
                              {childOpenedIndex === subItem.key ? (
                                <ExpandLess sx={{ ml: 'auto' }} />
                              ) : (
                                <ExpandMore sx={{ ml: 'auto' }} />
                              )}
                            </CustomListItemButton>
                            <Collapse
                              in={childOpenedIndex === subItem.key}
                              timeout='auto'
                              unmountOnExit
                            >
                              <List component='div' disablePadding>
                                {subItem.children.map((child) => (
                                  <ListItemButton
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to={child.path}
                                    onClick={() => {
                                      setActiveMainTitle(subItem.key)
                                      onCloseMenu()
                                    }}
                                    key={child.key}
                                  >
                                    <Typography
                                      variant='body2'
                                      color={
                                        pathname.includes(child.path)
                                          ? 'primary'
                                          : 'text.primaryChannel'
                                      }
                                    >
                                      {child.title}
                                    </Typography>
                                  </ListItemButton>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          <CustomListItemButton
                            key={subItem.key}
                            to={subItem.path}
                            component={NavLink}
                            onClick={() => {
                              setChildOpenedIndex(null)
                              setActiveMainTitle(null)
                              onCloseMenu()
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: '35px' }}>{subItem.icon}</ListItemIcon>
                            <Typography variant='body2'>{subItem.title}</Typography>
                          </CustomListItemButton>
                        )}
                      </div>
                    ))}
                  </List>
                )}
              </div>
            ))}
          </Stack>
        </Stack>
      </GradientBackground>
    </>
  )
}

const GradientBackground = styled(Box)(
  ({ theme }) => `
  position: sticky;
  width: 300px;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffff;
  overflow-y: auto;
  z-index: 99;
  transition: 0.5s;
  ${theme.breakpoints.down('md')} {
    border: none;
  }
  border-right: 1px dashed #d6d6d6;
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    width: 70%;
    left: -100%;
  }

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    position: fixed;
    width: 40%;
    left: -100%;
  }
`,
)

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '5px 0',
  '.MuiListItemIcon-root': {
    color: theme.palette.text.primaryChannel,
  },
  '.MuiTypography-body2': {
    color: theme.palette.text.primaryChannel,
  },
  '&.active': {
    background: '',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '5px',
      background: theme.palette.primary.main,
      borderRadius: '0 5px 5px 0',
    },
    '.MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '.MuiTypography-body2': {
      color: theme.palette.primary.main,
    },
  },
}))

export default VerticalSideBar
