'use client'
import { IconHome, IconUser } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const NavbarBottom = ({ id }: { id: number }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, visible])

  return (
    <nav className={`fixed lg:hidden bottom-0 w-full bg-slate-50/20 ${!visible ? 'transform translate-y-full transition-all' : 'transition-all'}`}>
      <ul className='flex flex-1 divide-x-[1px]'>
        <li className='flex flex-1 justify-center' >
          <a className='py-3' href='/home'><IconHome className='size-8'/></a>
        </li>
        <li className='flex flex-1 justify-center'>
          <a className='py-3' href={`/dashboard/${id}`}><IconUser className='size-8'/></a>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarBottom
