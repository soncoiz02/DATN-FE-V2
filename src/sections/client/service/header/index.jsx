import { Search } from '@mui/icons-material'
import { Grid, IconButton, Input, InputBase, Stack, styled } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ListCategory from './ListCategory'

const ServiceHeader = () => {
  const navigate = useNavigate()

  const debounce = (func) => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 1000)
    }
  }

  const handleChange = (value) => {
    if (value) {
      navigate(`/service?key=${value}`)
    } else {
      navigate(`/service`)
    }
  }

  const optimizedFn = useCallback(debounce(handleChange), [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <ListCategory />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack direction='row' sx={{ py: 2 }}>
          <CustomInput
            placeholder='Tìm kiếm'
            endAdornment={
              <IconButton color='primary'>
                <Search />
              </IconButton>
            }
            onChange={(e) => optimizedFn(e.target.value)}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

const CustomInput = styled(InputBase)`
  width: 100%;
  padding: 5px 15px;
  border-radius: 50px;
  border: none;
  outline: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

export default ServiceHeader
