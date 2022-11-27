import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getStatusColor } from '../../../../../utils/aboutColor'

const ChangeStatus = ({ status, setStatus }) => {
  const [statusOptions, setStatusOptions] = useState()

  const allStatus = useSelector((state) => state.order.status)

  const handleGetStatusOptions = () => {
    const statusOptions = allStatus.map((status) => ({
      id: status._id,
      label: status.name,
      type: status.type,
    }))
    setStatusOptions(statusOptions)
  }

  const handleDisableOptions = (optionType) => {
    if (status.type === 'pending') {
      if (optionType === 'done' || optionType === 'paid') return true
      return false
    }
    if (status.type === 'accepted') {
      if (optionType === 'pending' || optionType === 'paid') return true
      return false
    }
    if (status.type === 'done') {
      if (optionType === 'pending' || optionType === 'accepted' || optionType === 'reject')
        return true
      return false
    }
    if (status.type === 'reject') {
      if (optionType === 'pending' || optionType === 'done' || optionType === 'paid') return true
      return false
    }
    return false
  }

  useState(() => {
    handleGetStatusOptions()
  }, [])

  return (
    <Stack gap={2}>
      <Typography variant='h3'>Trạng thái</Typography>
      <Autocomplete
        value={status || null}
        onChange={(_, data) => setStatus(data)}
        options={statusOptions || []}
        disablePortal
        getOptionLabel={(option) => option.label || ''}
        getOptionDisabled={(option) => handleDisableOptions(option.type)}
        renderOption={(props, option) => (
          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <Box
              sx={{
                width: '20px',
                height: '20px',
                background: (theme) => theme.palette[getStatusColor(option.type)]?.main,
                borderRadius: '50%',
                mr: 1,
              }}
            ></Box>
            {option.label}
          </Box>
        )}
        fullWidth
        renderInput={(params) => <TextField {...params} label='Trạng thái' />}
      />
    </Stack>
  )
}

export default ChangeStatus
