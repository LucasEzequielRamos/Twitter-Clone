import useGetUserInfo from '@/hooks/useGetUserInfo'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

const ProfileHeader = () => {
  const { user }: { user: any } = useGetUserInfo()
  console.log(user)
  return (
    <header className='border-x-2 border-gray-500  w-full'>
      <div className='flex justify-start gap-5 px-4'>
        <div><IconArrowNarrowLeft /></div>
        <div className='flex flex-col justify-start'>
          <h3 className='text-xl font-bold'>{user.first_name}</h3>
          <p className='text-slate-300/60 text-sm'>{user.tweets.length} posts</p>
        </div>
      </div>
      <div className='w-full'>
        <div className='bg-gray-700/60 h-[200px]'>
          <picture className='w-full'></picture>
        </div>
        <div className='flex justify-between px-4 h-[100px]'>
          <picture className='rounded-full bg-gray-700 w-32 h-32 -translate-y-16'>
          </picture>
          <button className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>Edit profile</button>
        </div>
      </div>
      <div className='flex flex-col gap-3 px-4'>
        <div>
          <h3 className='text-xl font-bold'>{user.first_name}</h3>
          <p className='text-slate-300/60 text-base'>@{user.user_nick}</p>
        </div>
        <div>description</div>
        <div className='flex gap-3 flex-wrap justify-start [&>p]:text-slate-300/60 [&>p]:text-base [&>p]:'>
          <p>Buenos Aires, Argentina</p>
          <p>Date de born: 26 de abril de 1987</p>
          <p>since {user.created_at.split('T')[0]}</p>
        </div>
        <div className='flex gap-6 [&>p]:text-slate-300/60 [&>p]:text-base' >
          <p>
            <strong className='text-white'>{user.following.length}</strong> Following
          </p>
          <p>
            <strong className='text-white'>{user.followers.length}</strong> Followers
          </p>
        </div>
      </div>
      <div >
        <ul className='flex [&>li]:flex-1 [&>li]:text-center items-center [&>li]:p-3'>
          <li>Posts</li>
          <li>Responses</li>
          <li>Saved</li>
          <li>Photos</li>
          <li>Likes</li>
        </ul>
      </div>
    </header>
  )
}

export default ProfileHeader
