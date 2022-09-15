import { TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFTextField = ({ name, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} helperText={error?.message} {...other} />
      )}
    />
  )
}

export default RHFTextField
