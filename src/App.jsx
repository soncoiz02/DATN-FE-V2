import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import RHFProvider from './components/ReactHookForm/RHFProvider'
import RHFTextField from './components/ReactHookForm/RHFTextField'

const App = () => {
  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Required'),
  })

  const methods = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(formSchema),
  })

  const { handleSubmit } = methods

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Container>
      <Typography variant='h1'>dsdsadas</Typography>
      <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name='name' label='Name' />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </RHFProvider>
    </Container>
  )
}

export default App
