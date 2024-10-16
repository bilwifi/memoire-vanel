import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)

  return (
    <>
      <CChartLine
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Transactions reussies',
              backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green
              borderColor: 'rgba(0, 255, 0, 1)', // Green
              pointBackgroundColor: 'rgba(0, 255, 0, 1)', // Green
              pointBorderColor: '#fff',
              data: [random(), random(), random(), random(), random(), random(), random()],
            },
            {
              label: 'Transactions bloquées',
              backgroundColor: 'rgba(219, 94, 93, 1)', // Red
              borderColor: 'rgba(219, 94, 93, 1)', // Red
              pointBackgroundColor: 'rgba(219, 94, 93, 1)', // Red
              pointBorderColor: '#fff',
              data: [random(), random(), random(), random(), random(), random(), random()],
            },
          ],
        }}
      />
    </>
  )
}

export default MainChart
