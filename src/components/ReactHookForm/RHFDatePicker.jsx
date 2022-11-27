import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import AdapterDateFns from '@date-io/date-fns'
import { TextField } from '@mui/material'
import vnLocale from 'date-fns/locale/vi'

const RHFDatePicker = ({ name, ...other }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vnLocale}>
          <DatePicker
            dayOfWeekFormatter={(day) => day.toString()}
            onChange={onChange}
            value={value}
            {...other}
            renderInput={(params) => (
              <TextField fullWidth error={!!error} helperText={error?.message} {...params} />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default RHFDatePicker
