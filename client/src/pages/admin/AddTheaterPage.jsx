import React from 'react'
import AddTheaterComponent from '../../components/adminComponents/AddTheaterComponent'
import Sidebar from '../../components/adminComponents/Sidebar'

const AddTheaterPage = () => {
  return (
    <div className='flex w-full'>
        <Sidebar />
        <AddTheaterComponent />
    </div>
  )
}

export default AddTheaterPage