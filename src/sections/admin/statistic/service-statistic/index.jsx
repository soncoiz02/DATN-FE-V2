import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, Pie, PolarArea } from 'react-chartjs-2'
import GlassBox from '../../../../components/GlassBox'
import statisticApi from '../../../../api/statistic'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { getRandomColor } from '../../../../utils/aboutColor'
import { useState } from 'react'
import { Grid } from '@mui/material'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const ServiceRevenue = () => {
  const [serviceRevenue, setServiceRevenue] = useState()
  const [serviceUsed, setServiceUsed] = useState()

  const handleGetServiceRevenue = async () => {
    try {
      const responseData = await statisticApi.getServiceRevenue()

      const listColor1 = responseData.map((item) => getRandomColor())
      const listColor2 = responseData.map((item) => getRandomColor())

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

      setServiceRevenue(serviceRevenueData)
      setServiceUsed(serviceUsedData)
    } catch (error) {
      console.log(error)
    }
  }

  const getServiceRevenue = useCallback(() => handleGetServiceRevenue(), [])

  useEffect(() => {
    getServiceRevenue()
  }, [])

  return (
    <>
      <Grid item xs={12} md={6}>
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
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
    </>
  )
}

export default ServiceRevenue
