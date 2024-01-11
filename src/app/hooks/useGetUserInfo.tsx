import { useEffect, useState } from 'react'

const useGetUserInfo = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch('/api/users')
      if (res.status === 200) {
        const userData = await res.json()
        setUser(userData)
      } else return null
    }

    fetchUserInfo()
  }, [])
  return { user }
}

export default useGetUserInfo
