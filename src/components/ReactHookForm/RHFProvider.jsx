import React from 'react'
import { FormProvider } from 'react-hook-form'

const RHFProvider = ({ methods, onSubmit, children }) => {
  return (
    <FormProvider {...methods}>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

export default RHFProvider
