import React, { useMemo } from 'react'
import classNames from 'classnames'

import { useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const data = useSelector((state) => state.data || [])

  // Transaction generer ici

  const format = useMemo(() => {
    const df = {
      transaction: {
        nbr: 0,
        montant: 0,
      },
      transactionBloquee: {
        nbr: 0,
        montant: 0,
      },
      transactionReussie: {
        nbr: 0,
        montant: 0,
      },
      chart: {
        1: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        2: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        3: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        4: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        5: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        6: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        7: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        8: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        9: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        10: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        11: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
        12: {
          nbr: 0,
          montant: 0,
          transactionReussie: 0,
          transactionReussieNbr: 0,
          transactionBloquee: 0,
          transactionBloqueeNbr: 0,
        },
      },
      clients: {},
    }

    data.forEach((d) => {
      const monthIndex = new Date(d.dateCreation).getMonth() + 1

      df.transaction.nbr += 1
      df.transaction.montant += d.montant
      df.chart[monthIndex].nbr += 1
      df.chart[monthIndex].montant += d.montant

      if (d.estValide) {
        df.transactionReussie.nbr += 1
        df.transactionReussie.montant += d.montant

        df.chart[monthIndex].transactionReussieNbr += 1
        df.chart[monthIndex].transactionReussie += d.montant
      } else {
        df.transactionBloquee.nbr += 1
        df.transactionBloquee.montant += d.montant
        df.chart[monthIndex].transactionBloqueeNbr += 1
        df.chart[monthIndex].transactionBloquee += d.montant
      }

      // group client

      console.log("d.client_id",d.client_id)

      if (df.clients[d.client_id]) {
        const c = df.clients[d.client_id]
        df.clients[d.client_id] = {
          ...c,
          nbrTransactionReussie: d.estValide ? c.nbrTransactionReussie + 1 : c.nbrTransactionReussie,
          nbrTransactionBloquee: !d.estValide ? c.nbrTransactionBloquee + 1 : c.nbrTransactionBloquee,
          nbrTransaction: c.nbrTransaction + 1,
        }

      } else {
        df.clients[d.client_id] = {
          nbrTransactionReussie: d.estValide ? 1 : 0,
          nbrTransactionBloquee: !d.estValide ? 1 : 0,
          nbrTransaction: 1,
          client : d.client
        }
      }
    })

    return df
  }, [data])

  return (
    <>
      <CRow>
        <CCol>
          <WidgetsDropdown className="mb-4" dataFormat={format} />
        </CCol>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Traffic
                  </h4>
                  <div className="small text-body-secondary">January - July 2023</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
                  {/* <CButtonGroup className="float-end me-3">
                    {['Day', 'Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup> */}
                </CCol>
              </CRow>
              <MainChart data={Object.values(format.chart || {})} />
            </CCardBody>
            {/* <CCardFooter>
              <CRow
                xs={{ cols: 1, gutter: 4 }}
                sm={{ cols: 2 }}
                lg={{ cols: 4 }}
                xl={{ cols: 5 }}
                className="mb-2 text-center"
              >
                {progressExample.map((item, index, items) => (
                  <CCol
                    className={classNames({
                      'd-none d-xl-block': index + 1 === items.length,
                    })}
                    key={index}
                  >
                    <div className="text-body-secondary">{item.title}</div>
                    <div className="fw-semibold text-truncate">
                      {item.value} ({item.percent}%)
                    </div>
                    <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                  </CCol>
                ))}
              </CRow>
            </CCardFooter> */}
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Données générées</CCardHeader>
            <CCardBody>
              {/* <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow> */}

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary">Client</CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary">
                      Transactions bloquées (%)
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell> */}
                    {/* <CTableHeaderCell className="bg-body-tertiary">
                      Dernière transaction
                    </CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Object.values(format.clients).sort((a, b) => b.nbrTransactionBloquee-a.nbrTransactionBloquee).map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                      <CTableDataCell>
                        <div>{item?.client?.nom}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item?.client?.id}</span>
                        </div>
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell> */}
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{`${parseInt((item.nbrTransactionBloquee*100)/item.nbrTransaction,10)}`}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{`${item.nbrTransaction} transactions | ${item.nbrTransactionBloquee} bloquées | ${item.nbrTransactionReussie} réussies`}</small>
                          </div>
                        </div>
                        <CProgress thin  value={parseInt((item.nbrTransactionBloquee*100)/item.nbrTransaction,10)} />
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Dernière transaction</div>
                        <div className="fw-semibold text-nowrap">--</div>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
