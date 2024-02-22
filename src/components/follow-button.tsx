'use client'
import React, { useState } from 'react'

const ButtonToFollow = () => {
  const [follow, setFollow] = useState(false)
  return (
    <button onClick={() => { setFollow(!follow) }} className='flex mt-3 rounded-full border-gray-700 border-2 h-fit px-5 py-1'>{follow ? 'Unfollow' : 'Follow'}</button>
  )
}

export default ButtonToFollow
