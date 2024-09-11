import { IconArrowNarrowLeft, IconUser } from '@tabler/icons-react'
import EditProfileModal from './edit-profile-modal'
import ButtonToFollow from './follow-button'
import { getOneUser } from '@/lib/getOneUser'

const ProfileHeader = async ({ profileId, userSessionId, userEmail }: { profileId: number, userSessionId: number, userEmail: string | null | undefined }) => {
  const user = await getOneUser(profileId)

  let birthday;

  if (user.birthday) {
    const [year, month, day] = user?.birthday?.split('-')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    birthday = `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`
  }

    return (
      <header className='border-x-[1px] border-gray-500  w-full'>
        <div className='flex justify-start gap-7 px-4 py-3 items-center'>
          <a href='/home'><IconArrowNarrowLeft /></a>
          <div className='flex flex-col justify-start'>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-sm'>{user?.tweets?.length} posts</p>
          </div>
        </div>
        <div className='w-full'>
          <div className='bg-gray-700/60 h-[200px]'>
            <picture className='w-full'></picture>
          </div>
          <div className='flex justify-between px-4 h-[100px]'>
            <picture className='relative rounded-full w-32 h-32 -translate-y-16 object-contain'>
              {user.avatar_url === null ? <IconUser size={'50px'}/> : <img src={user.avatar_url} alt={user.avatar_url} className='rounded-full h-full w-full'/>}
            </picture>
            {
              profileId === userSessionId
                ? <EditProfileModal email={userEmail}/>
                : <ButtonToFollow/>
            }
          </div>
        </div>
        <div className='flex flex-col gap-3 px-4'>
          <div>
            <h3 className='text-xl font-bold'>{user?.full_name}</h3>
            <p className='text-slate-300/60 text-base'>@{user?.user_nick}</p>
          </div>
          <div>{user.description}</div>
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
        <div className='border-b-[1.5px] border-white/60'>
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
  }


export default ProfileHeader
