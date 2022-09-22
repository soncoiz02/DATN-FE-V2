import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFAutoComplete = ({ name, options, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
        <Autocomplete
          onChange={(_, data) => onChange(data.id)}
          options={options}
          getOptionLabel={(option) => option.label}
          disablePortal
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={error?.message}
              label={other.label}
              {...params}
              {...field}
              inputRef={ref}
              fullWidth
            />
          )}
        />
      )}
    />
  )
}

export default RHFAutoComplete
