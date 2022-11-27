import { Autocomplete, Avatar, Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import formatPrice from '../../utils/formatPrice'

export const RHFAutoComplete = ({ name, options, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...other}
          value={value || null}
          onChange={(_, data) => onChange(data)}
          options={options}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
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

export const RHFAutoCompleteRenderImg = ({ name, options, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...other}
          value={value || null}
          onChange={(_, data) => onChange(data)}
          options={options}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disablePortal
          renderOption={(props, option) => (
            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading='lazy'
                height='70'
                width='70'
                src={option.image}
                srcSet={`${option.image} 2x`}
                alt=''
              />
              {option.label} {option.price ? `- ${formatPrice(option.price)}` : null}
            </Box>
          )}
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
