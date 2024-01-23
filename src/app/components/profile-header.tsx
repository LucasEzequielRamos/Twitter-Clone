import { fetchUserInfo } from '@/lib/getUserSession'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import ProfileImage from './profile-image'

const ProfileHeader = async () => {
  const user = await fetchUserInfo()
  if (user) {
    const [year, month, day] = user.birthday.split('-')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const birthday = `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`

    return (
      <header className='border-x-2 border-gray-500  w-full'>
        <div className='flex justify-start gap-5 px-4'>
          <div><IconArrowNarrowLeft /></div>
          <div className='flex flex-col justify-start'>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-sm'>{user?.tweets.length} posts</p>
          </div>
        </div>
        <div className='w-full'>
          <div className='bg-gray-700/60 h-[200px]'>
            <picture className='w-full'></picture>
          </div>
          <div className='flex justify-between px-4 h-[100px]'>
            <ProfileImage avatar={user.avatar_url}/>
            <button className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>Edit profile</button>
          </div>
        </div>
        <div className='flex flex-col gap-3 px-4'>
          <div>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-base'>@{user?.user_nick}</p>
          </div>
          <div>description</div>
          <div className='flex gap-3 flex-wrap justify-start [&>p]:text-slate-300/60 [&>p]:text-base [&>p]:'>
            <p>Buenos Aires, Argentina</p>
            <p>Birthday: {birthday}</p>
            <p>Joined in {user?.created_at.split('T')[0]}</p>
          </div>
          <div className='flex gap-6 [&>p]:text-slate-300/60 [&>p]:text-base' >
            <p>
              <strong className='text-white'>{user?.following.length}</strong> Following
            </p>
            <p>
              <strong className='text-white'>{user?.followers.length}</strong> Followers
            </p>
          </div>
        </div>
        <div >
          <ul className='flex mt-3 [&>li]:flex-1 [&>li]:text-center items-center [&>li]:p-3 [&>li]:'>
            <li className='hover:bg-white/10 cursor-pointer transition'>Posts</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Responses</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Saved</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Photos</li>
            <li className='hover:bg-white/10 cursor-pointer transition'>Likes</li>
          </ul>
        </div>
      </header>
    )
  } else {
    return ('')
  }
}

export default ProfileHeader
