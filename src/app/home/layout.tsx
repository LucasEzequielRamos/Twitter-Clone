import Aside from '@/components/aside'
import NavbarBottom from '@/components/navbar-bottom'
import { fetchUserInfo } from '@/lib/getUserSession'
import { redirect } from 'next/navigation'

import React from 'react'

const layout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const userData = await fetchUserInfo()
  if (!userData) redirect('auth/login')
    const {id} =userData
  return (
    <div>
      <Aside id={id}/>
      <NavbarBottom id={id}/>
      {children}
    </div>
  )
}

export default layout
