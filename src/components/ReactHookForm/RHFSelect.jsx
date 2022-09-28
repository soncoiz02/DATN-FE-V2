import { FormControl, InputLabel, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFSelect = ({ name, children, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          select
          {...field}
          {...other}
          error={!!error}
          helperText={error?.message}
          fullWidth
        >
          {children}
        </TextField>
      )}
    />
  )
}

export default RHFSelect
