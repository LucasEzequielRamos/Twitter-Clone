import Aside from '@/components/aside'
import React from 'react'

const layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Aside/>
      {children}
    </div>
  )
}

export default layout
