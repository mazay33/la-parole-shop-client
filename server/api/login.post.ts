export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const repo = await $fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    body,
    credentials: 'include',

  })

  setCookie(event, 'refreshToken', repo.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'none',
  })

  setCookie(event, 'accessToken', repo.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'none',
  })



  console.log(repo);


  return repo
})
