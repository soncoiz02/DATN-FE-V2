import { Search } from '@mui/icons-material'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  ListSubheader,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material'
import React from 'react'
import GlassBox from '../../../components/GlassBox'

const FunctionBar = () => {
  const theme = useTheme()
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <GlassBox
            component='form'
            sx={{
              p: '5px 5px 5px 20px',
              display: 'flex',
              alignItems: 'center',
              width: 1,
              height: '50px',
              borderRadius: '50px',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Tìm kiếm'
              inputProps={{ 'aria-label': 'Tìm kiếm' }}
            />
            <IconButton
              type='button'
              sx={{ p: '10px', backgroundColor: theme.palette.primary.main, color: '#fff' }}
              aria-label='search'
            >
              <Search />
            </IconButton>
          </GlassBox>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: 1, maxHeight: 1 }}>
            <Select
              sx={{
                width: 1,
                height: '50px',
                fontSize: '14px',
                boxShadow:
                  '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '.MuiOutlinedInput-root': {
                  '&:hover': {
                    borderRadius: 50,
                    borderColor: 'red',
                    borderWidth: 10,
                  },
                },
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value=''>
                <em>Sắp xếp</em>
              </MenuItem>
              <ListSubheader>Tên</ListSubheader>
              <MenuItem value={1}>A - Z</MenuItem>
              <MenuItem value={2}>Z - A</MenuItem>
              <ListSubheader>Đánh giá</ListSubheader>
              <MenuItem value={3}>Cao - Thấp</MenuItem>
              <MenuItem value={4}>Thấp - Cao</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FunctionBar
