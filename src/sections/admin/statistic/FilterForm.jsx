import { Grid, Stack } from '@mui/material'
import { startOfDay } from 'date-fns'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import categoryApi from '../../../api/category'
import statisticApi from '../../../api/statistic'
import MainButton from '../../../components/MainButton'
import { RHFAutoComplete } from '../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../components/ReactHookForm/RHFProvider'

const DEFAULT_VALUE = {
  type: {
    label: 'Ngày',
    type: 'day',
  },
  category: null,
  dateStart: null,
  dateEnd: null,
  year: new Date(),
}

const TYPE_OPTS = [
  {
    label: 'Ngày',
    type: 'day',
  },
  {
    label: 'Tháng',
    type: 'month',
  },
]

const FilterForm = ({ setOptions, options }) => {
  const [categoryOpts, setCategoryOpts] = useState([])
  const methods = useForm({
    defaultValues: DEFAULT_VALUE,
  })

  const { reset, handleSubmit, watch, setValue, getValues } = methods
  const currentType = watch(['type'])[0]?.type
  const category = watch(['category'])[0]?.value

  const onSubmit = (values) => {
    console.log(values)
  }

  const handleGetCategory = async () => {
    try {
      const data = await categoryApi.getAll()
      const cateOpts = data.map((item) => ({ label: item.name, value: item._id }))
      setCategoryOpts(cateOpts)
      setValue('category', cateOpts[0])
      setOptions({ ...options, category: cateOpts[0].value })
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStartAndEndDate = () => {
    const currentDate = startOfDay(new Date())
    const dateStart = new Date(currentDate.setDate(currentDate.getDate() - 7))
    setValue('dateStart', dateStart)
    setValue('dateEnd', startOfDay(new Date()))
  }

  useEffect(() => {
    handleGetCategory()
  }, [])

  useEffect(() => {
    if (currentType === 'day') {
      handleGetStartAndEndDate()
    }
  }, [currentType, category])

  return (
    <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={currentType !== 'day' ? 4 : 3}>
          <RHFAutoComplete
            options={TYPE_OPTS}
            name='type'
            label='Định dạng theo'
            disableClearable={true}
            isOptionEqualToValue={(option, value) => option.type === value.type}
          />
        </Grid>
        <Grid item xs={12} md={currentType !== 'day' ? 4 : 3}>
          {categoryOpts && (
            <RHFAutoComplete
              options={categoryOpts}
              name='category'
              label='Danh mục'
              disableClearable={true}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          )}
        </Grid>
        {currentType === 'day' && (
          <>
            <Grid item xs={12} md={3}>
              <RHFDatePicker name='dateStart' label='Ngày bắt đầu' />
            </Grid>
            <Grid item xs={12} md={3}>
              <RHFDatePicker name='dateEnd' label='Ngày kết thúc' />
            </Grid>
          </>
        )}
        {currentType === 'month' && (
          <Grid item xs={12} md={4}>
            <RHFDatePicker name='year' label='Chọn năm' views={['year']} inputFormat={'yyyy'} />
          </Grid>
        )}
      </Grid>
    </RHFProvider>
  )
}

export default FilterForm
