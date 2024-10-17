import React, { useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const format = props.dataFormat
  

  console.log('donne formated\n',JSON.stringify(format))

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol>
          <CWidgetStatsA
            color="primary"
            value={
              <>
                { new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', notation: 'compact' }).format(format?.transaction?.montant)}
                <span className="fs-6 fw-normal">
                   ({ new Intl.NumberFormat('fr-FR', { style: 'decimal', notation: 'compact' }).format(format?.transaction?.nbr)})
                </span>
              </>
            }
            title="Total Transactions"
            // action={
            //   <CDropdown alignment="end">
            //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            //       <CIcon icon={cilOptions} />
            //     </CDropdownToggle>
            //     <CDropdownMenu>
            //       <CDropdownItem>Action</CDropdownItem>
            //       <CDropdownItem>Another action</CDropdownItem>
            //       <CDropdownItem>Something else here...</CDropdownItem>
            //       <CDropdownItem disabled>Disabled action</CDropdownItem>
            //     </CDropdownMenu>
            //   </CDropdown>
            // }
            chart={
              <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Janv.', 'Fevr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', "Aôut", "Sept.", "Oct."],
                datasets: [
                  {
                    label: 'Transaction',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: Object.values(format.chart).map((d)=> d.montant),
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
            }
          />
        </CCol>
      </CRow>
      <CRow className={props.className}>
        <CCol>
          <CWidgetStatsA
            color="success"
            value={
              <>
              { new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', notation: 'compact' }).format(format?.transactionReussie?.montant)}
              <span className="fs-6 fw-normal">
                 ({ new Intl.NumberFormat('fr-FR', { style: 'decimal', notation: 'compact' }).format(format?.transactionReussie?.nbr)})
              </span>
            </>
            }
            title="Transactions réussies"
            // action={
            //   <CDropdown alignment="end">
            //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            //       <CIcon icon={cilOptions} />
            //     </CDropdownToggle>
            //     <CDropdownMenu>
            //       <CDropdownItem>Action</CDropdownItem>
            //       <CDropdownItem>Another action</CDropdownItem>
            //       <CDropdownItem>Something else here...</CDropdownItem>
            //       <CDropdownItem disabled>Disabled action</CDropdownItem>
            //     </CDropdownMenu>
            //   </CDropdown>
            // }
            chart={
              <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Janv.', 'Fevr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', "Aôut", "Sept.", "Oct."],
                datasets: [
                  {
                    label: 'Transaction reussies',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: Object.values(format.chart).map((d)=> d.transactionReussie),
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
            }
          />
        </CCol>
        <CCol>
          <CWidgetStatsA
            color="danger"
            value={
              <>
              { new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', notation: 'compact' }).format(format?.transactionBloquee?.montant)}
              <span className="fs-6 fw-normal">
                 ({ new Intl.NumberFormat('fr-FR', { style: 'decimal', notation: 'compact' }).format(format?.transactionBloquee?.nbr)})
              </span>
            </>
            }
            title="Transaction bloquées"
            // action={
            //   <CDropdown alignment="end">
            //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            //       <CIcon icon={cilOptions} />
            //     </CDropdownToggle>
            //     <CDropdownMenu>
            //       <CDropdownItem>Action</CDropdownItem>
            //       <CDropdownItem>Another action</CDropdownItem>
            //       <CDropdownItem>Something else here...</CDropdownItem>
            //       <CDropdownItem disabled>Disabled action</CDropdownItem>
            //     </CDropdownMenu>
            //   </CDropdown>
            // }
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Janv.', 'Fevr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', "Aôut", "Sept.", "Oct."],
                  datasets: [
                    {
                      label: 'Transaction bloquées',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: Object.values(format.chart).map((d)=> d.transactionBloquee),
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
