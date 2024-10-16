import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          SimuDash AI
        </a>
        <span className="ms-1">&copy; 2024 ISPT-KIN.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Conçu par</span>
        <a href="https://github.com/Vaneldialu" target="_blank" rel="noopener noreferrer">
          Vanel DIALUNDAMA
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
