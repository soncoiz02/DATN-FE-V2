import { Grid, Stack } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js'
import React, { useCallback, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import statisticApi from '../../../../api/statistic'
import GlassBox from '../../../../components/GlassBox'
import { getColorByIndex } from '../../../../utils/aboutColor'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const ServiceRevenue = () => {
  const [serviceRevenue, setServiceRevenue] = useState()
  const [serviceUsed, setServiceUsed] = useState()
  const [serviceCancel, setServiceCancel] = useState()

  const handleGetServiceRevenue = async () => {
    try {
      const responseData = await statisticApi.getServiceRevenue()

      const listColor1 = responseData.map((item, index) => getColorByIndex(index))
      const listColor2 = responseData.map((item, index) => getColorByIndex(index))

      const serviceRevenueData = {
        labels: responseData.map((item) => item.service.name),
        datasets: [
          {
            label: 'Doanh thu',
            data: responseData.map((item) => item.total),
            backgroundColor: listColor1,
            borderColor: listColor1,
            borderWidth: 1,
          },
        ],
      }

      const serviceUsedData = {
        labels: responseData.map((item) => item.service.name),
        datasets: [
          {
            data: responseData.map((item) => item.countUsed),
            backgroundColor: listColor2,
            borderColor: listColor2,
            borderWidth: 1,
          },
        ],
      }

      const serviceCancelData = {
        labels: responseData.map((item) => item.service.name),
        datasets: [
          {
            data: responseData.map((item) => item.totalCancel),
            backgroundColor: listColor2,
            borderColor: listColor2,
            borderWidth: 1,
          },
        ],
      }

      setServiceRevenue(serviceRevenueData)
      setServiceUsed(serviceUsedData)
      setServiceCancel(serviceCancelData)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceRevenue = useCallback(() => handleGetServiceRevenue(), [])

  useEffect(() => {
    getServiceRevenue()
  }, [])

  return (
    <Grid item xs={12} md={4}>
      <Stack gap={2}>
        <GlassBox>
          {serviceRevenue && (
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Biểu đồ thống kê doanh thu từng dịch vụ',
                  },
                },
              }}
              data={serviceRevenue}
            />
          )}
        </GlassBox>
        <GlassBox>
          {serviceUsed && (
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Biểu đồ thống kê số lượt sử dụng từng dịch vụ',
                  },
                },
              }}
              data={serviceUsed}
            />
          )}
        </GlassBox>
        <GlassBox>
          {serviceCancel && (
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Biểu đồ thống kê số lượt hủy từng dịch vụ',
                  },
                },
              }}
              data={serviceCancel}
            />
          )}
        </GlassBox>
      </Stack>
    </Grid>
  )
}

export default ServiceRevenue
