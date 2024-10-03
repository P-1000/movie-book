import React from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import TheaterListComponent from '../../components/adminComponents/TheaterListComponent'

const TheaterListPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <TheaterListComponent />
    </div>
  )
}

export default TheaterListPage