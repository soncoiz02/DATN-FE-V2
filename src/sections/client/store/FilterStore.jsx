import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Stack,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Rating,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'

const FilterStore = () => {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <GlassBox
      sx={{
        display: { xs: 'none', md: 'block' },
        paddingTop: '94px',
        height: 1,
        borderRadius: 0,
      }}
    >
      <Box sx={{ padding: '0 30px' }}>
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
                <Typography textAlign='left' variant='h3' color={theme.palette.text.secondary}>
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
    </GlassBox>
  )
}

export default FilterStore
