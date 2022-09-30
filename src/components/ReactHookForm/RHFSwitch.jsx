import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFSwitch = ({ name, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormControlLabel
          {...other}
          control={<Switch onChange={onChange} value={value} {...field} />}
        />
      )}
    />
  )
}

export default RHFSwitch
