import { IconBrandX, IconHome, IconUser } from '@tabler/icons-react'
import React from 'react'

const Aside = () => {
  return (
    <aside className='w-52 fixed  '>
      <nav>
        <a href='/home'><IconBrandX className='size-8'/></a>
        <ul>
          <li>
            <a className='flex items-end gap-4 text-xl py-3' href='/home'><IconHome className='size-8'/>Home</a>
          </li>
          <li>
            <a className='flex items-end gap-4 text-xl py-3' href='/dashboard'><IconUser className='size-8'/>Profile</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Aside
