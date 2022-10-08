import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFSwitch = ({ name, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel {...other} control={<Switch {...field} checked={field.value} />} />
      )}
    />
  )
}

export default RHFSwitch
