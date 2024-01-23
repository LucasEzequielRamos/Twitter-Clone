export async function fetchUserInfo (): Promise<any> {
  const res = await fetch('http://localhost:3000/api/users', {
    method: 'GET'
  })
  if (res.status === 200) {
    const userData = await res.json()
    return userData
  } else return null
}
