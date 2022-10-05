import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFCheckBox = ({ name, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormControlLabel
          {...other}
          control={<Checkbox onChange={onChange} value={value} {...field} />}
        />
      )}
    />
  )
}

export default RHFCheckBox
