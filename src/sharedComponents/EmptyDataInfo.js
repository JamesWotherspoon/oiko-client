import { Create } from '@mui/icons-material';
import React from 'react'

const EmptyDataInfo = ({ label }) => {
  return (
    <div className='empty-data-info'>
      <h3 className='empty-data-info-text'>No {label}</h3>
    </div>
  )
}

export default EmptyDataInfo;