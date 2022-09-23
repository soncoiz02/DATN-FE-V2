import { Global } from '@emotion/react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Collapse,
  CssBaseline,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Rating,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const FilterStoreMobile = (props) => {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()

  const handleClick = () => {
    setOpen(!open)
  }
  const [openFilter, setOpenFilter] = React.useState(false)

  const Root = styled('div')(() => ({
    height: '100%',
    backgroundColor: '#fff',
  }))

  const StyledBox = styled(Box)(() => ({
    backgroundColor: '#fff',
  }))

  const drawerBleeding = 56

  const Puller = styled(Box)(() => ({
    width: 30,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }))

  const { window } = props
  const toggleDrawer = (newOpen) => () => {
    setOpenFilter(newOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1, display: { xs: 'none', md: 'none' } }}></Box>
      <SwipeableDrawer
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
        container={container}
        anchor='bottom'
        open={openFilter}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            borderTop: '1px solid rgba(145, 158, 171, 0.12)',
            boxShadow: '0px -5px 5px -5px rgba(145, 158, 171, 0.12)',
          }}
        >
          <Puller />
          <Typography variant='h3' textAlign='center' sx={{ p: 3 }}>
            Lọc cửa hàng
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: { xs: 'block', md: 'block' },
              paddingTop: '15px',
              height: 1,
              borderRadius: 0,
            }}
          >
            <Box>
              <Box>
                <Typography textAlign='center' variant='h3' color={theme.palette.text.secondary}>
                  Bộ lọc
                </Typography>
              </Box>
              <Divider sx={{ margin: '20px 0' }} />
              <Box>
                <List
                  sx={{ width: '100%', maxWidth: 1, padding: '0' }}
                  component='nav'
                  aria-labelledby='nested-list-subheader'
                  subheader={
                    <ListSubheader sx={{ padding: 0 }} component='div' id='nested-list-subheader'>
                      <Typography
                        textAlign='left'
                        variant='h3'
                        color={theme.palette.text.secondary}
                      >
                        Khu vực
                      </Typography>
                    </ListSubheader>
                  }
                >
                  <Box>
                    <Divider sx={{ margin: '10px 0' }} color={theme.palette.primary.main} />
                    <ListItemButton onClick={handleClick} sx={{ padding: '0 10px' }}>
                      <ListItemText primary={'Hà Nội'} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Mỹ Đình' />
                        </ListItemButton>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Thanh Xuân' />
                        </ListItemButton>
                        <ListItemButton sx={{ p: '0 15px' }}>
                          <ListItemText primary='Cầu Giấy' />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </Box>
                </List>
                <Divider sx={{ margin: '20px 0' }} />
                <Box>
                  <Box>
                    <Typography textAlign='left' variant='h3' color={theme.palette.text.secondary}>
                      Đánh giá
                    </Typography>
                  </Box>
                  <Box>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={5} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={4} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '10px 0' }} justifyContent='space-between'>
                      <Rating name='size-medium' readOnly defaultValue={3} />
                      <Typography variant='subtitle2' sx={{ fontSize: '14px' }}>
                        Trở xuống
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

export default FilterStoreMobile
