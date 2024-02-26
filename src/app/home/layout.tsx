import Aside from '@/components/aside'
import NavbarBottom from '@/components/navbar-bottom'
import { fetchUserInfo } from '@/lib/getUserSession'

import React from 'react'

const layout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const { id } = await fetchUserInfo()

  return (
    <div>
      <Aside id={id}/>
      <NavbarBottom id={id}/>
      {children}
    </div>
  )
}

export default layout
