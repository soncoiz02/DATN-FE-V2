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
        <FormControl>
          <InputLabel id='demo-simple-select-label'>{other?.label}</InputLabel>
          <Select
            {...field}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            SelectProps={{ native: true }}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default RHFSelect
