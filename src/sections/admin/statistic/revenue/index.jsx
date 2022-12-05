import { Grid, Stack } from '@mui/material'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { startOfDay } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'
import categoryApi from '../../../../api/category'
import statisticApi from '../../../../api/statistic'
import MainButton from '../../../../components/MainButton'
import { RHFAutoComplete } from '../../../../components/ReactHookForm/RHFAutoComplete'
import RHFDatePicker from '../../../../components/ReactHookForm/RHFDatePicker'
import RHFProvider from '../../../../components/ReactHookForm/RHFProvider'
import { getColorByIndex } from '../../../../utils/aboutColor'
import { dateFormat } from '../../../../utils/dateFormat'

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const lineChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ thống kê doanh thu dịch vụ theo thời gian',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
}

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ thống kê doanh thu theo thời gian',
    },
  },
}

const StatisticRevenue = () => {
  const [categoryOpts, setCategoryOpts] = useState([])
  const [lineChartData, setLineChartData] = useState()
  const [barChartData, setBarChartData] = useState()

  const methods = useForm({
    defaultValues: {
      type: {
        label: 'Ngày',
        type: 'day',
      },
      category: null,
      dateStart: null,
      dateEnd: null,
      year: new Date(),
    },
  })

  const { reset, handleSubmit, watch, setValue, getValues } = methods
  const currentType = watch(['type'])[0]?.type
  const category = watch(['category'])[0]?.value

  const onSubmit = (values) => {
    handleGetStatisticBy(values.type.type)
    handleGetRevenueBy(values.type.type)
  }

  const handleCancel = () => {
    handleGetStartAndEndDate()
    handleGetStatisticBy(currentType)
    handleGetRevenueBy(currentType)
  }

  const handleGetCategory = async () => {
    try {
      const data = await categoryApi.getAll()
      const cateOpts = data.map((item) => ({ label: item.name, value: item._id }))
      setCategoryOpts(cateOpts)
      setValue('category', cateOpts[0])
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

  const filterDataResponse = (data, type) => {
    const chartLabel = data.map((item) => {
      if (type === 'day') {
        return dateFormat(item.date)
      }

      return item.date
    })

    const listServices = data[0].listServices.map((item) => item.service)

    const dataFilter = []

    listServices.forEach((service) => {
      const serviceData = []
      data.forEach((item) => {
        item.listServices.forEach((subService) => {
          if (subService.service._id === service._id) {
            serviceData.push(subService.total)
          }
        })
      })

      dataFilter.push(serviceData)
    })

    const chartDataset = listServices.map((service, index) => {
      const color = getColorByIndex(index)
      return {
        label: service.name,
        data: dataFilter[index],
        backgroundColor: color,
        borderColor: color,
        tension: 0.5,
      }
    })

    const chartData = {
      labels: chartLabel,
      datasets: chartDataset,
    }

    return chartData
  }

  const filterDataResponseForBarChart = (data, type) => {
    const barChartData = {
      labels: data.map((item) => {
        if (type === 'day') {
          return dateFormat(item.date)
        }

        return item.date
      }),
      datasets: [
        {
          label: 'Tổng doanh thu',
          data: data.map((item) => item.totalRevenue),
          backgroundColor: '#54BAB9',
        },
      ],
    }

    return barChartData
  }

  const handleGetRevenueBy = async (type) => {
    try {
      if (type === 'day') {
        const dateStart = getValues('dateStart').toISOString()
        const dateEnd = getValues('dateEnd').toISOString()
        const data = await statisticApi.getRevenueByDate(dateStart, dateEnd)

        const barChartData = filterDataResponseForBarChart(data, type)
        setBarChartData(barChartData)
      } else if (type === 'month') {
        const year = getValues('year').getFullYear()
        const data = await statisticApi.getRevenueByMonth(year)

        const barChartData = filterDataResponseForBarChart(data, type)
        setBarChartData(barChartData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStatisticBy = async (type) => {
    try {
      if (type === 'day') {
        const dateStart = getValues('dateStart').toISOString()
        const dateEnd = getValues('dateEnd').toISOString()
        const data = await statisticApi.getStatisticByDate(dateStart, dateEnd, category)

        const chartData = filterDataResponse(data, type)

        setLineChartData(chartData)
      } else if (type === 'month') {
        const year = getValues('year').getFullYear()
        const data = await statisticApi.getStatisticByMonth(year, category)

        const chartData = filterDataResponse(data, type)

        setLineChartData(chartData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCategory()
    handleGetStartAndEndDate()
  }, [])

  useEffect(() => {
    handleGetRevenueBy(currentType)
  }, [currentType])

  useEffect(() => {
    if (currentType && category) {
      handleGetStatisticBy(currentType)
    }
  }, [currentType, category])

  return (
    <Stack gap={2}>
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
          <Grid item xs={12}>
            <Stack direction='row' justifyContent='flex-end' gap={1}>
              <MainButton
                colorType='neutral'
                sx={{ px: 5, borderRadius: '50px' }}
                onClick={handleCancel}
              >
                Hủy
              </MainButton>
              <MainButton type='submit' colorType='primary' sx={{ px: 5, borderRadius: '50px' }}>
                Tìm kiếm
              </MainButton>
            </Stack>
          </Grid>
        </Grid>
      </RHFProvider>
      <Stack gap={2}>
        {lineChartData && <Line options={lineChartOptions} data={lineChartData} />}
        {barChartData && <Bar options={barChartOptions} data={barChartData} />}
      </Stack>
    </Stack>
  )
}

export default StatisticRevenue
