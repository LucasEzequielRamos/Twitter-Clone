import Aside from '@/components/aside'
import NavbarBottom from '@/components/navbar-bottom'
import { fetchUserInfo } from '@/lib/getUserSession'

const layout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const { id } = await fetchUserInfo()

  return (
    <div className=''>
      <Aside id={id}/>
      <NavbarBottom id={id}/>
      {children}
    </div>
  )
}

export default layout
